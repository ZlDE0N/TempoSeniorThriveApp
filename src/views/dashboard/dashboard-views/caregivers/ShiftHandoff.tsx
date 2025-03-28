import React, { useState } from 'react';
import { Briefcase, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { useCaregiverStore } from '../../store/caregiverStore';
import { useIncidentStore } from '../../store/incidentStore';
import { useMedicationStore } from '../../store/medicationStore';
import { useActivityStore } from '../../store/activityStore';
import { formatDateTime } from '../../utils/dateUtils';

export default function ShiftHandoff() {
  const { getCurrentShift, getActiveCaregiver } = useCaregiverStore();
  const { incidents } = useIncidentStore();
  const { medicationLogs } = useMedicationStore();
  const { activities } = useActivityStore();

  const currentShift = getCurrentShift();
  const activeCaregiver = getActiveCaregiver();

  if (!currentShift || !activeCaregiver) return null;

  // Get today's data
  const today = new Date().toISOString().split('T')[0];
  const shiftIncidents = incidents.filter(i => i.timestamp.startsWith(today));
  const shiftMedications = medicationLogs.filter(m => m.timestamp.startsWith(today));
  const shiftActivities = activities.filter(a => a.timestamp.startsWith(today));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary-light">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Shift Summary</h3>
            <p className="text-sm text-gray-500">
              {activeCaregiver.firstName} {activeCaregiver.lastName} • Started at {formatDateTime(currentShift.startTime)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Incidents Section */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h4 className="font-medium text-red-900">Incidents</h4>
          </div>
          {shiftIncidents.length === 0 ? (
            <p className="text-sm text-red-700">No incidents reported</p>
          ) : (
            <ul className="space-y-2">
              {shiftIncidents.map(incident => (
                <li key={incident.id} className="text-sm text-red-700">
                  • {incident.type}: {incident.description.slice(0, 50)}...
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Medications Section */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h4 className="font-medium text-green-900">Medications</h4>
          </div>
          {shiftMedications.length === 0 ? (
            <p className="text-sm text-green-700">No medications administered</p>
          ) : (
            <ul className="space-y-2">
              {shiftMedications.map(log => (
                <li key={log.id} className="text-sm text-green-700">
                  • {log.taken ? 'Administered' : 'Skipped'} at {formatDateTime(log.timestamp)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Activities Section */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Activities</h4>
          </div>
          {shiftActivities.length === 0 ? (
            <p className="text-sm text-blue-700">No activities recorded</p>
          ) : (
            <ul className="space-y-2">
              {shiftActivities.map(activity => (
                <li key={activity.id} className="text-sm text-blue-700">
                  • {activity.name} ({activity.duration} minutes)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Handoff Notes
        </label>
        <textarea
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="Add important notes for the next caregiver..."
        />
      </div>
    </div>
  );
}
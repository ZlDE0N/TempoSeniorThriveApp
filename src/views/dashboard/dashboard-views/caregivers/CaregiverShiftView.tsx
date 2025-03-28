import React, { useState } from 'react';
import { Clock, CheckCircle, MapPin, FileText, AlertTriangle, Plus, Users, Heart, Pill, Activity, Brain } from 'lucide-react';
import { useCaregiverStore } from '../../../../store/dashboard_store/caregiverStore'
import { useVitalsStore } from '../../../../store/dashboard_store/vitalsStore';
import { useMedicationStore } from '../../../../store/dashboard_store/medicationStore';
import { useActivityStore } from '../../../../store/dashboard_store/activityStore';
import { useIncidentStore } from '../../../../store/dashboard_store/incidentStore';
import ShiftStartModal from './ShiftStartModal';
import ShiftTracker from './ShiftTracker';
import { formatDateTime } from '../../../../utils/dateUtils';

export default function CaregiverShiftView() {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'current' | 'tasks' | 'vitals' | 'meds' | 'activities'>('current');
  const { getCurrentShift, getActiveCaregiver, startShift } = useCaregiverStore();
  const { getLatestEntry } = useVitalsStore();
  const { getPendingMedications } = useMedicationStore();
  const { getTodayActivities } = useActivityStore();
  const { getActiveIncidents } = useIncidentStore();

  const currentShift = getCurrentShift();
  const activeCaregiver = getActiveCaregiver();
  const pendingMedications = getPendingMedications();
  const todayActivities = getTodayActivities();
  const activeIncidents = getActiveIncidents();

  const handleStartShift = (location?: string) => {
    if (activeCaregiver) {
      startShift(activeCaregiver.id, location);
      setIsStartModalOpen(false);
    }
  };

  // Render the "no shift" view if there's no active shift
  if (!currentShift) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Active Shift</h3>
        <p className="mt-2 text-gray-500">Start your shift to begin tracking care activities.</p>
        <button
          onClick={() => setIsStartModalOpen(true)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Clock className="h-4 w-4 mr-2" />
          Start Shift
        </button>

        <ShiftStartModal
          isOpen={isStartModalOpen}
          onClose={() => setIsStartModalOpen(false)}
          onStartShift={handleStartShift}
        />
      </div>
    );
  }

  // Render the active shift view
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Current Shift</h2>
          <p className="text-sm text-gray-500">
            Started at {formatDateTime(currentShift.startTime)}
          </p>
        </div>
      </div>

      <ShiftTracker />

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'current'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Current Status
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'tasks'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'vitals'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vitals
            </button>
            <button
              onClick={() => setActiveTab('meds')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'meds'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Medications
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'activities'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Activities
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'current' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-yellow-800 font-medium">Pending Tasks</h3>
                    <FileText className="h-5 w-5 text-yellow-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-yellow-600">
                    {currentShift?.tasks.length || 0}
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-red-800 font-medium">Active Incidents</h3>
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {activeIncidents.length}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-green-800 font-medium">Completed Tasks</h3>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-green-600">
                    {currentShift?.tasks.filter(t => t.completed).length || 0}
                  </p>
                </div>
              </div>

              {/* Location Check */}
              {activeCaregiver?.location && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Current Location</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Last updated: {new Date(activeCaregiver.location.lastUpdated).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Care Recipients */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Care Recipients</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          John Smith
                        </p>
                        <p className="text-sm text-gray-500">
                          Primary Care • Morning Routine
                        </p>
                      </div>
                      <div>
                        <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                          View Details
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Shift Tasks</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </button>
              </div>
              {currentShift?.tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      readOnly
                    />
                    <span className="ml-3 text-sm text-gray-900">{task}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Vital Signs</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                  <Plus className="h-4 w-4 mr-2" />
                  Record Vitals
                </button>
              </div>
              {/* Latest vitals display */}
            </div>
          )}

          {activeTab === 'meds' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Medications</h3>
                <div className="text-sm text-gray-500">
                  {pendingMedications.length} pending
                </div>
              </div>
              {pendingMedications.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{med.name}</h4>
                    <p className="text-sm text-gray-500">{med.dosage}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {med.timeSlots[0]}
                    </span>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary-hover">
                      Administer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Today's Activities</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Activity
                </button>
              </div>
              {todayActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{activity.name}</h4>
                    <p className="text-sm text-gray-500">{activity.duration} minutes</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(activity.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { FileText, Activity, Heart, Pill } from 'lucide-react';
import { useMedicationStore } from '../../store/medicationStore';
import { useVitalsStore } from '../../store/vitalsStore';
import { useActivityStore } from '../../store/activityStore';
import { formatDateTime } from '../../utils/dateUtils';

interface ReportProps {
  dateRange: {
    start: string;
    end: string;
  };
}

export default function CareSummaryReport({ dateRange }: ReportProps) {
  const { medications, medicationLogs } = useMedicationStore();
  const { vitalsData } = useVitalsStore();
  const { activities } = useActivityStore();

  // Get latest vitals
  const getLatestVital = (key: string) => {
    const entries = vitalsData[key] || [];
    return entries[0];
  };

  // Filter activities within date range
  const filteredActivities = activities.filter(activity =>
    activity.timestamp >= dateRange.start && activity.timestamp <= dateRange.end
  );

  return (
    <div className="p-6 space-y-8">
      {/* Current Vitals */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Heart className="h-5 w-5 text-primary mr-2" />
          Current Vitals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['bloodPressure', 'heartRate', 'temperature', 'oxygenLevel'].map(key => {
            const latest = getLatestVital(key);
            if (!latest) return null;

            return (
              <div key={key} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">
                  {latest.value}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {formatDateTime(latest.timestamp)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Medications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Pill className="h-5 w-5 text-primary mr-2" />
          Current Medications
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medications.map((med) => (
                <tr key={med.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {med.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {med.dosage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {med.timeSlots.join(', ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {med.instructions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Activity className="h-5 w-5 text-primary mr-2" />
          Recent Activities
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(activity.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.duration} minutes
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {activity.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
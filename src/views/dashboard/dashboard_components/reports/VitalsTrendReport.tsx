import React from 'react';
import { useVitalsStore } from '../../store/vitalsStore';
import { formatDateTime } from '../../utils/dateUtils';

interface ReportProps {
  dateRange: {
    start: string;
    end: string;
  };
}

export default function VitalsTrendReport({ dateRange }: ReportProps) {
  const { vitalsData } = useVitalsStore();

  // Get vitals within date range
  const getFilteredVitals = (key: string) => {
    return vitalsData[key]?.filter(entry =>
      entry.timestamp >= dateRange.start && entry.timestamp <= dateRange.end
    ) || [];
  };

  const vitalTypes = [
    { key: 'bloodPressure', label: 'Blood Pressure', unit: 'mmHg' },
    { key: 'heartRate', label: 'Heart Rate', unit: 'bpm' },
    { key: 'temperature', label: 'Temperature', unit: '°F' },
    { key: 'oxygenLevel', label: 'Oxygen Level', unit: '%' }
  ];

  return (
    <div className="p-6 space-y-6">
      {vitalTypes.map(type => {
        const entries = getFilteredVitals(type.key);
        if (entries.length === 0) return null;

        return (
          <div key={type.key} className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{type.label}</h3>
            </div>
            <div className="p-6">
              <div className="relative h-64">
                {/* Placeholder for chart visualization */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Chart visualization will be implemented here
                </div>
              </div>
              <div className="mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDateTime(entry.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.value} {type.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            entry.status === 'normal' ? 'bg-green-100 text-green-800' :
                            entry.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {entry.notes || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
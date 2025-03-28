import React from 'react';
import { Check, X, AlertTriangle, TrendingUp } from 'lucide-react';
import { useMedicationStore } from '../../store/medicationStore';

interface ReportProps {
  dateRange: {
    start: string;
    end: string;
  };
}

export default function MedicationAdherenceReport({ dateRange }: ReportProps) {
  const { medications, medicationLogs } = useMedicationStore();

  // Filter logs within date range
  const filteredLogs = medicationLogs.filter(log => 
    log.timestamp >= dateRange.start && log.timestamp <= dateRange.end
  );

  // Calculate adherence stats
  const adherenceStats = medications.map(med => {
    const medLogs = filteredLogs.filter(log => log.medicationId === med.id);
    const totalDoses = medLogs.length;
    const takenDoses = medLogs.filter(log => log.taken).length;
    const adherenceRate = totalDoses > 0 ? (takenDoses / totalDoses) * 100 : 0;

    return {
      medication: med,
      totalDoses,
      takenDoses,
      missedDoses: totalDoses - takenDoses,
      adherenceRate
    };
  });

  // Calculate overall adherence
  const overallAdherence = adherenceStats.reduce((sum, stat) => 
    sum + stat.adherenceRate, 0
  ) / adherenceStats.length;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-green-800 font-medium">Overall Adherence</h4>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {overallAdherence.toFixed(1)}%
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-yellow-800 font-medium">Total Medications</h4>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {medications.length}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-blue-800 font-medium">Total Doses</h4>
            <Check className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {filteredLogs.length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adherence Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taken/Total Doses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Missed Doses
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adherenceStats.map((stat) => (
              <tr key={stat.medication.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {stat.medication.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.medication.dosage}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          stat.adherenceRate >= 90 ? 'bg-green-500' :
                          stat.adherenceRate >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${stat.adherenceRate}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {stat.adherenceRate.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stat.takenDoses}/{stat.totalDoses}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.missedDoses === 0 ? 'bg-green-100 text-green-800' :
                    stat.missedDoses <= 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {stat.missedDoses}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
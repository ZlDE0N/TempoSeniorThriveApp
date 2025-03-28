import React from 'react';
import { DollarSign, Download, Clock } from 'lucide-react';
import { useCaregiverStore } from '../../store/caregiverStore';
import { formatDateTime } from '../../utils/dateUtils';

interface ReportProps {
  dateRange: {
    start: string;
    end: string;
  };
}

export default function BillingReport({ dateRange }: ReportProps) {
  const { shifts, caregivers } = useCaregiverStore();

  // Filter shifts within date range
  const filteredShifts = shifts.filter(shift =>
    shift.startTime >= dateRange.start && 
    shift.startTime <= dateRange.end &&
    shift.status === 'completed'
  );

  // Calculate totals by caregiver
  const caregiverTotals = caregivers.map(caregiver => {
    const caregiverShifts = filteredShifts.filter(shift => 
      shift.caregiverId === caregiver.id
    );

    const totalHours = caregiverShifts.reduce((sum, shift) => {
      if (!shift.endTime) return sum;
      const duration = new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime();
      return sum + (duration / (1000 * 60 * 60));
    }, 0);

    const totalAmount = totalHours * caregiver.hourlyRate;

    return {
      caregiver,
      shifts: caregiverShifts,
      totalHours,
      totalAmount
    };
  }).filter(total => total.shifts.length > 0);

  const grandTotal = caregiverTotals.reduce((sum, { totalAmount }) => 
    sum + totalAmount, 0
  );

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-green-800 font-medium">Total Amount</h4>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${grandTotal.toFixed(2)}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-blue-800 font-medium">Total Hours</h4>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {caregiverTotals.reduce((sum, { totalHours }) => 
              sum + totalHours, 0
            ).toFixed(1)}
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-purple-800 font-medium">Total Shifts</h4>
            <Download className="h-5 w-5 text-purple-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {filteredShifts.length}
          </p>
        </div>
      </div>

      {caregiverTotals.map(({ caregiver, shifts, totalHours, totalAmount }) => (
        <div key={caregiver.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {caregiver.firstName} {caregiver.lastName}
              </h3>
              <div className="text-sm text-gray-500">
                Rate: ${caregiver.hourlyRate}/hour
              </div>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shifts.map((shift) => {
                const hours = shift.endTime
                  ? (new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime()) / (1000 * 60 * 60)
                  : 0;
                const amount = hours * caregiver.hourlyRate;

                return (
                  <tr key={shift.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(shift.startTime).split(' ')[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(shift.startTime).split(' ')[1]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shift.endTime ? formatDateTime(shift.endTime).split(' ')[1] : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {hours.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${amount.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={3} className="px-6 py-4 text-sm text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {totalHours.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
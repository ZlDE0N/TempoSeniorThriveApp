import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Search, DollarSign } from 'lucide-react';
import { useCaregiverStore, CaregiverShift } from '../../store/caregiverStore';
import { formatDateTime, formatDuration } from '../../utils/dateUtils';

interface ShiftHistoryProps {
  caregiverId?: string;
}

export default function ShiftHistory({ caregiverId }: ShiftHistoryProps) {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(1)).toISOString().split('T')[0], // First day of current month
    end: new Date().toISOString().split('T')[0]
  });

  const { shifts, caregivers, getCaregiverHours } = useCaregiverStore();

  // Filter shifts based on date range and optional caregiver ID
  const filteredShifts = shifts
    .filter(shift => {
      const shiftDate = shift.startTime.split('T')[0];
      const matchesDate = shiftDate >= dateRange.start && shiftDate <= dateRange.end;
      return caregiverId ? matchesDate && shift.caregiverId === caregiverId : matchesDate;
    })
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()); // Sort by date, newest first

  // Calculate total hours and earnings for each caregiver
  const caregiverStats = caregivers.reduce((acc, caregiver) => {
    const hours = getCaregiverHours(caregiver.id, dateRange.start, dateRange.end);
    const earnings = hours * caregiver.hourlyRate;
    acc[caregiver.id] = { hours, earnings };
    return acc;
  }, {} as Record<string, { hours: number; earnings: number }>);

  // Calculate totals
  const totalHours = Object.values(caregiverStats).reduce((sum, { hours }) => sum + hours, 0);
  const totalEarnings = Object.values(caregiverStats).reduce((sum, { earnings }) => sum + earnings, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Shift History</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary-light rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-primary">Total Hours</h4>
            </div>
            <p className="text-2xl font-semibold text-primary">
              {totalHours.toFixed(1)}
            </p>
          </div>

          <div className="bg-secondary-light rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <h4 className="font-medium text-secondary">Total Shifts</h4>
            </div>
            <p className="text-2xl font-semibold text-secondary">
              {filteredShifts.length}
            </p>
          </div>

          <div className="bg-accent-light rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-accent" />
              <h4 className="font-medium text-accent">Total Earnings</h4>
            </div>
            <p className="text-2xl font-semibold text-accent">
              ${totalEarnings.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Individual Caregiver Stats */}
        {!caregiverId && caregivers.length > 0 && (
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Caregiver Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caregivers.map(caregiver => {
                const stats = caregiverStats[caregiver.id];
                if (!stats || stats.hours === 0) return null;
                
                return (
                  <div key={caregiver.id} className="bg-white rounded p-3 shadow-sm">
                    <div className="font-medium text-gray-900">
                      {caregiver.firstName} {caregiver.lastName}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stats.hours.toFixed(1)} hours • ${stats.earnings.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {!caregiverId && (
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Caregiver
                  </th>
                )}
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date & Time
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Duration
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Tasks Completed
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredShifts.map((shift) => {
                const caregiver = caregivers.find(c => c.id === shift.caregiverId);
                const duration = shift.endTime
                  ? new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime()
                  : 0;
                const earnings = (duration / (1000 * 60 * 60)) * (caregiver?.hourlyRate || 0);

                return (
                  <tr key={shift.id} className="hover:bg-gray-50">
                    {!caregiverId && (
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                        <div className="font-medium text-gray-900">
                          {caregiver?.firstName} {caregiver?.lastName}
                        </div>
                        <div className="text-gray-500">{caregiver?.type}</div>
                      </td>
                    )}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div>{formatDateTime(shift.startTime)}</div>
                      {shift.endTime && (
                        <div className="text-gray-400">
                          to {formatDateTime(shift.endTime)}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="text-gray-900">
                        {formatDuration(Math.floor(duration / (1000 * 60)))}
                      </div>
                      <div className="text-gray-500">
                        ${earnings.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {shift.tasks.length > 0 ? (
                        <ul className="space-y-1">
                          {shift.tasks.map((task, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">No tasks recorded</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        shift.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : shift.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                      </span>
                      {(shift.checkInLocation || shift.checkOutLocation) && (
                        <div className="mt-1 flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-xs">Location tracked</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
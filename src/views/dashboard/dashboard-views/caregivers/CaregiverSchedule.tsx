import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useCaregiverStore } from '../../../../store/dashboard_store/caregiverStore';
import { formatDateTime } from '../../../../utils/dateUtils';

export default function CaregiverSchedule() {
  const { schedules, getActiveCaregiver } = useCaregiverStore();
  const activeCaregiver = getActiveCaregiver();

  if (!activeCaregiver) return null;

  const caregiverSchedules = schedules.filter(
    schedule => schedule.caregiverId === activeCaregiver.id
  );

  return (
    <div className="space-y-4">
      {caregiverSchedules.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p>No upcoming shifts scheduled</p>
        </div>
      ) : (
        caregiverSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">
                  {schedule.recurring ? 'Recurring Shift' : 'One-time Shift'}
                </h4>
                <span className="text-sm text-gray-500">
                  {schedule.startTime} - {schedule.endTime}
                </span>
              </div>
              {schedule.recurring ? (
                <p className="mt-1 text-sm text-gray-500">
                  Every {schedule.daysOfWeek?.map(day => 
                    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]
                  ).join(', ')}
                </p>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  {formatDateTime(schedule.startDate)}
                </p>
              )}
              {schedule.notes && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-1">
                  {schedule.notes}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
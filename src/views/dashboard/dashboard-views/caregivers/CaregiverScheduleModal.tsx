import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, X } from 'lucide-react';
import { useCaregiverStore, Caregiver, CaregiverSchedule } from '../../store/caregiverStore';
import Modal from '../Modal';
import { formatDateTime, formatDuration } from '../../utils/dateUtils';

interface CaregiverScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiver: Caregiver | null;
}

const daysOfWeek = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

export default function CaregiverScheduleModal({ isOpen, onClose, caregiver }: CaregiverScheduleModalProps) {
  const [newSchedule, setNewSchedule] = useState<Omit<CaregiverSchedule, 'id'>>({
    caregiverId: caregiver?.id || '',
    recurring: false,
    startDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    notes: ''
  });

  const { 
    schedules, 
    addSchedule, 
    deleteSchedule,
    getCaregiverSchedule,
    getCaregiverHours
  } = useCaregiverStore();

  useEffect(() => {
    if (caregiver) {
      setNewSchedule(prev => ({ ...prev, caregiverId: caregiver.id }));
    }
  }, [caregiver]);

  const caregiverSchedules = caregiver ? getCaregiverSchedule(caregiver.id) : [];

  // Calculate hours for current month
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
  const monthlyHours = caregiver ? getCaregiverHours(caregiver.id, firstDayOfMonth, lastDayOfMonth) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSchedule(newSchedule);
    setNewSchedule({
      caregiverId: caregiver?.id || '',
      recurring: false,
      startDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      notes: ''
    });
  };

  const toggleDay = (day: number) => {
    setNewSchedule(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek
        ? prev.daysOfWeek.includes(day)
          ? prev.daysOfWeek.filter(d => d !== day)
          : [...prev.daysOfWeek, day]
        : [day]
    }));
  };

  if (!caregiver) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Schedule for ${caregiver.firstName} ${caregiver.lastName}`}
    >
      <div className="space-y-6">
        <div className="bg-primary-light rounded-lg p-4">
          <h3 className="text-lg font-medium text-primary mb-2">Monthly Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Hours This Month</p>
              <p className="text-2xl font-semibold text-primary">{monthlyHours.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Earnings</p>
              <p className="text-2xl font-semibold text-primary">
                ${(monthlyHours * caregiver.hourlyRate).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Current Schedules</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {caregiverSchedules.length === 0 ? (
              <p className="p-4 text-gray-500 text-center">No schedules set</p>
            ) : (
              caregiverSchedules.map(schedule => (
                <div key={schedule.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        {schedule.recurring ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Recurring
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            One-time
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-900">
                        {schedule.recurring ? (
                          <span>
                            {schedule.daysOfWeek?.map(day => daysOfWeek[day].label).join(', ')}
                          </span>
                        ) : (
                          <span>{new Date(schedule.startDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSchedule(schedule.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  {schedule.notes && (
                    <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {schedule.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newSchedule.recurring}
                onChange={(e) => setNewSchedule(prev => ({ 
                  ...prev, 
                  recurring: e.target.checked,
                  daysOfWeek: e.target.checked ? [] : undefined
                }))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-900">Recurring Schedule</span>
            </label>
          </div>

          {newSchedule.recurring ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days of Week
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleDay(value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      newSchedule.daysOfWeek?.includes(value)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={newSchedule.startDate}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                value={newSchedule.startTime}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                value={newSchedule.endTime}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, endTime: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={newSchedule.notes}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Any additional notes about this schedule..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add Schedule
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
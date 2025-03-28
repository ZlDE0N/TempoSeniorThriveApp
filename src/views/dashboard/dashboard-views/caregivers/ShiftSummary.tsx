import React from 'react';
import { Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { CaregiverShift } from '../../store/caregiverStore';
import { formatDateTime, formatDuration } from '../../utils/dateUtils';

interface ShiftSummaryProps {
  shift: CaregiverShift;
}

export default function ShiftSummary({ shift }: ShiftSummaryProps) {
  const shiftDuration = shift.endTime
    ? new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime()
    : new Date().getTime() - new Date(shift.startTime).getTime();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Current Shift</h3>
              <p className="text-sm text-gray-500">
                Started at {formatDateTime(shift.startTime)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatDuration(Math.floor(shiftDuration / (1000 * 60)))}
            </div>
            <div className="text-sm text-gray-500">
              Duration
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Tasks</h4>
            <div className="space-y-3">
              {shift.tasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks added yet</p>
              ) : (
                shift.tasks.map((task, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-600">{task}</span>
                  </div>
                ))
              )}
              <button className="text-sm text-primary hover:text-primary-hover font-medium">
                + Add Task
              </button>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Shift Notes</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <textarea
                rows={3}
                className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-600 placeholder-gray-400"
                placeholder="Add important notes about this shift..."
                defaultValue={shift.notes}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FileText className="h-4 w-4 mr-2" />
            Save Notes
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            End Shift
          </button>
        </div>
      </div>
    </div>
  );
}
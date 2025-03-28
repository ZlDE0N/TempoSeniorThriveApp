import React, { useState, memo } from 'react';
import { Clock, MapPin, CheckCircle, XCircle, Plus, List } from 'lucide-react';
import { useCaregiverStore, CaregiverShift } from '../../../../store/dashboard_store/caregiverStore';
import { formatDateTime, formatDuration } from '../../../../utils/dateUtils';
import Modal from '../../dashboard_components/Modal';

interface ShiftTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: CaregiverShift;
}

const ShiftTaskModal = memo(function ShiftTaskModal({ isOpen, onClose, shift }: ShiftTaskModalProps) {
  const [newTask, setNewTask] = useState('');
  const { addShiftTask } = useCaregiverStore();

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addShiftTask(shift.id, newTask.trim());
    setNewTask('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Shift Tasks"
    >
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Tasks</h4>
          {shift.tasks.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks added yet</p>
          ) : (
            <ul className="space-y-2">
              {shift.tasks.map((task, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">{task}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          <button
            onClick={handleAddTask}
            disabled={!newTask.trim()}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
});

const ShiftTracker = memo(function ShiftTracker() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { getCurrentShift, getActiveCaregiver, endShift } = useCaregiverStore();

  const currentShift = getCurrentShift();
  const activeCaregiver = getActiveCaregiver();

  if (!currentShift || !activeCaregiver) return null;

  const handleEndShift = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          endShift(currentShift.id, `Checked out at location: ${location}`);
        },
        () => {
          endShift(currentShift.id);
        }
      );
    } else {
      endShift(currentShift.id);
    }
  };

  const shiftDuration = currentShift.endTime
    ? new Date(currentShift.endTime).getTime() - new Date(currentShift.startTime).getTime()
    : new Date().getTime() - new Date(currentShift.startTime).getTime();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-green-100">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Active Shift
              </h3>
              <p className="text-sm text-gray-500">
                {activeCaregiver.firstName} {activeCaregiver.lastName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatDuration(Math.floor(shiftDuration / (1000 * 60)))}
            </div>
            <div className="text-sm text-gray-500">
              Started at {formatDateTime(currentShift.startTime)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Tasks</h4>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="text-primary hover:text-primary-hover"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {currentShift.tasks.length === 0 ? (
              <p className="text-sm text-gray-500">No tasks added yet</p>
            ) : (
              <ul className="space-y-2">
                {currentShift.tasks.map((task, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <h4 className="text-sm font-medium text-gray-900">Location</h4>
            </div>
            <p className="text-sm text-gray-700">
              {currentShift.checkInLocation || 'Location not recorded'}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <List className="h-4 w-4 mr-2" />
            Manage Tasks
          </button>
          <button
            onClick={handleEndShift}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <XCircle className="h-4 w-4 mr-2" />
            End Shift
          </button>
        </div>
      </div>

      <ShiftTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        shift={currentShift}
      />
    </div>
  );
});

export default ShiftTracker;
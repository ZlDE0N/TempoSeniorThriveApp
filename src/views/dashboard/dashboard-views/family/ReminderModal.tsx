<content>import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import Modal from '../Modal';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTime: string;
}

export default function ReminderModal({ isOpen, onClose, eventId, eventTime }: ReminderModalProps) {
  const [reminderTime, setReminderTime] = useState('30');
  const [reminderType, setReminderType] = useState<'notification' | 'email'>('notification');
  const { addReminder } = useEventStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventDate = new Date(eventTime);
    const reminderDate = new Date(eventDate.getTime() - parseInt(reminderTime) * 60000);

    addReminder({
      eventId,
      time: reminderDate.toISOString(),
      type: reminderType
    });
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Set Reminder"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Remind me before
          </label>
          <select
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="1440">1 day</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reminder Type
          </label>
          <div className="mt-2 space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="notification"
                checked={reminderType === 'notification'}
                onChange={(e) => setReminderType(e.target.value as 'notification' | 'email')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Browser Notification</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="email"
                checked={reminderType === 'email'}
                onChange={(e) => setReminderType(e.target.value as 'notification' | 'email')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Email</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
          >
            <Bell className="h-4 w-4 mr-2" />
            Set Reminder
          </button>
        </div>
      </form>
    </Modal>
  );
}</content>
import React, { useState } from 'react';
import { Clock, MapPin, Users, Calendar, Heart, Stethoscope, GraduationCap, Coffee } from 'lucide-react';
import { useActivityStore } from '../../store/activityStore';
import { useSocialStore } from '../../store/socialStore';
import Modal from '../Modal';
import { getCurrentDateTime, timeToDateTime, getTimeFromDateTime } from '../../utils/dateUtils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

type EventType = 'activity' | 'social' | 'visit' | 'medical' | 'education' | 'meal' | 'other';

const eventTypes = [
  { value: 'activity', label: 'Care Activity', icon: Heart },
  { value: 'social', label: 'Social Activity', icon: Users },
  { value: 'visit', label: 'Family Visit', icon: Users },
  { value: 'medical', label: 'Medical Appointment', icon: Stethoscope },
  { value: 'education', label: 'Educational Activity', icon: GraduationCap },
  { value: 'meal', label: 'Meal Time', icon: Coffee },
  { value: 'other', label: 'Other Event', icon: Calendar }
] as const;

export default function EventModal({ isOpen, onClose, selectedDate }: EventModalProps) {
  const [formData, setFormData] = useState({
    type: 'activity' as EventType,
    title: '',
    date: selectedDate.toISOString().split('T')[0],
    time: '09:00',
    duration: 60,
    location: '',
    participants: '',
    provider: '', // For medical appointments
    topic: '', // For educational activities
    mealType: '', // For meals
    category: '', // For other events
    notes: ''
  });

  const { addActivity } = useActivityStore();
  const { addActivity: addSocialActivity } = useSocialStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const timestamp = timeToDateTime(formData.time, formData.date);
    
    switch (formData.type) {
      case 'activity':
        addActivity({
          timestamp,
          type: 'routine',
          name: formData.title,
          duration: formData.duration,
          completed: false,
          notes: formData.notes
        });
        break;

      case 'social':
      case 'visit':
        addSocialActivity({
          timestamp,
          type: formData.type === 'visit' ? 'family-visit' : 'group-activity',
          participants: formData.participants.split(',').map(name => ({
            id: crypto.randomUUID(),
            name: name.trim()
          })),
          duration: formData.duration,
          location: formData.location,
          notes: formData.notes
        });
        break;

      case 'medical':
        addActivity({
          timestamp,
          type: 'medical-visit',
          name: `${formData.title} with ${formData.provider}`,
          duration: formData.duration,
          location: formData.location,
          completed: false,
          notes: formData.notes
        });
        break;

      case 'education':
        addActivity({
          timestamp,
          type: 'cognitive-learning',
          name: formData.title,
          duration: formData.duration,
          topic: formData.topic,
          completed: false,
          notes: formData.notes
        });
        break;

      case 'meal':
        addActivity({
          timestamp,
          type: 'routine',
          name: `${formData.mealType}: ${formData.title}`,
          duration: formData.duration,
          completed: false,
          notes: formData.notes
        });
        break;

      case 'other':
        addActivity({
          timestamp,
          type: 'routine',
          name: formData.title,
          category: formData.category,
          duration: formData.duration,
          location: formData.location,
          completed: false,
          notes: formData.notes
        });
        break;
    }
    
    onClose();
    // Reset form
    setFormData({
      type: 'activity',
      title: '',
      date: selectedDate.toISOString().split('T')[0],
      time: '09:00',
      duration: 60,
      location: '',
      participants: '',
      provider: '',
      topic: '',
      mealType: '',
      category: '',
      notes: ''
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Event"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              type: e.target.value as EventType 
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            min="1"
            required
          />
        </div>

        {/* Medical Appointment Fields */}
        {formData.type === 'medical' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Healthcare Provider
            </label>
            <input
              type="text"
              value={formData.provider}
              onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Doctor's name or specialty"
              required
            />
          </div>
        )}

        {/* Educational Activity Fields */}
        {formData.type === 'education' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Topic/Subject
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Learning topic or subject"
              required
            />
          </div>
        )}

        {/* Meal Fields */}
        {formData.type === 'meal' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meal Type
            </label>
            <select
              value={formData.mealType}
              onChange={(e) => setFormData(prev => ({ ...prev, mealType: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            >
              <option value="">Select meal type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
        )}

        {/* Other Event Fields */}
        {formData.type === 'other' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Event category"
              required
            />
          </div>
        )}

        {/* Location Field for applicable types */}
        {['social', 'visit', 'medical', 'other'].includes(formData.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="e.g., Home, Park, Community Center"
            />
          </div>
        )}

        {/* Participants Field for social events */}
        {['social', 'visit'].includes(formData.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Participants
            </label>
            <input
              type="text"
              value={formData.participants}
              onChange={(e) => setFormData(prev => ({ ...prev, participants: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Names separated by commas"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Any additional notes..."
          />
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
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
          >
            Add Event
          </button>
        </div>
      </form>
    </Modal>
  );
}
import React, { useState, useEffect } from 'react';
import { useHealthStore, MoodEntry } from '../../../../../store/dashboard_store/healthStore';
import Modal from '../../../dashboard_components/Modal';
import { Smile, Meh, Frown } from 'lucide-react';

interface MoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry?: MoodEntry | null;
}

const commonActivities = [
  'Exercise',
  'Social Interaction',
  'Reading',
  'Meditation',
  'Hobbies',
  'Work',
  'Entertainment',
  'Outdoors'
];

const commonTriggers = [
  'Stress',
  'Lack of Sleep',
  'Physical Health',
  'Social Events',
  'Work/Tasks',
  'Weather',
  'Environment'
];

export default function MoodModal({ isOpen, onClose, entry }: MoodModalProps) {
  const [formData, setFormData] = useState<Omit<MoodEntry, 'id'>>({
    timestamp: new Date().toISOString(),
    level: 3,
    notes: '',
    triggers: [],
    activities: [],
    symptoms: []
  });

  const { addMoodEntry, updateMoodEntry } = useHealthStore();

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    } else {
      setFormData({
        timestamp: new Date().toISOString(),
        level: 3,
        notes: '',
        triggers: [],
        activities: [],
        symptoms: []
      });
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (entry) {
      updateMoodEntry(entry.id, formData);
    } else {
      addMoodEntry(formData);
    }
    
    onClose();
  };

  const toggleItem = (item: string, list: keyof Pick<MoodEntry, 'triggers' | 'activities'>) => {
    setFormData(prev => ({
      ...prev,
      [list]: prev[list]?.includes(item)
        ? prev[list]?.filter(i => i !== item)
        : [...(prev[list] || []), item]
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={entry ? 'Edit Mood Entry' : 'Log Mood'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mood Level
          </label>
          <div className="mt-2 flex items-center justify-around">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, level: level as 1 | 2 | 3 | 4 | 5 }))}
                className={`p-4 rounded-full transition-colors ${
                  formData.level === level
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level <= 2 ? (
                  <Frown className="h-8 w-8" />
                ) : level === 3 ? (
                  <Meh className="h-8 w-8" />
                ) : (
                  <Smile className="h-8 w-8" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activities
          </label>
          <div className="flex flex-wrap gap-2">
            {commonActivities.map(activity => (
              <button
                key={activity}
                type="button"
                onClick={() => toggleItem(activity, 'activities')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.activities?.includes(activity)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Triggers
          </label>
          <div className="flex flex-wrap gap-2">
            {commonTriggers.map(trigger => (
              <button
                key={trigger}
                type="button"
                onClick={() => toggleItem(trigger, 'triggers')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.triggers?.includes(trigger)
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {trigger}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="How are you feeling? What's on your mind?"
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
            {entry ? 'Update' : 'Log'} Mood
          </button>
        </div>
      </form>
    </Modal>
  );
}
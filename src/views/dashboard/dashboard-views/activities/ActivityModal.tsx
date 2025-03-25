import React, { useState, useEffect } from 'react';
import { Activity as ActivityIcon, Brain, Users, Calendar, Clock } from 'lucide-react';
import { useActivityStore, Activity, ActivityType } from '../../../../store/dashboard_store/activityStore';
import Modal from '../../../../components/Modal';
import MoodSelector from './MoodSelector';
import { getCurrentDateTime, timeToDateTime, getTimeFromDateTime } from '../../../../utils/dateUtils';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity?: Activity | null;
  initialType?: ActivityType | null;
}

const activityTypeInfo = {
  'physical-exercise': {
    icon: ActivityIcon,
    label: 'Physical Exercise',
    color: 'primary',
    examples: ['Walking', 'Exercise', 'Stretching']
  },
  'physical-therapy': {
    icon: ActivityIcon,
    label: 'Physical Therapy',
    color: 'primary',
    examples: ['Rehabilitation', 'Strength Training', 'Balance Exercises']
  },
  'cognitive-memory': {
    icon: Brain,
    label: 'Memory & Recall',
    color: 'secondary',
    examples: ['Pattern Matching', 'Word Recall', 'Picture Memory']
  },
  'cognitive-problem-solving': {
    icon: Brain,
    label: 'Problem Solving',
    color: 'secondary',
    examples: ['Puzzles', 'Logic Games', 'Math Problems']
  },
  'cognitive-language': {
    icon: Brain,
    label: 'Language Skills',
    color: 'secondary',
    examples: ['Word Games', 'Story Telling', 'Reading']
  },
  'cognitive-attention': {
    icon: Brain,
    label: 'Attention & Focus',
    color: 'secondary',
    examples: ['Concentration Tasks', 'Sorting', 'Detail Finding']
  },
  'social': {
    icon: Users,
    label: 'Social Activity',
    color: 'accent',
    examples: ['Conversation', 'Group Activities', 'Family Time']
  },
  'routine': {
    icon: Calendar,
    label: 'Daily Routine',
    color: 'primary',
    examples: ['Hygiene', 'Dressing', 'Meal Prep']
  }
} as const;

const initialState: Omit<Activity, 'id'> = {
  timestamp: getCurrentDateTime(),
  type: 'physical-exercise',
  name: '',
  duration: 30,
  intensity: 'moderate',
  completed: false,
  notes: ''
};

export default function ActivityModal({ isOpen, onClose, activity, initialType }: ActivityModalProps) {
  const [formData, setFormData] = useState<Omit<Activity, 'id'>>({
    ...initialState,
    type: initialType || initialState.type
  });
  const { addActivity, updateActivity } = useActivityStore();

  useEffect(() => {
    if (activity) {
      setFormData(activity);
    } else if (initialType) {
      setFormData({ ...initialState, type: initialType });
    } else {
      setFormData(initialState);
    }
  }, [activity, initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activity) {
      updateActivity(activity.id, formData);
    } else {
      addActivity(formData);
    }
    
    onClose();
  };

  const currentTypeInfo = activityTypeInfo[formData.type];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activity ? 'Edit Activity' : 'Log New Activity'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Activity Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              type: e.target.value as ActivityType 
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            {Object.entries(activityTypeInfo).map(([type, info]) => (
              <option key={type} value={type}>
                {info.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Examples: {currentTypeInfo.examples.join(', ')}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Activity Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder={currentTypeInfo.examples[0]}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="time"
                value={getTimeFromDateTime(formData.timestamp)}
                onChange={(e) => {
                  const newDateTime = timeToDateTime(e.target.value);
                  setFormData(prev => ({ ...prev, timestamp: newDateTime }));
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                duration: parseInt(e.target.value) || 0 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
        </div>

        {formData.type.startsWith('physical-') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Intensity
            </label>
            <select
              value={formData.intensity}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                intensity: e.target.value as 'low' | 'moderate' | 'high' 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        )}

        {formData.type.startsWith('cognitive-') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Score (optional)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                min="0"
                max="100"
                value={formData.score || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  score: e.target.value ? parseInt(e.target.value) : undefined
                }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm pr-8"
                placeholder="0-100"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
        )}

        <MoodSelector
          value={formData.mood}
          onChange={(value) => setFormData(prev => ({ ...prev, mood: value }))}
        />

        {(formData.type.startsWith('physical-') || formData.type === 'routine') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assistance Level
            </label>
            <select
              value={formData.assistance}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                assistance: e.target.value as 'none' | 'minimal' | 'moderate' | 'full'
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="none">No assistance needed</option>
              <option value="minimal">Minimal assistance</option>
              <option value="moderate">Moderate assistance</option>
              <option value="full">Full assistance</option>
            </select>
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
            placeholder="Any additional notes about this activity..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {activity ? 'Update' : 'Log'} Activity
          </button>
        </div>
      </form>
    </Modal>
  );
}
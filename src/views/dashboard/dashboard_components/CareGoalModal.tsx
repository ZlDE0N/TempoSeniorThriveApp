import React, { useState, useEffect } from 'react';
import { Plus, Minus, Target } from 'lucide-react';
import { useQualityStore, CareGoal, AssessmentType } from '../../../store/dashboard_store/qualityStore';
import Modal from './Modal';
import { getCurrentDateTime } from '../../../utils/dateUtils';

interface CareGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal?: CareGoal | null;
  initialCategory?: AssessmentType;
}

const initialState: Omit<CareGoal, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  category: 'physical',
  targetDate: new Date().toISOString().split('T')[0],
  status: 'not-started',
  progress: 0,
  milestones: [],
  notes: ''
};

export default function CareGoalModal({ isOpen, onClose, goal, initialCategory }: CareGoalModalProps) {
  const [formData, setFormData] = useState<Omit<CareGoal, 'id' | 'createdAt' | 'updatedAt'>>(initialState);
  const [newMilestone, setNewMilestone] = useState('');
  const { addGoal, updateGoal } = useQualityStore();

  useEffect(() => {
    if (goal) {
      setFormData(goal);
    } else {
      setFormData({
        ...initialState,
        category: initialCategory || initialState.category
      });
    }
  }, [goal, initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (goal) {
      updateGoal(goal.id, formData);
    } else {
      addGoal(formData);
    }
    
    onClose();
  };

  const addMilestone = () => {
    if (!newMilestone.trim()) return;
    setFormData(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: crypto.randomUUID(),
          title: newMilestone.trim(),
          completed: false
        }
      ]
    }));
    setNewMilestone('');
  };

  const toggleMilestone = (id: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(milestone =>
        milestone.id === id
          ? {
              ...milestone,
              completed: !milestone.completed,
              completedAt: !milestone.completed ? getCurrentDateTime() : undefined
            }
          : milestone
      ),
      progress: Math.round(
        (prev.milestones.filter(m => 
          m.id === id ? !m.completed : m.completed
        ).length / prev.milestones.length) * 100
      )
    }));
  };

  const removeMilestone = (id: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id),
      progress: prev.milestones.length > 1
        ? Math.round(
            (prev.milestones.filter(m => 
              m.id !== id && m.completed
            ).length / (prev.milestones.length - 1)) * 100
          )
        : 0
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={goal ? 'Edit Care Goal' : 'New Care Goal'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Goal Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              category: e.target.value as AssessmentType 
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="physical">Physical Health</option>
            <option value="cognitive">Cognitive Function</option>
            <option value="emotional">Emotional Wellbeing</option>
            <option value="social">Social Engagement</option>
            <option value="independence">Independence</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Target Date
          </label>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData(prev => ({ ...prev, targetDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              status: e.target.value as CareGoal['status']
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="achieved">Achieved</option>
            <option value="delayed">Delayed</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Milestones
            </label>
            <span className="text-sm text-gray-500">
              Progress: {formData.progress}%
            </span>
          </div>
          <div className="space-y-2">
            {formData.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={() => toggleMilestone(milestone.id)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className={`flex-1 text-sm ${
                  milestone.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {milestone.title}
                </span>
                <button
                  type="button"
                  onClick={() => removeMilestone(milestone.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="text"
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMilestone())}
              placeholder="Add a milestone..."
              className="block flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            <button
              type="button"
              onClick={addMilestone}
              className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
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
            placeholder="Any additional notes about this goal..."
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
            {goal ? 'Update' : 'Create'} Goal
          </button>
        </div>
      </form>
    </Modal>
  );
}
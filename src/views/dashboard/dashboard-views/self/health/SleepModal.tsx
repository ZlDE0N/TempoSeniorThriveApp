import React, { useState, useEffect } from 'react';
import { useHealthStore, SleepEntry } from '../../../store/healthStore';
import Modal from '../../Modal';

interface SleepModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry?: SleepEntry | null;
}

const sleepFactors = {
  stress: 'Stress',
  exercise: 'Exercise',
  caffeine: 'Caffeine',
  medication: 'Medication',
  noise: 'Noise',
  temperature: 'Temperature'
};

export default function SleepModal({ isOpen, onClose, entry }: SleepModalProps) {
  const [formData, setFormData] = useState<Omit<SleepEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    quality: 3,
    interruptions: 0,
    notes: '',
    factors: {}
  });

  const { addSleepEntry, updateSleepEntry } = useHealthStore();

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        quality: 3,
        interruptions: 0,
        notes: '',
        factors: {}
      });
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (entry) {
      updateSleepEntry(entry.id, formData);
    } else {
      addSleepEntry(formData);
    }
    
    onClose();
  };

  const toggleFactor = (factor: keyof typeof sleepFactors) => {
    setFormData(prev => ({
      ...prev,
      factors: {
        ...prev.factors,
        [factor]: !prev.factors?.[factor]
      }
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={entry ? 'Edit Sleep Entry' : 'Log Sleep'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bedtime
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wake Time
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sleep Quality (1-5)
          </label>
          <div className="mt-2 flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, quality: level as 1 | 2 | 3 | 4 | 5 }))}
                className={`w-10 h-10 rounded-full ${
                  formData.quality === level
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Interruptions
          </label>
          <input
            type="number"
            min="0"
            value={formData.interruptions}
            onChange={(e) => setFormData(prev => ({ ...prev, interruptions: parseInt(e.target.value) || 0 }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Factors Affecting Sleep
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(sleepFactors).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleFactor(key as keyof typeof sleepFactors)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.factors?.[key as keyof typeof sleepFactors]
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
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
            placeholder="Any additional notes about your sleep..."
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
            {entry ? 'Update' : 'Log'} Sleep
          </button>
        </div>
      </form>
    </Modal>
  );
}
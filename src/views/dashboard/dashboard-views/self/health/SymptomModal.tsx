import React, { useState, useEffect } from 'react';
import { useHealthStore, SymptomEntry } from '../../../store/healthStore';
import Modal from '../../Modal';

interface SymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
  symptom?: SymptomEntry | null;
}

const symptomTypes = [
  'Pain',
  'Fatigue',
  'Dizziness',
  'Nausea',
  'Headache',
  'Shortness of Breath',
  'Anxiety',
  'Sleep Issues',
  'Other'
];

const bodyLocations = [
  'Head',
  'Neck',
  'Chest',
  'Back',
  'Arms',
  'Legs',
  'Stomach',
  'Joints',
  'General'
];

const commonTriggers = [
  'Stress',
  'Physical Activity',
  'Weather Changes',
  'Food',
  'Medication',
  'Sleep Changes',
  'Environmental'
];

const reliefMethods = [
  'Rest',
  'Medication',
  'Exercise',
  'Heat/Cold Therapy',
  'Deep Breathing',
  'Position Change',
  'Hydration'
];

export default function SymptomModal({ isOpen, onClose, symptom }: SymptomModalProps) {
  const [formData, setFormData] = useState<Omit<SymptomEntry, 'id'>>({
    timestamp: new Date().toISOString(),
    type: '',
    severity: 3,
    location: '',
    description: '',
    triggers: [],
    duration: 0,
    relievedBy: []
  });

  const { addSymptom, updateSymptom } = useHealthStore();

  useEffect(() => {
    if (symptom) {
      setFormData(symptom);
    } else {
      setFormData({
        timestamp: new Date().toISOString(),
        type: '',
        severity: 3,
        location: '',
        description: '',
        triggers: [],
        duration: 0,
        relievedBy: []
      });
    }
  }, [symptom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (symptom) {
      updateSymptom(symptom.id, formData);
    } else {
      addSymptom(formData);
    }
    
    onClose();
  };

  const toggleTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers?.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...(prev.triggers || []), trigger]
    }));
  };

  const toggleReliefMethod = (method: string) => {
    setFormData(prev => ({
      ...prev,
      relievedBy: prev.relievedBy?.includes(method)
        ? prev.relievedBy.filter(m => m !== method)
        : [...(prev.relievedBy || []), method]
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={symptom ? 'Edit Symptom' : 'Log New Symptom'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Symptom Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          >
            <option value="">Select type</option>
            {symptomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Select location</option>
            {bodyLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity (1-5)
          </label>
          <div className="mt-2 flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, severity: level as 1 | 2 | 3 | 4 | 5 }))}
                className={`w-10 h-10 rounded-full ${
                  formData.severity === level
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
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            min="0"
          />
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
                onClick={() => toggleTrigger(trigger)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.triggers?.includes(trigger)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {trigger}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relief Methods
          </label>
          <div className="flex flex-wrap gap-2">
            {reliefMethods.map(method => (
              <button
                key={method}
                type="button"
                onClick={() => toggleReliefMethod(method)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.relievedBy?.includes(method)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
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
            placeholder="Describe your symptoms in detail..."
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
            {symptom ? 'Update' : 'Log'} Symptom
          </button>
        </div>
      </form>
    </Modal>
  );
}
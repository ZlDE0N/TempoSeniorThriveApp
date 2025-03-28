import React, { useState, useEffect } from 'react';
import { Plus, Minus, Users } from 'lucide-react';
import { useMedicationStore } from '@/store/dashboard_store/medicationStore';
import { useCaregiverStore } from '@/store/dashboard_store/caregiverStore';
import Modal from '../../dashboard_components/Modal';
import MedicationSearch from './MedicationSearch';
import type { MedicationSuggestion } from '@/services/medicationService';


interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication?: any;
}

const initialState = {
  name: '',
  dosage: '',
  frequency: 'daily',
  instructions: '',
  startDate: new Date().toISOString().split('T')[0],
  timeSlots: ['09:00'],
  color: 'primary' as const,
  active: true,
  prescribedBy: '',
  refillDate: '',
  notes: '',
  authorizedCaregivers: [] as string[]
};

export default function MedicationModal({ isOpen, onClose, medication }: MedicationModalProps) {
  const [formData, setFormData] = useState(initialState);
  const { addMedication, updateMedication } = useMedicationStore();
  const { caregivers } = useCaregiverStore();

  useEffect(() => {
    if (medication) {
      setFormData(medication);
    } else {
      setFormData(initialState);
    }
  }, [medication]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (medication) {
      updateMedication(medication.id, formData);
    } else {
      addMedication(formData);
    }
    
    onClose();
  };

  const handleMedicationSelect = (suggestion: MedicationSuggestion) => {
    setFormData(prev => ({
      ...prev,
      name: suggestion.name,
      dosage: suggestion.strength || '',
      instructions: `Take as prescribed. Form: ${suggestion.dosageForm || 'Not specified'}`,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={medication ? 'Edit Medication' : 'Add New Medication'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Medication Name
          </label>
          <div className="mt-1">
            <MedicationSearch 
              onSelect={handleMedicationSelect} 
              initialValue={formData.name}
              onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dosage
          </label>
          <input
            type="text"
            value={formData.dosage}
            onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
            placeholder="e.g., 500mg, 2 tablets"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Frequency
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="daily">Daily</option>
            <option value="twice-daily">Twice Daily</option>
            <option value="weekly">Weekly</option>
            <option value="as-needed">As Needed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Slots</label>
          <div className="mt-1 space-y-2">
            {formData.timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="time"
                  value={slot}
                  onChange={(e) => {
                    const newSlots = [...formData.timeSlots];
                    newSlots[index] = e.target.value;
                    setFormData(prev => ({ ...prev, timeSlots: newSlots }));
                  }}
                  className="block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
                {formData.timeSlots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newSlots = formData.timeSlots.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, timeSlots: newSlots }));
                    }}
                    className="p-1 rounded-full text-red-600 hover:bg-red-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  timeSlots: [...prev.timeSlots, '09:00']
                }));
              }}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Time
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="e.g., Take with food"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Authorized Caregivers
          </label>
          <div className="mt-1 bg-gray-50 rounded-lg p-4 space-y-2">
            {caregivers.map(caregiver => (
              <label key={caregiver.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.authorizedCaregivers?.includes(caregiver.id) || false}
                  onChange={(e) => {
                    const caregiverIds = e.target.checked
                      ? [...(formData.authorizedCaregivers || []), caregiver.id]
                      : (formData.authorizedCaregivers || []).filter(id => id !== caregiver.id);
                    setFormData(prev => ({ ...prev, authorizedCaregivers: caregiverIds }));
                  }}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {caregiver.firstName} {caregiver.lastName} ({caregiver.type})
                </span>
              </label>
            ))}
            {caregivers.length === 0 && (
              <p className="text-sm text-gray-500">No caregivers available</p>
            )}
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
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
          >
            {medication ? 'Update' : 'Add'} Medication
          </button>
        </div>
      </form>
    </Modal>
  );
}
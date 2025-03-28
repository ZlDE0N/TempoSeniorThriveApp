import React, { useState } from 'react';
import { useVitalsStore } from '@/store/dashboard_store/vitalsStore';
import Modal from '../Modal';

interface VitalEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vitalKey: string;
  title: string;
  unit: string;
  color: 'primary' | 'secondary' | 'accent';
}

const colorStyles = {
  primary: 'bg-primary hover:bg-primary-hover focus:ring-primary',
  secondary: 'bg-secondary hover:bg-secondary-hover focus:ring-secondary',
  accent: 'bg-accent hover:bg-accent-hover focus:ring-accent',
};

export default function VitalEntryModal({ 
  isOpen, 
  onClose, 
  vitalKey, 
  title, 
  unit, 
  color 
}: VitalEntryModalProps) {
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const addEntry = useVitalsStore((state) => state.addEntry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEntry(vitalKey, {
      timestamp: new Date().toISOString(),
      value,
      notes: notes.trim() || undefined,
    });

    onClose();
    setValue('');
    setNotes('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add ${title} Reading`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">
            Value ({unit})
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="value"
              id="value"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder={`Enter ${title.toLowerCase()}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes (optional)
          </label>
          <div className="mt-1">
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Add any additional notes..."
            />
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
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${colorStyles[color]}`}
          >
            Save Reading
          </button>
        </div>
      </form>
    </Modal>
  );
}
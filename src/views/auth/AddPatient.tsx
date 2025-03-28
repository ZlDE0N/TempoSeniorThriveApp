import React, { useState } from 'react';
// import { useUserStore } from '../../store/userStore';
import { useUserStore } from '@/store/dashboard_store/userStore';
import Modal from '../dashboard/dashboard_components/Modal';

interface AddPatientProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPatient({ isOpen, onClose }: AddPatientProps) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { currentUser, addPatient } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    addPatient({
      name,
      dateOfBirth,
      role: 'self',
      caregivers: [currentUser.id],
      primaryCaregiver: currentUser.id,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    });

    onClose();
    setName('');
    setDateOfBirth('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Patient"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="patientName"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="dateOfBirth"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Add Patient
          </button>
        </div>
      </form>
    </Modal>
  );
}
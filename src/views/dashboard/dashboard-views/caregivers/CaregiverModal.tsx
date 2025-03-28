import React, { useState, useEffect } from 'react';
import { Plus, Minus, MapPin } from 'lucide-react';
import { useCaregiverStore, Caregiver, CaregiverType } from '../../store/caregiverStore';
import Modal from '../Modal';

interface CaregiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiver?: Caregiver | null;
}

const initialState: Omit<Caregiver, 'id'> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  type: 'home-health-aide',
  qualifications: [],
  certifications: [],
  availability: {
    daysOfWeek: [],
    preferredHours: []
  },
  hourlyRate: 0,
  emergencyContact: {
    name: '',
    relationship: '',
    phone: ''
  },
  startDate: new Date().toISOString().split('T')[0],
  status: 'active',
  notes: '',
  location: undefined
};

export default function CaregiverModal({ isOpen, onClose, caregiver }: CaregiverModalProps) {
  const [formData, setFormData] = useState(initialState);
  const [newQualification, setNewQualification] = useState('');
  const { addCaregiver, updateCaregiver } = useCaregiverStore();

  useEffect(() => {
    if (caregiver) {
      setFormData(caregiver);
    } else {
      setFormData(initialState);
    }
  }, [caregiver]);

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            lastUpdated: new Date().toISOString()
          }
        }));
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (caregiver) {
      updateCaregiver(caregiver.id, formData);
    } else {
      addCaregiver(formData);
    }
    
    onClose();
  };

  const addQualification = () => {
    if (!newQualification.trim()) return;
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, newQualification.trim()]
    }));
    setNewQualification('');
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={caregiver ? 'Edit Caregiver' : 'Add New Caregiver'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              type: e.target.value as CaregiverType
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="registered-nurse">Registered Nurse (RN)</option>
            <option value="licensed-practical-nurse">Licensed Practical Nurse (LPN)</option>
            <option value="certified-nursing-assistant">Certified Nursing Assistant (CNA)</option>
            <option value="home-health-aide">Home Health Aide</option>
            <option value="personal-care-aide">Personal Care Aide</option>
            <option value="companion">Companion</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location Tracking
          </label>
          <div className="mt-2">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Update Current Location
            </button>
            {formData.location && (
              <p className="mt-1 text-sm text-gray-500">Last updated: {new Date(formData.location.lastUpdated).toLocaleString()}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.hourlyRate}
            onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: parseFloat(e.target.value) || 0 }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
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
              status: e.target.value as 'active' | 'inactive' | 'on-leave'
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
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
            {caregiver ? 'Update' : 'Add'} Caregiver
          </button>
        </div>
      </form>
    </Modal>
  );
}
import React, { useState } from 'react';
import { Pill, Plus, X } from 'lucide-react';
import Modal from '../../dashboard_components/Modal';

interface AddPharmacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (pharmacy: {
    name: string;
    address: string;
    phone: string;
    hours: string;
    services: string[];
    notes?: string;
    isPreferred?: boolean;
    url?: string;
  }) => void;
}

export default function AddPharmacyModal({ isOpen, onClose, onAdd }: AddPharmacyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    hours: '',
    services: [''],
    notes: '',
    isPreferred: false,
    url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      services: formData.services.filter(s => s.trim() !== '')
    });
    onClose();
    setFormData({
      name: '',
      address: '',
      phone: '',
      hours: '',
      services: [''],
      notes: '',
      isPreferred: false,
      url: ''
    });
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, '']
    }));
  };

  const updateService = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) => i === index ? value : s)
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Local Pharmacy"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pharmacy Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
            placeholder="e.g., Community Pharmacy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
            placeholder="Full address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
              placeholder="(123) 456-7890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hours of Operation
            </label>
            <input
              type="text"
              value={formData.hours}
              onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
              placeholder="e.g., Mon-Fri 9am-7pm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services Offered
          </label>
          <div className="space-y-2">
            {formData.services.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => updateService(index, e.target.value)}
                  className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="e.g., Prescription Delivery, Compounding"
                />
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addService}
              className="text-sm text-primary hover:text-primary-hover font-medium"
            >
              + Add Service
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Any additional information about this pharmacy"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="preferred"
            checked={formData.isPreferred}
            onChange={(e) => setFormData(prev => ({ ...prev, isPreferred: e.target.checked }))}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="preferred" className="ml-2 text-sm text-gray-700">
            Set as preferred pharmacy
          </label>
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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
          >
            <Pill className="h-4 w-4 mr-2" />
            Add Pharmacy
          </button>
        </div>
      </form>
    </Modal>
  );
}
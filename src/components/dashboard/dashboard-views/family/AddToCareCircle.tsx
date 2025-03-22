import React, { useState } from 'react';
import { UserPlus, Users, Heart } from 'lucide-react';
import Modal from '../Modal';
import { useCaregiverStore, CaregiverType } from '../../store/caregiverStore';
import { useContactStore } from '../../store/contactStore';

type AddType = 'caregiver' | 'family';

export default function AddToCareCircle() {
  const [isOpen, setIsOpen] = useState(false);
  const [addType, setAddType] = useState<AddType>('family');
  const { addCaregiver } = useCaregiverStore();
  const { addContact } = useContactStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Caregiver specific
    type: 'home-health-aide' as CaregiverType,
    hourlyRate: 0,
    qualifications: [] as string[],
    // Family specific
    relationship: '',
    priority: 'secondary' as const,
    address: {
      street: '',
      unit: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (addType === 'caregiver') {
      addCaregiver({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        hourlyRate: formData.hourlyRate,
        qualifications: formData.qualifications,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0]
      });
    } else {
      addContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        relationship: formData.relationship,
        type: 'family',
        priority: formData.priority,
        address: formData.address
      });
    }

    setIsOpen(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      type: 'home-health-aide',
      hourlyRate: 0,
      qualifications: [],
      relationship: '',
      priority: 'secondary',
      address: {
        street: '',
        unit: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    });
  };

  return (
    <>
      <div className="flex space-x-4">
        <button
          onClick={() => {
            setAddType('family');
            setIsOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-hover"
        >
          <Heart className="h-4 w-4 mr-2" />
          Add Family Member
        </button>
        <button
          onClick={() => {
            setAddType('caregiver');
            setIsOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-hover"
        >
          <Users className="h-4 w-4 mr-2" />
          Add Caregiver
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={addType === 'caregiver' ? 'Add New Caregiver' : 'Add Family Member'}
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

          {addType === 'caregiver' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Caregiver Type
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    hourlyRate: parseFloat(e.target.value) || 0 
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relationship to Senior
                </label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                  placeholder="e.g., Son, Daughter, Grandchild"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    priority: e.target.value as 'primary' | 'secondary' | 'other'
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="primary">Primary Contact</option>
                  <option value="secondary">Secondary Contact</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Address Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, street: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, city: e.target.value }
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, state: e.target.value }
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, zipCode: e.target.value }
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.address.country}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, country: e.target.value }
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
            >
              Add to Care Circle
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
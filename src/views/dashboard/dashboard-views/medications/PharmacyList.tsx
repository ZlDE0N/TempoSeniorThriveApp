import React, { useState } from 'react';
import { Pill, Plus, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import AddPharmacyModal from './AddPharmacyModal';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  notes?: string;
  isPreferred?: boolean;
  url?: string;
}

const defaultPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'CVS Pharmacy',
    address: '123 Health St, Anytown, USA',
    phone: '(555) 123-4567',
    hours: 'Mon-Fri 8am-9pm, Sat-Sun 9am-6pm',
    services: ['Prescription Delivery', '24/7 Support', 'Auto Refills', 'Immunizations'],
    url: 'https://www.cvs.com'
  },
  {
    id: '2',
    name: 'Walgreens',
    address: '456 Wellness Ave, Anytown, USA',
    phone: '(555) 234-5678',
    hours: 'Mon-Sun 8am-10pm',
    services: ['Drive-thru', 'Same Day Delivery', 'Medication Sync', 'Specialty Medications'],
    url: 'https://www.walgreens.com'
  }
];

export default function PharmacyList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(defaultPharmacies);

  const handleAddPharmacy = (pharmacy: Omit<Pharmacy, 'id'>) => {
    const newPharmacy = {
      ...pharmacy,
      id: crypto.randomUUID()
    };
    setPharmacies(prev => [...prev, newPharmacy]);
  };

  const togglePreferred = (id: string) => {
    setPharmacies(prev => prev.map(pharmacy => 
      pharmacy.id === id 
        ? { ...pharmacy, isPreferred: !pharmacy.isPreferred }
        : pharmacy
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Pharmacies</h3>
          <p className="text-sm text-gray-500">Manage your preferred pharmacies</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Pharmacy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pharmacies.map((pharmacy) => (
          <div 
            key={pharmacy.id}
            className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
              pharmacy.isPreferred ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-primary-light">
                    <Pill className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                    <button
                      onClick={() => togglePreferred(pharmacy.id)}
                      className={`text-sm ${
                        pharmacy.isPreferred 
                          ? 'text-primary font-medium' 
                          : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      {pharmacy.isPreferred ? 'Preferred Pharmacy' : 'Set as Preferred'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-2" />
                  <span>{pharmacy.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{pharmacy.phone}</span>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400 mt-1 mr-2" />
                  <span>{pharmacy.hours}</span>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Services:</h5>
                <div className="flex flex-wrap gap-2">
                  {pharmacy.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {pharmacy.notes && (
                <p className="mt-4 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {pharmacy.notes}
                </p>
              )}

              {pharmacy.url && (
                <div className="mt-4">
                  <a
                    href={pharmacy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary-hover"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AddPharmacyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPharmacy}
      />
    </div>
  );
}
import React from 'react';
import { Heart, Users, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { useCaregiverStore } from '../../store/caregiverStore';
import { useContactStore } from '../../store/contactStore';
import { useUserStore } from '../../store/userStore';
import CaregiverCard from '../caregivers/CaregiverCard';
import AddToCareCircle from './AddToCareCircle';

export default function CareCircle() {
  const { caregivers } = useCaregiverStore();
  const { contacts } = useContactStore();
  const { activeProfile } = useUserStore();

  const familyContacts = contacts.filter(contact => contact.type === 'family');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Care Circle</h2>
          <p className="text-sm text-gray-500">Your trusted care partners</p>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm text-gray-600">{caregivers.length} Caregivers</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-accent mr-2" />
              <span className="text-sm text-gray-600">{familyContacts.length} Family Members</span>
            </div>
          </div>
          <AddToCareCircle />
        </div>
      </div>

      {/* Care Team Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caregivers.map((caregiver) => (
          <CaregiverCard 
            key={caregiver.id} 
            caregiver={caregiver}
          />
        ))}
      </div>

      {/* Family Members Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Family Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyContacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-accent-light">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {contact.relationship}
                    {contact.priority === 'primary' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-light text-accent">
                        Primary Contact
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {contact.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone}
                </div>
                {contact.address && (
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-1" />
                    <span className="line-clamp-2">
                      {[
                        contact.address.street,
                        contact.address.city,
                        contact.address.state,
                        contact.address.zipCode
                      ].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
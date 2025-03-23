import React, { useEffect } from 'react';
import { useCaregiverStore } from '../../store/caregiverStore';
import { useContactStore } from '../../store/contactStore';
import { useUserStore } from '../../store/userStore';

export default function MockDataProvider({ children }: { children: React.ReactNode }) {
  const { addCaregiver } = useCaregiverStore();
  const { addContact } = useContactStore();
  const { setCurrentUser, setActiveProfile } = useUserStore();

  useEffect(() => {
    // Set up mock senior profile
    const seniorProfile = {
      id: 'senior-1',
      name: 'Martha Johnson',
      role: 'senior',
      avatar: 'https://images.unsplash.com/photo-1544654803-b69140b285a1?w=400&h=400&fit=crop',
    };
    setActiveProfile(seniorProfile);

    // Add mock caregivers
    const mockCaregivers = [
      {
        id: 'cg-1',
        firstName: 'Sarah',
        lastName: 'Williams',
        type: 'registered-nurse',
        phone: '(555) 123-4567',
        email: 'sarah.w@careservice.com',
        qualifications: ['RN', 'Geriatric Care'],
        hourlyRate: 45,
        location: {
          lat: 37.7749,
          lng: -122.4194,
          lastUpdated: new Date().toISOString()
        },
        status: 'active' as const,
        startDate: '2023-01-15'
      },
      {
        id: 'cg-2',
        firstName: 'Michael',
        lastName: 'Chen',
        type: 'certified-nursing-assistant',
        phone: '(555) 234-5678',
        email: 'michael.c@careservice.com',
        qualifications: ['CNA', 'First Aid'],
        hourlyRate: 30,
        status: 'active' as const,
        startDate: '2023-03-01'
      },
      {
        id: 'cg-3',
        firstName: 'Lisa',
        lastName: 'Rodriguez',
        type: 'home-health-aide',
        phone: '(555) 345-6789',
        email: 'lisa.r@careservice.com',
        qualifications: ['HHA', 'CPR Certified'],
        hourlyRate: 28,
        status: 'active' as const,
        startDate: '2023-06-15'
      }
    ];

    mockCaregivers.forEach(caregiver => addCaregiver(caregiver));

    // Add mock family contacts
    const mockContacts = [
      {
        id: 'fam-1',
        firstName: 'Robert',
        lastName: 'Johnson',
        relationship: 'Son',
        phone: '(555) 456-7890',
        email: 'robert.j@email.com',
        type: 'family' as const,
        priority: 'primary' as const,
        address: {
          street: '123 Family Lane',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
          country: 'United States'
        }
      },
      {
        id: 'fam-2',
        firstName: 'Emily',
        lastName: 'Martinez',
        relationship: 'Daughter',
        phone: '(555) 567-8901',
        email: 'emily.m@email.com',
        type: 'family' as const,
        priority: 'primary' as const,
        address: {
          street: '456 Care Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62702',
          country: 'United States'
        }
      },
      {
        id: 'fam-3',
        firstName: 'David',
        lastName: 'Johnson',
        relationship: 'Grandson',
        phone: '(555) 678-9012',
        email: 'david.j@email.com',
        type: 'family' as const,
        priority: 'secondary' as const,
        address: {
          street: '789 Support Ave',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62703',
          country: 'United States'
        }
      }
    ];

    mockContacts.forEach(contact => addContact(contact));

    // Set current user (family member view)
    setCurrentUser({
      id: 'fam-1',
      name: 'Robert Johnson',
      role: 'family',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    });
  }, [addCaregiver, addContact, setCurrentUser, setActiveProfile]);

  return <>{children}</>;
}
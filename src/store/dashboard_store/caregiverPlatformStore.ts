import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CaregiverProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: 'individual' | 'agency';
  specialties: string[];
  certifications: {
    name: string;
    issuedBy: string;
    issuedDate: string;
    expiryDate: string;
    verificationUrl?: string;
  }[];
  availability: {
    regularHours: {
      day: number;
      startTime: string;
      endTime: string;
    }[];
    exceptions: {
      date: string;
      available: boolean;
      notes?: string;
    }[];
  };
  rates: {
    hourly: number;
    overnight?: number;
    weekend?: number;
    holiday?: number;
  };
  services: string[];
  languages: string[];
  experience: number;
  bio: string;
  profilePhoto?: string;
  backgroundCheck?: {
    status: 'pending' | 'approved' | 'expired';
    lastChecked: string;
    expiryDate: string;
  };
  reviews: {
    id: string;
    clientId: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  status: 'active' | 'inactive' | 'pending';
}

export interface CareRequest {
  id: string;
  clientId: string;
  caregiverId?: string;
  status: 'open' | 'matched' | 'active' | 'completed' | 'cancelled';
  type: 'regular' | 'temporary' | 'respite';
  schedule: {
    startDate: string;
    endDate?: string;
    hours: {
      day: number;
      startTime: string;
      endTime: string;
    }[];
  };
  requirements: {
    services: string[];
    specialties?: string[];
    languages?: string[];
    certifications?: string[];
  };
  clientDetails: {
    name: string;
    age: number;
    gender: string;
    location: string;
    medicalConditions?: string[];
    mobility?: string;
    dietaryRestrictions?: string[];
    preferences?: string[];
  };
  budget: {
    maxHourlyRate: number;
    currency: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface CaregiverPlatformState {
  caregivers: CaregiverProfile[];
  careRequests: CareRequest[];
  addCaregiver: (profile: Omit<CaregiverProfile, 'id' | 'reviews'>) => void;
  updateCaregiver: (id: string, updates: Partial<CaregiverProfile>) => void;
  addCareRequest: (request: Omit<CareRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCareRequest: (id: string, updates: Partial<CareRequest>) => void;
  searchCaregivers: (criteria: Partial<{
    services: string[];
    specialties: string[];
    languages: string[];
    availability: { day: number; startTime: string; endTime: string }[];
    maxRate: number;
    location: string;
    radius: number;
  }>) => CaregiverProfile[];
  getAvailableCaregivers: (schedule: CareRequest['schedule']) => CaregiverProfile[];
  getUpcomingShifts: (caregiverId: string) => any[];
  getCaregiverMetrics: (caregiverId: string) => {
    totalHours: number;
    averageRating: number;
    completionRate: number;
    clientSatisfaction: number;
  };
}

export const useCaregiverPlatformStore = create<CaregiverPlatformState>()(
  persist(
    (set, get) => ({
      caregivers: [],
      careRequests: [],

      addCaregiver: (profile) => {
        const id = crypto.randomUUID();
        set((state) => ({
          caregivers: [...state.caregivers, { ...profile, id, reviews: [] }]
        }));
      },

      updateCaregiver: (id, updates) => {
        set((state) => ({
          caregivers: state.caregivers.map((caregiver) =>
            caregiver.id === id ? { ...caregiver, ...updates } : caregiver
          )
        }));
      },

      addCareRequest: (request) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        set((state) => ({
          careRequests: [
            {
              ...request,
              id,
              createdAt: now,
              updatedAt: now
            },
            ...state.careRequests
          ]
        }));
      },

      updateCareRequest: (id, updates) => {
        set((state) => ({
          careRequests: state.careRequests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  ...updates,
                  updatedAt: new Date().toISOString()
                }
              : request
          )
        }));
      },

      searchCaregivers: (criteria) => {
        const caregivers = get().caregivers;
        return caregivers.filter(caregiver => {
          // Filter by services
          if (criteria.services?.length) {
            if (!criteria.services.every(service => caregiver.services.includes(service))) {
              return false;
            }
          }

          // Filter by specialties
          if (criteria.specialties?.length) {
            if (!criteria.specialties.every(specialty => caregiver.specialties.includes(specialty))) {
              return false;
            }
          }

          // Filter by languages
          if (criteria.languages?.length) {
            if (!criteria.languages.every(language => caregiver.languages.includes(language))) {
              return false;
            }
          }

          // Filter by rate
          if (criteria.maxRate) {
            if (caregiver.rates.hourly > criteria.maxRate) {
              return false;
            }
          }

          // Filter by availability
          if (criteria.availability?.length) {
            const hasMatchingAvailability = criteria.availability.some(required => {
              return caregiver.availability.regularHours.some(available => {
                return available.day === required.day &&
                  available.startTime <= required.startTime &&
                  available.endTime >= required.endTime;
              });
            });
            if (!hasMatchingAvailability) {
              return false;
            }
          }

          // TODO: Add location-based filtering when implementing geolocation

          return true;
        });
      },

      getAvailableCaregivers: (schedule) => {
        const caregivers = get().caregivers;
        return caregivers.filter(caregiver => {
          // Check each required time slot against caregiver's availability
          return schedule.hours.every(required => {
            // Check regular availability
            const hasRegularAvailability = caregiver.availability.regularHours.some(
              available => available.day === required.day &&
                available.startTime <= required.startTime &&
                available.endTime >= required.endTime
            );

            if (!hasRegularAvailability) return false;

            // Check for exceptions
            const scheduleDate = new Date(schedule.startDate);
            scheduleDate.setDate(scheduleDate.getDate() + required.day);
            const dateStr = scheduleDate.toISOString().split('T')[0];

            const exception = caregiver.availability.exceptions.find(
              e => e.date === dateStr
            );

            return !exception || exception.available;
          });
        });
      },

      getUpcomingShifts: (caregiverId) => {
        const requests = get().careRequests;
        return requests.filter(request => 
          request.caregiverId === caregiverId &&
          request.status === 'active' &&
          new Date(request.schedule.startDate) >= new Date()
        );
      },

      getCaregiverMetrics: (caregiverId) => {
        const caregiver = get().caregivers.find(c => c.id === caregiverId);
        if (!caregiver) {
          return {
            totalHours: 0,
            averageRating: 0,
            completionRate: 0,
            clientSatisfaction: 0
          };
        }

        const reviews = caregiver.reviews || [];
        const averageRating = reviews.length
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0;

        // TODO: Calculate actual metrics from shift/request history
        return {
          totalHours: 0,
          averageRating,
          completionRate: 0,
          clientSatisfaction: averageRating * 20 // Convert 5-star to percentage
        };
      }
    }),
    {
      name: 'caregiver-platform-storage'
    }
  )
);
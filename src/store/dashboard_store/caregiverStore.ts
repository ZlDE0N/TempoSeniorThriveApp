import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CaregiverType = 
  | 'registered-nurse'
  | 'licensed-practical-nurse'
  | 'certified-nursing-assistant'
  | 'home-health-aide'
  | 'personal-care-aide'
  | 'companion'
  | 'other';

export interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: CaregiverType;
  qualifications: string[];
  certifications: {
    name: string;
    issueDate: string;
    expiryDate: string;
  }[];
  availability: {
    daysOfWeek: number[];
    preferredHours: {
      start: string;
      end: string;
    }[];
  };
  hourlyRate: number;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  startDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  notes?: string;
  location?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
}

export interface CaregiverShift {
  id: string;
  caregiverId: string;
  startTime: string;
  endTime?: string;
  notes?: string;
  tasks: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  checkInLocation?: string;
  checkOutLocation?: string;
  breakTimes?: { start: string; end: string }[];
}

export interface CaregiverSchedule {
  id: string;
  caregiverId: string;
  recurring: boolean;
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

interface CaregiverState {
  caregivers: Caregiver[];
  schedules: CaregiverSchedule[];
  shifts: CaregiverShift[];
  activeShiftId: string | null;
  activeCaregiver: string | null;
  addCaregiver: (caregiver: Omit<Caregiver, 'id'>) => void;
  updateCaregiver: (id: string, updates: Partial<Caregiver>) => void;
  deleteCaregiver: (id: string) => void;
  addSchedule: (schedule: Omit<CaregiverSchedule, 'id'>) => void;
  updateSchedule: (id: string, updates: Partial<CaregiverSchedule>) => void;
  deleteSchedule: (id: string) => void;
  startShift: (caregiverId: string, location?: string) => void;
  endShift: (shiftId: string, notes?: string) => void;
  addShiftTask: (shiftId: string, task: string) => void;
  getCurrentShift: () => CaregiverShift | null;
  getActiveCaregiver: () => Caregiver | null;
  getCaregiverSchedule: (caregiverId: string) => CaregiverSchedule[];
  getCaregiverHours: (caregiverId: string, startDate: string, endDate: string) => number;
  updateCaregiverLocation: (caregiverId: string, lat: number, lng: number) => void;
}

export const useCaregiverStore = create<CaregiverState>()(
  persist(
    (set, get) => ({
      caregivers: [],
      schedules: [],
      shifts: [],
      activeShiftId: null,
      activeCaregiver: null,

      addCaregiver: (caregiver) => {
        const id = crypto.randomUUID();
        set((state) => ({
          caregivers: [...state.caregivers, { ...caregiver, id }]
        }));
      },

      updateCaregiver: (id, updates) => {
        set((state) => ({
          caregivers: state.caregivers.map((caregiver) =>
            caregiver.id === id ? { ...caregiver, ...updates } : caregiver
          )
        }));
      },

      deleteCaregiver: (id) => {
        set((state) => ({
          caregivers: state.caregivers.filter((caregiver) => caregiver.id !== id),
          schedules: state.schedules.filter((schedule) => schedule.caregiverId !== id),
          shifts: state.shifts.filter((shift) => shift.caregiverId !== id)
        }));
      },

      addSchedule: (schedule) => {
        const id = crypto.randomUUID();
        set((state) => ({
          schedules: [...state.schedules, { ...schedule, id }]
        }));
      },

      updateSchedule: (id, updates) => {
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === id ? { ...schedule, ...updates } : schedule
          )
        }));
      },

      deleteSchedule: (id) => {
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id)
        }));
      },

      startShift: (caregiverId, location) => {
        const id = crypto.randomUUID();
        const shift: CaregiverShift = {
          id,
          caregiverId,
          startTime: new Date().toISOString(),
          tasks: [],
          status: 'in-progress',
          checkInLocation: location
        };
        set((state) => ({
          shifts: [...state.shifts, shift],
          activeShiftId: id,
          activeCaregiver: caregiverId
        }));
      },

      endShift: (shiftId, notes) => {
        set((state) => ({
          shifts: state.shifts.map((shift) =>
            shift.id === shiftId
              ? {
                  ...shift,
                  endTime: new Date().toISOString(),
                  status: 'completed',
                  notes: notes || shift.notes
                }
              : shift
          ),
          activeShiftId: null,
          activeCaregiver: null
        }));
      },

      addShiftTask: (shiftId, task) => {
        set((state) => ({
          shifts: state.shifts.map((shift) =>
            shift.id === shiftId
              ? { ...shift, tasks: [...shift.tasks, task] }
              : shift
          )
        }));
      },

      getCurrentShift: () => {
        const { shifts, activeShiftId } = get();
        return activeShiftId ? shifts.find(shift => shift.id === activeShiftId) || null : null;
      },

      getActiveCaregiver: () => {
        const { caregivers, activeCaregiver } = get();
        return activeCaregiver ? caregivers.find(c => c.id === activeCaregiver) || null : null;
      },

      getCaregiverSchedule: (caregiverId) => {
        return get().schedules.filter(schedule => schedule.caregiverId === caregiverId);
      },

      getCaregiverHours: (caregiverId, startDate, endDate) => {
        const shifts = get().shifts.filter(shift => 
          shift.caregiverId === caregiverId &&
          shift.status === 'completed' &&
          shift.startTime >= startDate &&
          shift.startTime <= endDate &&
          shift.endTime
        );

        return shifts.reduce((total, shift) => {
          if (!shift.endTime) return total;
          const duration = new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime();
          return total + (duration / (1000 * 60 * 60)); // Convert to hours
        }, 0);
      },

      updateCaregiverLocation: (caregiverId, lat, lng) => {
        set((state) => ({
          caregivers: state.caregivers.map((caregiver) =>
            caregiver.id === caregiverId
              ? {
                  ...caregiver,
                  location: {
                    lat,
                    lng,
                    lastUpdated: new Date().toISOString()
                  }
                }
              : caregiver
          )
        }));
      }
    }),
    {
      name: 'caregiver-storage'
    }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MedicationPreset {
  id: string;
  name: string;
  commonDosages: string[];
  commonInstructions: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  startDate: string;
  endDate?: string;
  timeSlots: string[];
  color: 'primary' | 'secondary' | 'accent';
  notes?: string;
  prescribedBy?: string;
  refillDate?: string;
  active: boolean;
  authorizedCaregivers?: string[]; // IDs of caregivers authorized to administer
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  timestamp: string;
  taken: boolean;
  notes?: string;
  delayed?: boolean;
  skipped?: boolean;
  caregiverId?: string; // ID of caregiver who administered/logged
  administrationDetails?: {
    caregiverId: string;
    method: 'self' | 'assisted' | 'administered';
    location?: string;
    witness?: string; // For medications requiring witness
    notes?: string;
  };
}

interface MedicationState {
  medications: Medication[];
  medicationLogs: MedicationLog[];
  presets: MedicationPreset[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  logMedication: (log: Omit<MedicationLog, 'id'>) => void;
  getTodayLogs: () => MedicationLog[];
  getPendingMedications: () => Medication[];
  addPreset: (preset: Omit<MedicationPreset, 'id'>) => void;
  updatePreset: (id: string, updates: Partial<MedicationPreset>) => void;
  deletePreset: (id: string) => void;
  getMedicationsByCaregiver: (caregiverId: string) => Medication[];
  getLogsByCaregiver: (caregiverId: string, startDate: string, endDate: string) => MedicationLog[];
}

export const useMedicationStore = create<MedicationState>()(
  persist(
    (set, get) => ({
      medications: [],
      medicationLogs: [],
      presets: [
        {
          id: '1',
          name: 'Ibuprofen',
          commonDosages: ['200mg', '400mg', '600mg', '800mg'],
          commonInstructions: ['Take with food', 'Take with water', 'Take as needed for pain']
        },
        {
          id: '2',
          name: 'Acetaminophen',
          commonDosages: ['325mg', '500mg', '650mg', '1000mg'],
          commonInstructions: ['Take with water', 'Do not exceed 4000mg per day']
        }
      ],
      
      addMedication: (medication) => {
        const id = crypto.randomUUID();
        set((state) => ({
          medications: [...state.medications, { ...medication, id }]
        }));
      },

      updateMedication: (id, updates) => {
        set((state) => ({
          medications: state.medications.map((med) =>
            med.id === id ? { ...med, ...updates } : med
          )
        }));
      },

      deleteMedication: (id) => {
        set((state) => ({
          medications: state.medications.filter((med) => med.id !== id),
          medicationLogs: state.medicationLogs.filter((log) => log.medicationId !== id)
        }));
      },

      logMedication: (log) => {
        const id = crypto.randomUUID();
        set((state) => ({
          medicationLogs: [{ ...log, id }, ...state.medicationLogs]
        }));
      },

      getTodayLogs: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().medicationLogs.filter((log) => 
          log.timestamp.startsWith(today)
        );
      },

      getPendingMedications: () => {
        const today = new Date().toISOString().split('T')[0];
        const todayLogs = get().getTodayLogs();
        
        return get().medications.filter((med) => {
          if (!med.active) return false;
          
          const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          });
          
          return med.timeSlots.some((slot) => {
            const logged = todayLogs.some((log) => 
              log.medicationId === med.id && 
              log.timestamp.includes(slot)
            );
            return !logged && slot > currentTime;
          });
        });
      },

      addPreset: (preset) => {
        const id = crypto.randomUUID();
        set((state) => ({
          presets: [...state.presets, { ...preset, id }]
        }));
      },

      updatePreset: (id, updates) => {
        set((state) => ({
          presets: state.presets.map((preset) =>
            preset.id === id ? { ...preset, ...updates } : preset
          )
        }));
      },

      deletePreset: (id) => {
        set((state) => ({
          presets: state.presets.filter((preset) => preset.id !== id)
        }));
      },

      getMedicationsByCaregiver: (caregiverId) => {
        return get().medications.filter((med) => 
          !med.authorizedCaregivers || 
          med.authorizedCaregivers.includes(caregiverId)
        );
      },

      getLogsByCaregiver: (caregiverId, startDate, endDate) => {
        return get().medicationLogs.filter((log) => 
          log.caregiverId === caregiverId &&
          log.timestamp >= startDate &&
          log.timestamp <= endDate
        );
      }
    }),
    {
      name: 'medication-storage'
    }
  )
);
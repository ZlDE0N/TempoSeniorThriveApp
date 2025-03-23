import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface VitalEntry {
  id: string;
  timestamp: string;
  value: string | number;
  notes?: string;
  status?: 'normal' | 'warning' | 'critical';
}

interface VitalsData {
  [key: string]: VitalEntry[];
}

interface VitalsState {
  vitalsData: VitalsData;
  addEntry: (vitalKey: string, entry: Omit<VitalEntry, 'id'>) => void;
  getLatestEntry: (vitalKey: string) => VitalEntry | undefined;
  getEntries: (vitalKey: string) => VitalEntry[];
  getStatus: (vitalKey: string, value: number) => 'normal' | 'warning' | 'critical';
}

const vitalRanges = {
  bloodPressure: {
    normal: { min: '90/60', max: '120/80' },
    warning: { min: '80/50', max: '140/90' },
  },
  heartRate: {
    normal: { min: 60, max: 100 },
    warning: { min: 50, max: 120 },
  },
  temperature: {
    normal: { min: 97, max: 99 },
    warning: { min: 95, max: 101 },
  },
  respiratoryRate: {
    normal: { min: 12, max: 20 },
    warning: { min: 8, max: 25 },
  },
  oxygenLevel: {
    normal: { min: 95, max: 100 },
    warning: { min: 90, max: 100 },
  }
};

export const useVitalsStore = create<VitalsState>()(
  persist(
    (set, get) => ({
      vitalsData: {},

      addEntry: (vitalKey, entry) => {
        const id = crypto.randomUUID();
        const status = get().getStatus(vitalKey, Number(entry.value));
        
        set((state) => ({
          vitalsData: {
            ...state.vitalsData,
            [vitalKey]: [
              { ...entry, id, status },
              ...(state.vitalsData[vitalKey] || [])
            ].slice(0, 100), // Keep last 100 entries
          },
        }));
      },

      getLatestEntry: (vitalKey) => {
        const entries = get().vitalsData[vitalKey];
        return entries?.[0];
      },

      getEntries: (vitalKey) => {
        return get().vitalsData[vitalKey] || [];
      },

      getStatus: (vitalKey, value) => {
        const ranges = vitalRanges[vitalKey as keyof typeof vitalRanges];
        if (!ranges) return 'normal';

        if (vitalKey === 'bloodPressure') {
          const [systolic, diastolic] = value.toString().split('/').map(Number);
          const [normalSystolic, normalDiastolic] = ranges.normal.max.split('/').map(Number);
          const [warningSystolic, warningDiastolic] = ranges.warning.max.split('/').map(Number);

          if (systolic > warningSystolic || diastolic > warningDiastolic) {
            return 'critical';
          }
          if (systolic > normalSystolic || diastolic > normalDiastolic) {
            return 'warning';
          }
          return 'normal';
        }

        if (value < ranges.warning.min || value > ranges.warning.max) {
          return 'critical';
        }
        if (value < ranges.normal.min || value > ranges.normal.max) {
          return 'warning';
        }
        return 'normal';
      }
    }),
    {
      name: 'vitals-storage'
    }
  )
);
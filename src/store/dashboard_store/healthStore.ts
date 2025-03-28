import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SymptomEntry {
  id: string;
  timestamp: string;
  type: string;
  severity: 1 | 2 | 3 | 4 | 5;
  location?: string;
  description?: string;
  triggers?: string[];
  duration?: number;
  relievedBy?: string[];
}

export interface SleepEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  quality: 1 | 2 | 3 | 4 | 5;
  interruptions: number;
  notes?: string;
  factors?: {
    stress?: boolean;
    exercise?: boolean;
    caffeine?: boolean;
    medication?: boolean;
    noise?: boolean;
    temperature?: boolean;
    other?: string;
  };
}

export interface MoodEntry {
  id: string;
  timestamp: string;
  level: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  triggers?: string[];
  activities?: string[];
  symptoms?: string[];
}

interface HealthState {
  symptoms: SymptomEntry[];
  sleep: SleepEntry[];
  mood: MoodEntry[];
  
  // Symptom methods
  addSymptom: (symptom: Omit<SymptomEntry, 'id'>) => void;
  updateSymptom: (id: string, updates: Partial<SymptomEntry>) => void;
  deleteSymptom: (id: string) => void;
  
  // Sleep methods
  addSleepEntry: (entry: Omit<SleepEntry, 'id'>) => void;
  updateSleepEntry: (id: string, updates: Partial<SleepEntry>) => void;
  deleteSleepEntry: (id: string) => void;
  
  // Mood methods
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  updateMoodEntry: (id: string, updates: Partial<MoodEntry>) => void;
  deleteMoodEntry: (id: string) => void;
  
  // Analysis methods
  getSymptomTrends: (startDate: string, endDate: string) => {
    symptomFrequency: Record<string, number>;
    averageSeverity: Record<string, number>;
    commonTriggers: string[];
  };
  getSleepStats: (days: number) => {
    averageHours: number;
    averageQuality: number;
    commonInterruptions: number;
    commonFactors: string[];
  };
  getMoodTrends: (days: number) => {
    averageLevel: number;
    commonTriggers: string[];
    correlatedActivities: string[];
  };
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      symptoms: [],
      sleep: [],
      mood: [],

      addSymptom: (symptom) => {
        const id = crypto.randomUUID();
        set((state) => ({
          symptoms: [{ ...symptom, id }, ...state.symptoms]
        }));
      },

      updateSymptom: (id, updates) => {
        set((state) => ({
          symptoms: state.symptoms.map((symptom) =>
            symptom.id === id ? { ...symptom, ...updates } : symptom
          )
        }));
      },

      deleteSymptom: (id) => {
        set((state) => ({
          symptoms: state.symptoms.filter((symptom) => symptom.id !== id)
        }));
      },

      addSleepEntry: (entry) => {
        const id = crypto.randomUUID();
        set((state) => ({
          sleep: [{ ...entry, id }, ...state.sleep]
        }));
      },

      updateSleepEntry: (id, updates) => {
        set((state) => ({
          sleep: state.sleep.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry
          )
        }));
      },

      deleteSleepEntry: (id) => {
        set((state) => ({
          sleep: state.sleep.filter((entry) => entry.id !== id)
        }));
      },

      addMoodEntry: (entry) => {
        const id = crypto.randomUUID();
        set((state) => ({
          mood: [{ ...entry, id }, ...state.mood]
        }));
      },

      updateMoodEntry: (id, updates) => {
        set((state) => ({
          mood: state.mood.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry
          )
        }));
      },

      deleteMoodEntry: (id) => {
        set((state) => ({
          mood: state.mood.filter((entry) => entry.id !== id)
        }));
      },

      getSymptomTrends: (startDate, endDate) => {
        const relevantSymptoms = get().symptoms.filter(
          (s) => s.timestamp >= startDate && s.timestamp <= endDate
        );

        const frequency: Record<string, number> = {};
        const severitySum: Record<string, number> = {};
        const triggers = new Map<string, number>();

        relevantSymptoms.forEach((symptom) => {
          frequency[symptom.type] = (frequency[symptom.type] || 0) + 1;
          severitySum[symptom.type] = (severitySum[symptom.type] || 0) + symptom.severity;
          
          symptom.triggers?.forEach((trigger) => {
            triggers.set(trigger, (triggers.get(trigger) || 0) + 1);
          });
        });

        const averageSeverity: Record<string, number> = {};
        Object.keys(frequency).forEach((type) => {
          averageSeverity[type] = severitySum[type] / frequency[type];
        });

        const commonTriggers = Array.from(triggers.entries())
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([trigger]) => trigger);

        return {
          symptomFrequency: frequency,
          averageSeverity,
          commonTriggers
        };
      },

      getSleepStats: (days) => {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        const cutoffDate = cutoff.toISOString().split('T')[0];

        const relevantEntries = get().sleep.filter((entry) => entry.date >= cutoffDate);

        if (relevantEntries.length === 0) {
          return {
            averageHours: 0,
            averageQuality: 0,
            commonInterruptions: 0,
            commonFactors: []
          };
        }

        const totalHours = relevantEntries.reduce((sum, entry) => {
          const start = new Date(entry.startTime).getTime();
          const end = new Date(entry.endTime).getTime();
          return sum + (end - start) / (1000 * 60 * 60);
        }, 0);

        const totalQuality = relevantEntries.reduce((sum, entry) => sum + entry.quality, 0);
        const totalInterruptions = relevantEntries.reduce((sum, entry) => sum + entry.interruptions, 0);

        const factors = new Map<string, number>();
        relevantEntries.forEach((entry) => {
          Object.entries(entry.factors || {}).forEach(([factor, present]) => {
            if (present) {
              factors.set(factor, (factors.get(factor) || 0) + 1);
            }
          });
        });

        const commonFactors = Array.from(factors.entries())
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([factor]) => factor);

        return {
          averageHours: totalHours / relevantEntries.length,
          averageQuality: totalQuality / relevantEntries.length,
          commonInterruptions: totalInterruptions / relevantEntries.length,
          commonFactors
        };
      },

      getMoodTrends: (days) => {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        const cutoffTime = cutoff.toISOString();

        const relevantEntries = get().mood.filter((entry) => entry.timestamp >= cutoffTime);

        if (relevantEntries.length === 0) {
          return {
            averageLevel: 0,
            commonTriggers: [],
            correlatedActivities: []
          };
        }

        const totalLevel = relevantEntries.reduce((sum, entry) => sum + entry.level, 0);

        const triggers = new Map<string, number>();
        const activities = new Map<string, number>();

        relevantEntries.forEach((entry) => {
          entry.triggers?.forEach((trigger) => {
            triggers.set(trigger, (triggers.get(trigger) || 0) + 1);
          });
          entry.activities?.forEach((activity) => {
            activities.set(activity, (activities.get(activity) || 0) + 1);
          });
        });

        const getTopItems = (map: Map<string, number>) => 
          Array.from(map.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([item]) => item);

        return {
          averageLevel: totalLevel / relevantEntries.length,
          commonTriggers: getTopItems(triggers),
          correlatedActivities: getTopItems(activities)
        };
      }
    }),
    {
      name: 'health-storage'
    }
  )
);
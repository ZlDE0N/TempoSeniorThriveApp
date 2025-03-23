import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IncidentSeverity = 'minor' | 'moderate' | 'severe' | 'emergency';
export type IncidentType = 
  | 'fall' 
  | 'medication-error' 
  | 'behavioral' 
  | 'health-change'
  | 'injury'
  | 'other';

export interface Incident {
  id: string;
  timestamp: string;
  type: IncidentType;
  severity: IncidentSeverity;
  description: string;
  location?: string;
  witnesses?: string[];
  actionTaken: string;
  followUpNeeded?: boolean;
  followUpNotes?: string;
  notifiedContacts?: string[];
  resolved: boolean;
  resolvedAt?: string;
  resolutionNotes?: string;
  caregiverId?: string;  // ID of caregiver on duty
  reportedById?: string; // ID of person reporting (caregiver or other)
  reportedByType?: 'caregiver' | 'family' | 'patient' | 'other';
}

interface IncidentState {
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  resolveIncident: (id: string, notes: string) => void;
  getActiveIncidents: () => Incident[];
  getResolvedIncidents: () => Incident[];
}

export const useIncidentStore = create<IncidentState>()(
  persist(
    (set, get) => ({
      incidents: [],

      addIncident: (incident) => {
        const id = crypto.randomUUID();
        set((state) => ({
          incidents: [{ ...incident, id }, ...state.incidents]
        }));
      },

      updateIncident: (id, updates) => {
        set((state) => ({
          incidents: state.incidents.map((incident) =>
            incident.id === id ? { ...incident, ...updates } : incident
          )
        }));
      },

      deleteIncident: (id) => {
        set((state) => ({
          incidents: state.incidents.filter((incident) => incident.id !== id)
        }));
      },

      resolveIncident: (id, notes) => {
        set((state) => ({
          incidents: state.incidents.map((incident) =>
            incident.id === id
              ? {
                  ...incident,
                  resolved: true,
                  resolvedAt: new Date().toISOString(),
                  resolutionNotes: notes
                }
              : incident
          )
        }));
      },

      getActiveIncidents: () => {
        return get().incidents.filter((incident) => !incident.resolved);
      },

      getResolvedIncidents: () => {
        return get().incidents.filter((incident) => incident.resolved);
      }
    }),
    {
      name: 'incident-storage'
    }
  )
);
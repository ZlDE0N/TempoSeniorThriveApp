import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'caregiver_manager' | 'caregiver' | 'family' | 'self';

interface SharingPreferences {
  vitals: boolean;
  medications: boolean;
  activities: boolean;
  cognitive: boolean;
  social: boolean;
  documents: boolean;
  incidents: boolean;
  notes: boolean;
  mood: boolean;
  sleep: boolean;
  nutrition: boolean;
}

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  sharingPreferences?: SharingPreferences;
  managedTeamIds?: string[]; // For caregiver managers - IDs of team members they manage
}

interface UserState {
  currentUser: User | null;
  activeProfile: User | null;
  activeSection: string;
  careMode: 'self' | 'patient';
  sharingPreferences: SharingPreferences;
  setCurrentUser: (user: User) => void;
  setActiveProfile: (profile: User | null) => void;
  updateProfile: (id: string, updates: Partial<User>) => void;
  setActiveSection: (section: string) => void;
  setCareMode: (mode: 'self' | 'patient') => void;
  updateSharingPreferences: (preferences: Partial<SharingPreferences>) => void;
  logout: () => void;
}

const defaultSharingPreferences: SharingPreferences = {
  vitals: true,
  medications: true,
  activities: true,
  cognitive: true,
  social: true,
  documents: true,
  incidents: true,
  notes: true,
  mood: true,
  sleep: true,
  nutrition: true
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      activeProfile: null,
      activeSection: 'dashboard',
      careMode: 'self',
      sharingPreferences: defaultSharingPreferences,

      setCurrentUser: (user) => set({ 
        currentUser: user,
        sharingPreferences: user.sharingPreferences || defaultSharingPreferences
      }),

      setActiveProfile: (profile) => set({ activeProfile: profile }),

      updateProfile: (id, updates) => set((state) => ({
        activeProfile: state.activeProfile?.id === id
          ? { ...state.activeProfile, ...updates }
          : state.activeProfile,
        currentUser: state.currentUser?.id === id
          ? { ...state.currentUser, ...updates }
          : state.currentUser
      })),

      setActiveSection: (section) => set({ activeSection: section }),
      
      setCareMode: (mode) => set({ careMode: mode }),

      updateSharingPreferences: (preferences) => set((state) => {
        const updatedPreferences = {
          ...state.sharingPreferences,
          ...preferences
        };

        if (state.currentUser) {
          set({
            currentUser: {
              ...state.currentUser,
              sharingPreferences: updatedPreferences
            }
          });
        }

        return { sharingPreferences: updatedPreferences };
      }),

      logout: () => set({ 
        currentUser: null, 
        activeProfile: null, 
        activeSection: 'dashboard',
        careMode: 'self',
        sharingPreferences: defaultSharingPreferences
      })
    }),
    {
      name: 'user-storage'
    }
  )
);
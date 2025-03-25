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

export interface User {
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
  isPremium: boolean;
  sharingPreferences: SharingPreferences;
  setCurrentUser: (user: User) => void;
  setActiveProfile: (profile: User | null) => void;
  updateProfile: (id: string, updates: Partial<User>) => void;
  setActiveSection: (section: string) => void;
  setCareMode: (mode: 'self' | 'patient') => void;
  updateSharingPreferences: (preferences: Partial<SharingPreferences>) => void;
  logout: () => void;
  setPremium: (value: boolean) => void;
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
    (set, get) => ({
      currentUser: {
        id: crypto.randomUUID(),
        name: 'Demo Family Member',
        role: 'family',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=family`,
        sharingPreferences: defaultSharingPreferences,
      },
      activeProfile: null,
      activeSection: 'dashboard',
      careMode: 'self',
      sharingPreferences: defaultSharingPreferences,
      isPremium: false,
      setPremium: (value) => set({ isPremium: value }),

      setCurrentUser: (user) =>
        set({
          currentUser: user,
          sharingPreferences: user.sharingPreferences || defaultSharingPreferences,
        }),

      setActiveProfile: (profile) => set({ activeProfile: profile }),

      updateProfile: (id, updates) =>
        set((state) => ({
          activeProfile:
            state.activeProfile?.id === id
              ? { ...state.activeProfile, ...updates }
              : state.activeProfile,
          currentUser:
            state.currentUser?.id === id
              ? { ...state.currentUser, ...updates }
              : state.currentUser,
        })),

      setActiveSection: (section) => set({ activeSection: section }),
      setCareMode: (mode) => set({ careMode: mode }),

      updateSharingPreferences: (preferences) =>
        set((state) => {
          const updatedPreferences = {
            ...state.sharingPreferences,
            ...preferences,
          };

          if (state.currentUser) {
            set({
              currentUser: {
                ...state.currentUser,
                sharingPreferences: updatedPreferences,
              },
            });
          }

          return { sharingPreferences: updatedPreferences };
        }),

      logout: () =>
        set({
          currentUser: {
            id: crypto.randomUUID(),
            name: 'Demo Family Member',
            role: 'family',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=family`,
            sharingPreferences: defaultSharingPreferences,
          },
          activeProfile: null,
          activeSection: 'dashboard',
          careMode: 'self',
          sharingPreferences: defaultSharingPreferences,
        }),
    }),
    {
      name: 'user-storage',
      merge: (persistedState, currentState) => {
        const typedState = persistedState as Partial<UserState>;
        return {
          ...currentState,
          ...typedState,
          currentUser: typedState.currentUser || {
            id: crypto.randomUUID(),
            name: 'Demo Family Member',
            role: 'family',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=family`,
            sharingPreferences: defaultSharingPreferences,
          },
          isPremium: typedState.isPremium ?? false, // ✅ agregar
          setPremium: currentState.setPremium       //
        };
      }
    }
  )
);

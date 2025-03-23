import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ActivityType = 
  | 'physical-exercise' 
  | 'physical-therapy'
  | 'cognitive-memory'
  | 'cognitive-problem-solving'
  | 'cognitive-language'
  | 'cognitive-attention'
  | 'social'
  | 'routine';

export interface Activity {
  id: string;
  timestamp: string;
  type: ActivityType;
  name: string;
  duration: number; // in minutes
  intensity?: 'low' | 'moderate' | 'high';
  difficulty?: 'easy' | 'medium' | 'hard';
  mood?: 1 | 2 | 3 | 4 | 5;
  score?: number;
  completionRate?: number;
  assistance?: 'none' | 'minimal' | 'moderate' | 'full';
  notes?: string;
  completed: boolean;
  caregiverId?: string; // ID of supervising caregiver
  assistanceDetails?: {
    caregiverId: string;
    level: 'none' | 'minimal' | 'moderate' | 'full';
    notes?: string;
  };
}

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  getTodayActivities: () => Activity[];
  getActivityStats: (type: ActivityType, timeframe: 'day' | 'week' | 'month') => {
    totalDuration: number;
    averageScore?: number;
    averageCompletionRate?: number;
    averageMood?: number;
  };
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      activities: [],

      addActivity: (activity) => {
        const id = crypto.randomUUID();
        set((state) => ({
          activities: [{ ...activity, id }, ...state.activities]
        }));
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity
          )
        }));
      },

      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id)
        }));
      },

      getTodayActivities: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().activities.filter((activity) => 
          activity.timestamp.startsWith(today)
        );
      },

      getActivityStats: (type, timeframe) => {
        const now = new Date();
        const activities = get().activities.filter((activity) => {
          if (!activity.type.startsWith(type.split('-')[0])) return false;
          
          const activityDate = new Date(activity.timestamp);
          const diffDays = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
          
          switch (timeframe) {
            case 'day': return diffDays === 0;
            case 'week': return diffDays <= 7;
            case 'month': return diffDays <= 30;
            default: return false;
          }
        });

        const withScores = activities.filter(a => typeof a.score === 'number');
        const withCompletion = activities.filter(a => typeof a.completionRate === 'number');
        const withMood = activities.filter(a => typeof a.mood === 'number');

        return {
          totalDuration: activities.reduce((sum, a) => sum + a.duration, 0),
          averageScore: withScores.length
            ? withScores.reduce((sum, a) => sum + (a.score || 0), 0) / withScores.length
            : undefined,
          averageCompletionRate: withCompletion.length
            ? withCompletion.reduce((sum, a) => sum + (a.completionRate || 0), 0) / withCompletion.length
            : undefined,
          averageMood: withMood.length
            ? withMood.reduce((sum, a) => sum + (a.mood || 0), 0) / withMood.length
            : undefined
        };
      }
    }),
    {
      name: 'activity-storage'
    }
  )
);
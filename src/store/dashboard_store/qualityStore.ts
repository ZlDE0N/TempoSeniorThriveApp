import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AssessmentType = 
  | 'physical'
  | 'cognitive'
  | 'emotional'
  | 'social'
  | 'independence';

export type GoalStatus = 
  | 'not-started'
  | 'in-progress'
  | 'achieved'
  | 'delayed'
  | 'discontinued';

export interface CareGoal {
  id: string;
  title: string;
  description: string;
  category: AssessmentType;
  targetDate: string;
  status: GoalStatus;
  progress: number; // 0-100
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    completedAt?: string;
  }[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface QualityAssessment {
  id: string;
  type: AssessmentType;
  date: string;
  scores: {
    mobility: number;
    selfCare: number;
    communication: number;
    socialEngagement: number;
    emotionalWellbeing: number;
    cognitiveFunction: number;
    painLevel: number;
    overallHealth: number;
  };
  notes: string;
  assessedBy: string;
}

export interface SatisfactionSurvey {
  id: string;
  submittedAt: string;
  submittedBy: string;
  relationship: 'patient' | 'family' | 'caregiver';
  responses: {
    careQuality: number;
    communication: number;
    responsiveness: number;
    respect: number;
    environment: number;
    involvement: number;
    overall: number;
  };
  feedback: string;
}

interface QualityState {
  goals: CareGoal[];
  assessments: QualityAssessment[];
  surveys: SatisfactionSurvey[];
  addGoal: (goal: Omit<CareGoal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, updates: Partial<CareGoal>) => void;
  deleteGoal: (id: string) => void;
  addAssessment: (assessment: Omit<QualityAssessment, 'id'>) => void;
  updateAssessment: (id: string, updates: Partial<QualityAssessment>) => void;
  deleteAssessment: (id: string) => void;
  addSurvey: (survey: Omit<SatisfactionSurvey, 'id'>) => void;
  getGoalsByCategory: (category: AssessmentType) => CareGoal[];
  getLatestAssessment: (type: AssessmentType) => QualityAssessment | undefined;
  getAssessmentTrends: (type: AssessmentType, startDate: string, endDate: string) => {
    dates: string[];
    scores: number[];
  };
  getSatisfactionStats: () => {
    averageScores: {
      careQuality: number;
      communication: number;
      responsiveness: number;
      respect: number;
      environment: number;
      involvement: number;
      overall: number;
    };
    totalResponses: number;
    responsesByType: Record<SatisfactionSurvey['relationship'], number>;
  };
}

export const useQualityStore = create<QualityState>()(
  persist(
    (set, get) => ({
      goals: [],
      assessments: [],
      surveys: [],

      addGoal: (goal) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        set((state) => ({
          goals: [
            {
              ...goal,
              id,
              createdAt: now,
              updatedAt: now
            },
            ...state.goals
          ]
        }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? {
                  ...goal,
                  ...updates,
                  updatedAt: new Date().toISOString()
                }
              : goal
          )
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        }));
      },

      addAssessment: (assessment) => {
        const id = crypto.randomUUID();
        set((state) => ({
          assessments: [{ ...assessment, id }, ...state.assessments]
        }));
      },

      updateAssessment: (id, updates) => {
        set((state) => ({
          assessments: state.assessments.map((assessment) =>
            assessment.id === id ? { ...assessment, ...updates } : assessment
          )
        }));
      },

      deleteAssessment: (id) => {
        set((state) => ({
          assessments: state.assessments.filter((assessment) => assessment.id !== id)
        }));
      },

      addSurvey: (survey) => {
        const id = crypto.randomUUID();
        set((state) => ({
          surveys: [{ ...survey, id }, ...state.surveys]
        }));
      },

      getGoalsByCategory: (category) => {
        return get().goals.filter((goal) => goal.category === category);
      },

      getLatestAssessment: (type) => {
        return get().assessments
          .filter((assessment) => assessment.type === type)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      },

      getAssessmentTrends: (type, startDate, endDate) => {
        const assessments = get().assessments
          .filter(
            (assessment) =>
              assessment.type === type &&
              assessment.date >= startDate &&
              assessment.date <= endDate
          )
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return {
          dates: assessments.map((a) => a.date),
          scores: assessments.map((a) => 
            Object.values(a.scores).reduce((sum, score) => sum + score, 0) / 
            Object.keys(a.scores).length
          )
        };
      },

      getSatisfactionStats: () => {
        const surveys = get().surveys;
        const totalResponses = surveys.length;

        if (totalResponses === 0) {
          return {
            averageScores: {
              careQuality: 0,
              communication: 0,
              responsiveness: 0,
              respect: 0,
              environment: 0,
              involvement: 0,
              overall: 0
            },
            totalResponses: 0,
            responsesByType: {
              patient: 0,
              family: 0,
              caregiver: 0
            }
          };
        }

        const sumScores = surveys.reduce(
          (acc, survey) => ({
            careQuality: acc.careQuality + survey.responses.careQuality,
            communication: acc.communication + survey.responses.communication,
            responsiveness: acc.responsiveness + survey.responses.responsiveness,
            respect: acc.respect + survey.responses.respect,
            environment: acc.environment + survey.responses.environment,
            involvement: acc.involvement + survey.responses.involvement,
            overall: acc.overall + survey.responses.overall
          }),
          {
            careQuality: 0,
            communication: 0,
            responsiveness: 0,
            respect: 0,
            environment: 0,
            involvement: 0,
            overall: 0
          }
        );

        const responsesByType = surveys.reduce(
          (acc, survey) => ({
            ...acc,
            [survey.relationship]: (acc[survey.relationship] || 0) + 1
          }),
          { patient: 0, family: 0, caregiver: 0 }
        );

        return {
          averageScores: Object.fromEntries(
            Object.entries(sumScores).map(([key, sum]) => [
              key,
              sum / totalResponses
            ])
          ) as typeof sumScores,
          totalResponses,
          responsesByType
        };
      }
    }),
    {
      name: 'quality-storage'
    }
  )
);
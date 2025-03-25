import React from 'react';
import { Award, Star, Target, TrendingUp, Medal, Crown, Calendar } from 'lucide-react';
import { useQualityStore } from '../../store/qualityStore';
import { useActivityStore } from '../../store/activityStore';
import { useCognitiveStore } from '../../store/cognitiveStore';

export default function AchievementsDashboard() {
  const { goals } = useQualityStore();
  const { activities } = useActivityStore();
  const { activities: cognitiveActivities } = useCognitiveStore();

  const completedGoals = goals.filter(goal => goal.status === 'achieved');
  const totalActivities = activities.length;
  const totalCognitiveExercises = cognitiveActivities.length;

  const achievements = [
    {
      id: 'goals-achiever',
      title: 'Goals Achiever',
      description: `Completed ${completedGoals.length} personal goals`,
      icon: Target,
      color: 'primary',
      progress: completedGoals.length,
      target: 5,
      unlocked: completedGoals.length >= 5
    },
    {
      id: 'active-lifestyle',
      title: 'Active Lifestyle',
      description: `Logged ${totalActivities} physical activities`,
      icon: TrendingUp,
      color: 'secondary',
      progress: totalActivities,
      target: 20,
      unlocked: totalActivities >= 20
    },
    {
      id: 'brain-trainer',
      title: 'Brain Trainer',
      description: `Completed ${totalCognitiveExercises} cognitive exercises`,
      icon: Star,
      color: 'accent',
      progress: totalCognitiveExercises,
      target: 15,
      unlocked: totalCognitiveExercises >= 15
    }
  ];

  const milestones = [
    {
      title: 'First Week Complete',
      description: 'Consistently tracked health metrics for 7 days',
      icon: Calendar,
      achieved: true,
      date: '2024-01-07'
    },
    {
      title: 'Activity Master',
      description: 'Completed 10 different types of physical activities',
      icon: Medal,
      achieved: true,
      date: '2024-01-15'
    },
    {
      title: 'Wellness Champion',
      description: 'Maintained healthy vital signs for 30 days',
      icon: Crown,
      achieved: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">My Achievements</h2>
          <p className="text-sm text-gray-500">Track your progress and celebrate milestones</p>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-primary" />
          <span className="text-lg font-medium text-primary">
            {achievements.filter(a => a.unlocked).length} Unlocked
          </span>
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map(achievement => {
          const Icon = achievement.icon;
          const progressPercentage = (achievement.progress / achievement.target) * 100;

          return (
            <div
              key={achievement.id}
              className={`bg-white rounded-lg shadow p-6 ${
                achievement.unlocked ? 'ring-2 ring-primary ring-opacity-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-${achievement.color}-light`}>
                  <Icon className={`h-6 w-6 text-${achievement.color}`} />
                </div>
                {achievement.unlocked && (
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Unlocked
                  </div>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {achievement.description}
              </p>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-600">
                    Progress: {achievement.progress}/{achievement.target}
                  </div>
                  <div className="text-xs font-semibold text-gray-600">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${progressPercentage}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${achievement.color}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Milestones</h3>
        </div>
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className="relative flex items-start">
                    <div className={`absolute left-0 mt-1.5 h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                      milestone.achieved
                        ? 'bg-green-100 border-green-500'
                        : 'bg-gray-100 border-gray-300'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        milestone.achieved ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="ml-12">
                      <div className="flex items-center">
                        <h4 className="text-lg font-medium text-gray-900">
                          {milestone.title}
                        </h4>
                        {milestone.achieved && (
                          <span className="ml-3 text-sm text-gray-500">
                            Achieved on {new Date(milestone.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tips and Encouragement */}
      <div className="bg-primary-light rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-primary">Keep Going Strong!</h3>
            <p className="text-sm text-primary-hover mt-1">
              You're making great progress on your wellness journey. Set new goals and unlock more achievements!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
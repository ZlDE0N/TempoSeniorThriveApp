import React, { useState } from 'react';
import { Activity as ActivityIcon, Brain, Users, Calendar, Clock, Plus, Star } from 'lucide-react';
import { useActivityStore, Activity, ActivityType } from '../../../../store/dashboard_store/activityStore';
import { useUserStore } from '../../../../store/dashboard_store/userStore';
import ActivityModal from './ActivityModal';
import { formatTime, formatDuration } from '../../../../utils/dateUtils';
import ActivityStats from './ActivityStats';
import StravaActivities from './StravaActivities';
import Fitness from './FitnessActivity';

const activityTypeInfo = {
  'physical-exercise': {
    icon: ActivityIcon,
    label: 'Physical Exercise',
    color: 'primary',
    examples: ['Walking', 'Exercise', 'Stretching'],
    familyTip: 'Regular physical activity helps maintain independence and reduces fall risk.'
  },
  'physical-therapy': {
    icon: ActivityIcon,
    label: 'Physical Therapy',
    color: 'primary',
    examples: ['Rehabilitation', 'Strength Training', 'Balance Exercises'],
    familyTip: 'Consistent therapy exercises are crucial for maintaining mobility and strength.'
  },
  'cognitive-memory': {
    icon: Brain,
    label: 'Memory & Recall',
    color: 'secondary',
    examples: ['Pattern Matching', 'Word Recall', 'Picture Memory'],
    familyTip: 'Memory exercises help keep the mind sharp and maintain cognitive function.'
  },
  'cognitive-problem-solving': {
    icon: Brain,
    label: 'Problem Solving',
    color: 'secondary',
    examples: ['Puzzles', 'Logic Games', 'Math Problems'],
    familyTip: 'Problem-solving activities help maintain mental agility and decision-making skills.'
  },
  'cognitive-language': {
    icon: Brain,
    label: 'Language Skills',
    color: 'secondary',
    examples: ['Word Games', 'Story Telling', 'Reading'],
    familyTip: 'Language activities help maintain communication abilities and social connections.'
  },
  'cognitive-attention': {
    icon: Brain,
    label: 'Attention & Focus',
    color: 'secondary',
    examples: ['Concentration Tasks', 'Sorting', 'Detail Finding'],
    familyTip: 'Focus exercises help maintain attention span and daily task management.'
  },
  'social': {
    icon: Users,
    label: 'Social Activity',
    color: 'accent',
    examples: ['Conversation', 'Group Activities', 'Family Time'],
    familyTip: 'Social engagement is vital for emotional wellbeing and preventing isolation.'
  },
  'routine': {
    icon: Calendar,
    label: 'Daily Routine',
    color: 'primary',
    examples: ['Hygiene', 'Dressing', 'Meal Prep'],
    familyTip: 'Maintaining daily routines helps preserve independence and structure.'
  }
} as const;

export default function ActivityList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
  const [activeView, setActiveView] = useState<'manual' | 'strava'>('manual');
  const { getTodayActivities } = useActivityStore();
  const { currentUser, activeProfile } = useUserStore();

  const todayActivities = getTodayActivities();
  const isFamily = currentUser?.role === 'family';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">
            {isFamily ? `${activeProfile?.name}'s Activities` : 'Activities'}
          </h2>
          <p className="text-sm text-gray-500">
            {isFamily 
              ? 'Monitor and support daily activities and engagement'
              : 'Track physical, cognitive, and daily activities'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveView('manual')}
              className={`px-4 py-2 text-sm font-medium ${
                activeView === 'manual'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manual Entry
            </button>
            <button
              onClick={() => setActiveView('strava')}
              className={`px-4 py-2 text-sm font-medium ${
                activeView === 'strava'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Strava
            </button>
          </div>
          {activeView === 'manual' && !isFamily && (
            <button
              onClick={() => {
                setSelectedActivity(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4 mr-2" />
              Log Activity
            </button>
          )}
        </div>
      </div>

      {activeView === 'strava' ? (
        <StravaActivities />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(activityTypeInfo).map(([type, info]) => {
              const Icon = info.icon;
              return (
                <div
                  key={type}
                  className={`p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left group`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-full bg-${info.color}-light group-hover:bg-${info.color} transition-colors`}>
                      <Icon className={`h-5 w-5 text-${info.color} group-hover:text-white`} />
                    </div>
                    {!isFamily && (
                      <button
                        onClick={() => {
                          setSelectedType(type as ActivityType);
                          setIsModalOpen(true);
                        }}
                        className={`text-${info.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <h3 className="mt-3 font-medium text-dark">{info.label}</h3>
                  {isFamily ? (
                    <p className="mt-1 text-sm text-gray-600">{info.familyTip}</p>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">
                      {info.examples.join(', ')}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="p-4">
                <h3 className="text-lg font-medium text-dark">
                  {isFamily ? `${activeProfile?.name}'s Activities Today` : "Today's Activities"}
                </h3>
              </div>
              {todayActivities.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <ActivityIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No activities yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {isFamily 
                      ? 'No activities have been logged today'
                      : 'Start your day by logging an activity'}
                  </p>
                </div>
              ) : (
                todayActivities.map((activity) => {
                  const typeInfo = activityTypeInfo[activity.type] || activityTypeInfo['routine'];
                  const Icon = typeInfo.icon;

                  return (
                    <div
                      key={activity.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full bg-${typeInfo.color}-light`}>
                            <Icon className={`h-5 w-5 text-${typeInfo.color}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-dark">{activity.name}</h4>
                            <div className="flex items-center text-sm text-gray-500 space-x-3">
                              <span>{formatTime(activity.timestamp)}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {formatDuration(activity.duration)}
                              </div>
                              {activity.score !== undefined && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                    {activity.score}%
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {!isFamily && (
                          <button
                            onClick={() => {
                              setSelectedActivity(activity);
                              setIsModalOpen(true);
                            }}
                            className={`text-sm text-${typeInfo.color} hover:text-${typeInfo.color}-hover font-medium`}
                          >
                            Edit
                          </button>
                        )}
                      </div>

                      {activity.notes && (
                        <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {activity.notes}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <ActivityStats />



          </div>

            <Fitness/>


          <ActivityModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedActivity(null);
              setSelectedType(null);
            }}
            activity={selectedActivity}
            initialType={selectedType}
          />
        </>
      )}
    </div>
  );
}
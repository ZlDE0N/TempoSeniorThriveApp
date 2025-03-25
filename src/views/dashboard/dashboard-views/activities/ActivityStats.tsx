import React from 'react';
import { TrendingUp, Activity, Brain } from 'lucide-react';
import { useActivityStore } from '../../../../store/dashboard_store/activityStore';
import { formatDuration } from '../../../../utils/dateUtils';

export default function ActivityStats() {
  const { getActivityStats } = useActivityStore();

  const categories = [
    { type: 'physical-exercise', label: 'Physical Exercise', icon: Activity },
    { type: 'cognitive-memory', label: 'Cognitive Activities', icon: Brain }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-dark">Activity Summary</h3>
        <TrendingUp className="h-5 w-5 text-primary" />
      </div>
      
      <div className="space-y-4">
        {categories.map(({ type, label, icon: Icon }) => {
          const stats = getActivityStats(type as any, 'week');
          const hasData = stats.totalDuration > 0;

          return (
            <div key={type} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-dark">{label}</h4>
              </div>
              
              {hasData ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    Weekly Activity: {formatDuration(stats.totalDuration)}
                  </div>
                  
                  {stats.averageScore !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Average Score</span>
                        <span>{Math.round(stats.averageScore)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${stats.averageScore}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {stats.averageMood !== undefined && (
                    <div className="text-sm text-gray-600">
                      Average Mood: {stats.averageMood.toFixed(1)}/5
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No activities logged this week</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
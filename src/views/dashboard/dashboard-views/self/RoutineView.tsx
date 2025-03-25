import React from 'react';
import { useRoutineStore, RoutineType } from '../../store/routineStore';
import { Sun, Moon, CloudSun } from 'lucide-react';

interface RoutineViewProps {
  type?: RoutineType;
}

export default function RoutineView({ type = 'morning' }: RoutineViewProps) {
  const { getTodayRoutine } = useRoutineStore();
  const routine = getTodayRoutine(type);

  const routineInfo = {
    morning: {
      title: 'Morning Routine',
      icon: Sun,
      description: 'Start your day with healthy habits',
      timeRange: '6:00 AM - 10:00 AM'
    },
    daytime: {
      title: 'Daytime Activities',
      icon: CloudSun,
      description: 'Stay active and engaged throughout the day',
      timeRange: '10:00 AM - 5:00 PM'
    },
    evening: {
      title: 'Evening Routine',
      icon: Moon,
      description: 'Wind down and prepare for restful sleep',
      timeRange: '5:00 PM - 10:00 PM'
    }
  };

  const info = routineInfo[type];
  const Icon = info.icon;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary-light">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-dark">{info.title}</h2>
            <p className="text-sm text-gray-500">{info.description}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {info.timeRange}
        </div>
      </div>

      {routine ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="space-y-4">
              {routine.tasks.map(task => (
                <div 
                  key={task.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                    readOnly
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    {task.description && (
                      <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                    )}
                  </div>
                  {task.duration && (
                    <span className="text-sm text-gray-500">
                      {task.duration} min
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Icon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No routine set</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create your {type} routine to get started
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
            >
              Create Routine
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
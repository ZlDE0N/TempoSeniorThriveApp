import React, { useState } from 'react';
import { Target, TrendingUp, Award, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useQualityStore, CareGoal } from '../../store/qualityStore';
import CareGoalModal from '../quality/CareGoalModal';
import { formatDateTime } from '../../utils/dateUtils';

export default function GoalsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<CareGoal | null>(null);
  const { goals, getGoalsByCategory } = useQualityStore();

  const activeGoals = goals.filter(goal => goal.status === 'in-progress');
  const completedGoals = goals.filter(goal => goal.status === 'achieved');
  const delayedGoals = goals.filter(goal => goal.status === 'delayed');

  const getStatusColor = (status: CareGoal['status']) => {
    switch (status) {
      case 'achieved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'delayed': return 'text-yellow-600 bg-yellow-100';
      case 'discontinued': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">My Goals</h2>
          <p className="text-sm text-gray-500">Track your personal wellness goals</p>
        </div>
        <button
          onClick={() => {
            setSelectedGoal(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Set New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-light rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary font-medium">Active Goals</h3>
            <Target className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-primary">{activeGoals.length}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-green-600 font-medium">Completed Goals</h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-green-600">{completedGoals.length}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-yellow-600 font-medium">Needs Attention</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-yellow-600">{delayedGoals.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Current Goals</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {goals.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Target className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No goals set</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by setting your first wellness goal
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Set New Goal
                </button>
              </div>
            </div>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedGoal(goal);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900">{goal.title}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                        {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Target Date: {formatDateTime(goal.targetDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Progress</div>
                    <div className="text-2xl font-bold text-primary">{goal.progress}%</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${goal.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      />
                    </div>
                  </div>
                </div>

                {goal.milestones.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center text-sm"
                      >
                        <div className={`flex-shrink-0 ${
                          milestone.completed ? 'text-green-500' : 'text-gray-400'
                        }`}>
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className={`ml-2 ${
                          milestone.completed ? 'line-through text-gray-500' : ''
                        }`}>
                          {milestone.title}
                        </span>
                        {milestone.completedAt && (
                          <span className="ml-2 text-xs text-gray-500">
                            {formatDateTime(milestone.completedAt)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <CareGoalModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGoal(null);
        }}
        goal={selectedGoal}
      />
    </div>
  );
}
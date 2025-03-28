import React from 'react';
import { TrendingUp, Star, Clock, Users, Award } from 'lucide-react';
import { useCaregiverPlatformStore } from '../../../../store/dashboard_store/caregiverPlatformStore';
import { useCaregiverStore } from '../../../../store/dashboard_store/caregiverStore';

export default function PerformanceMetrics() {
  const { getCaregiverMetrics } = useCaregiverPlatformStore();
  const { getActiveCaregiver } = useCaregiverStore();
  const activeCaregiver = getActiveCaregiver();
  const metrics = activeCaregiver ? getCaregiverMetrics(activeCaregiver.id) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Performance Metrics</h2>
          <p className="text-sm text-gray-500">Track your care quality and client satisfaction</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Client Satisfaction</h3>
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {metrics?.clientSatisfaction.toFixed(1)}%
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Based on client feedback
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Care Hours</h3>
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">
            {metrics?.totalHours || 0}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Total hours of care provided
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Completion Rate</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-500">
            {metrics?.completionRate.toFixed(1)}%
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Task completion rate
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Client Rating</h3>
            <Award className="h-5 w-5 text-accent" />
          </div>
          <div className="text-3xl font-bold text-accent">
            {metrics?.averageRating.toFixed(1)}/5.0
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Average client rating
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Feedback */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Client Feedback</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Sample feedback items */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Client Name</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Excellent care and attention to detail. Very professional and caring."
                </p>
                <p className="mt-2 text-xs text-gray-500">2 days ago</p>
              </div>
              {/* Add more feedback items */}
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Performance Trends</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Sample trend items */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Task Completion</span>
                  <span className="text-sm text-gray-500">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Client Satisfaction</span>
                  <span className="text-sm text-gray-500">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Punctuality</span>
                  <span className="text-sm text-gray-500">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
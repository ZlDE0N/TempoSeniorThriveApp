import React from 'react';
import VitalsView from '../vitals/VitalsView';
import { useHealthStore } from '../../store/healthStore';
import SymptomTracker from './health/SymptomTracker';
import SleepTracker from './health/SleepTracker';
import MoodTracker from './health/MoodTracker';

interface HealthDashboardProps {
  section?: string;
}

export default function HealthDashboard({ section }: HealthDashboardProps) {
  // Render appropriate health section based on route
  switch (section) {
    case 'vitals':
      return <VitalsView />;
    case 'symptoms':
      return <SymptomTracker />;
    case 'sleep':
      return <SleepTracker />;
    case 'mood':
      return <MoodTracker />;
    default:
      // Default health dashboard view
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-dark">Health Dashboard</h2>
              <p className="text-sm text-gray-500">Monitor your overall health and wellbeing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quick access cards for different health sections */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900">Vitals</h3>
              <p className="mt-2 text-sm text-gray-500">Track vital signs and measurements</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900">Symptoms</h3>
              <p className="mt-2 text-sm text-gray-500">Log and monitor symptoms</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900">Sleep</h3>
              <p className="mt-2 text-sm text-gray-500">Track sleep patterns and quality</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900">Mood</h3>
              <p className="mt-2 text-sm text-gray-500">Monitor emotional wellbeing</p>
            </div>
          </div>

          {/* Additional health insights and summaries can be added here */}
        </div>
      );
  }
}
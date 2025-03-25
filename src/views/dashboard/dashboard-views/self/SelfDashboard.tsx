import React from 'react';
import { 
  Heart, Activity, Brain, Target, Award, Users, 
  TrendingUp, Calendar, Star 
} from 'lucide-react';
// import { useVitalsStore } from '../../store/vitalsStore';
// import { useActivityStore } from '../../store/activityStore';
// import { useCognitiveStore } from '../../store/cognitiveStore';
// import { useUserStore } from '@/store/dashboard_store/userStore';
// import { formatDateTime } from '../../utils/dateUtils';

export default function SelfDashboard() {
  // const { getLatestEntry } = useVitalsStore();
  // const { getTodayActivities } = useActivityStore();
  // const { activities: cognitiveActivities } = useCognitiveStore();
  // const { setActiveSection } = useUserStore();

  // Get latest vital signs
  // const latestBP = getLatestEntry('bloodPressure');
  // const latestHR = getLatestEntry('heartRate');
  // const latestTemp = getLatestEntry('temperature');

  // Get today's activities
  // const todayActivities = getTodayActivities();

  // Get recent cognitive activities
  // const recentCognitive = cognitiveActivities.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Your Wellness Journey</h2>
          <p className="text-sm text-gray-500">Celebrate your progress and plan your next steps</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-all"
          // onClick={() => setActiveSection('health/vitals')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Your Vitals Story</h3>
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blood Pressure</span>
              {/* <span className="font-medium">{latestBP?.value || '--'}</span> */}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Heart Rate</span>
              {/* <span className="font-medium">{latestHR?.value || '--'} bpm</span> */}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temperature</span>
              {/* <span className="font-medium">{latestTemp?.value || '--'}°F</span> */}
            </div>
          </div>
        </div>

        <div 
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-all"
          // onClick={() => setActiveSection('activities')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Active Living</h3>
            <Activity className="h-5 w-5 text-secondary" />
          </div>
          <div className="text-3xl font-bold text-secondary mb-2">
            {/* {todayActivities.length} */}
          </div>
          <p className="text-gray-600">Moments of movement today</p>
        </div>

        <div 
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-all"
          // onClick={() => setActiveSection('cognitive')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Mind & Spirit</h3>
            <Brain className="h-5 w-5 text-accent" />
          </div>
          <div className="text-3xl font-bold text-accent mb-2">
            {/* {recentCognitive.length} */}
          </div>
          <p className="text-gray-600">Brain-boosting activities</p>
        </div>

        <div 
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-all"
          // onClick={() => setActiveSection('goals')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Your Goals</h3>
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            4
          </div>
          <p className="text-gray-600">Dreams in progress</p>
        </div>
      </div>

      {/* Progress and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Victories</h3>
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-primary-light rounded-lg">
              <div className="p-2 bg-white rounded-full">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-primary">Moving with Purpose</h4>
                <p className="text-sm text-gray-600">You're building strength and energy</p>
              </div>
              <Star className="h-5 w-5 text-yellow-400 ml-auto" />
            </div>
            <div className="flex items-center space-x-4 p-3 bg-secondary-light rounded-lg">
              <div className="p-2 bg-white rounded-full">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium text-secondary">Mental Mastery</h4>
                <p className="text-sm text-gray-600">Your mind is staying sharp and engaged</p>
              </div>
              <Star className="h-5 w-5 text-yellow-400 ml-auto" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Coming Up Next</h3>
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-primary-light rounded-full">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Morning Movement</h4>
                <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-secondary-light rounded-full">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Brain Games</h4>
                <p className="text-sm text-gray-500">Thursday at 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social and Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Your Support Circle</h3>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1544654803-b69140b285a1?w=150&h=150&fit=crop"
                  alt="Family member"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Williams</h4>
                  <p className="text-sm text-gray-500">Here for you</p>
                </div>
              </div>
              <span className="text-sm text-green-600">Available</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                  alt="Care partner"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Dr. Michael Chen</h4>
                  <p className="text-sm text-gray-500">Your wellness partner</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Available</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Your Progress</h3>
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Daily Movement</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Mental Wellness</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary rounded-full h-2" style={{ width: '90%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Daily Routines</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-accent rounded-full h-2" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from 'react';
import { Clock, Calendar, Users, DollarSign, Star, Bell, FileText, Briefcase, Heart, Activity, Brain, AlertTriangle } from 'lucide-react';
import { useCaregiverPlatformStore } from '../../../../store/dashboard_store/caregiverPlatformStore';
import { useCaregiverStore } from '../../../../store/dashboard_store/caregiverStore';
import { useUserStore } from '../../../../store/dashboard_store/userStore';
import { formatDateTime } from '../../../../utils/dateUtils';
import CaregiverSchedule from './CaregiverSchedule';
import ClientList from './ClientList';
import ShiftTracker from './ShiftTracker';
import ShiftHistory from './ShiftHistory';
import ShiftHandoff from './ShiftHandoff';

export default function CaregiverDashboard() {
  const { currentUser, setActiveSection } = useUserStore();
  const { getCaregiverMetrics } = useCaregiverPlatformStore();
  const { getCurrentShift, getActiveCaregiver } = useCaregiverStore();

  const isManager = currentUser?.role === 'caregiver_manager';
  const currentShift = getCurrentShift();
  const activeCaregiver = getActiveCaregiver();
  const metrics = activeCaregiver ? getCaregiverMetrics(activeCaregiver.id) : null;

  // Redirect to shift view if no active shift for regular caregivers
  // useEffect(() => {
  //   if (!isManager && !currentShift) {
  //     setActiveSection('shift');
  //   }
  // }, [isManager, currentShift, setActiveSection]);

  // // Return early if redirecting
  // if (!isManager && !currentShift) {
  //   return null;
  // }

  if (isManager) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-dark">Care Management Dashboard</h2>
            <p className="text-sm text-gray-500">Manage care team and client relationships</p>
          </div>
        </div>

        {/* Care Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Care Team</h3>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">12</div>
            <p className="text-gray-600">Active caregivers</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Client Satisfaction</h3>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">4.8</div>
            <p className="text-gray-600">Average rating</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Care Hours</h3>
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div className="text-3xl font-bold text-secondary mb-2">240</div>
            <p className="text-gray-600">Hours this month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Open Issues</h3>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500 mb-2">3</div>
            <p className="text-gray-600">Require attention</p>
          </div>
        </div>

        {/* Care Quality Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Care Quality Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Physical Care</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Medication Adherence</span>
                  <span>98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-secondary rounded-full h-2" style={{ width: '98%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Social Engagement</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent rounded-full h-2" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Heart className="h-5 w-5 text-primary" />
                <span>Blood pressure check completed by Sarah</span>
                <span className="text-gray-500">1h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Activity className="h-5 w-5 text-secondary" />
                <span>Morning exercise session completed</span>
                <span className="text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Brain className="h-5 w-5 text-accent" />
                <span>Memory activity session scheduled</span>
                <span className="text-gray-500">3h ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary-light rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Morning Care Visit</h4>
                    <p className="text-sm text-gray-500">Sarah Williams with John Smith</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">9:00 AM - 11:00 AM</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-secondary-light rounded-full">
                    <Activity className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Physical Therapy</h4>
                    <p className="text-sm text-gray-500">Michael Chen with Mary Johnson</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2:00 PM - 3:00 PM</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-accent-light rounded-full">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Cognitive Activities</h4>
                    <p className="text-sm text-gray-500">Lisa Rodriguez with John Smith</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">4:00 PM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Action Items</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <h4 className="font-medium text-red-900">Certification Expiring</h4>
                    <p className="text-sm text-red-700">Sarah's CPR certification expires in 30 days</p>
                  </div>
                </div>
                <button className="text-sm text-red-700 font-medium hover:text-red-800">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5 text-yellow-500" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Schedule Review Needed</h4>
                    <p className="text-sm text-yellow-700">Coverage gap identified next week</p>
                  </div>
                </div>
                <button className="text-sm text-yellow-700 font-medium hover:text-yellow-800">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-blue-900">Care Plan Update</h4>
                    <p className="text-sm text-blue-700">Quarterly review due for John Smith</p>
                  </div>
                </div>
                <button className="text-sm text-blue-700 font-medium hover:text-blue-800">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular caregiver view
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Caregiver Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, {activeCaregiver?.firstName}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
            <FileText className="h-4 w-4 mr-2" />
            Submit Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Current Status</h3>
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">
            {currentShift ? 'On Duty' : 'Off Duty'}
          </div>
          {currentShift && (
            <p className="mt-1 text-sm text-gray-500">
              Since {formatDateTime(currentShift.startTime)}
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Hours This Month</h3>
            <Calendar className="h-5 w-5 text-secondary" />
          </div>
          <div className="text-2xl font-bold text-secondary">
            {metrics?.totalHours || 0}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {metrics?.completionRate || 0}% completion rate
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Client Rating</h3>
            <Star className="h-5 w-5 text-accent" />
          </div>
          <div className="text-2xl font-bold text-accent">
            {metrics?.averageRating.toFixed(1) || '0.0'}/5.0
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Based on {metrics?.totalHours || 0} hours of care
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Earnings</h3>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            ${((metrics?.totalHours || 0) * (activeCaregiver?.hourlyRate || 0)).toFixed(2)}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            This month
          </p>
        </div>
      </div>

      {/* Current Shift Summary */}
      {currentShift && <ShiftTracker shift={currentShift} />}

      {/* Schedule and Client List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Schedule</h3>
          </div>
          <div className="p-6">
            <CaregiverSchedule />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Active Clients</h3>
          </div>
          <div className="p-6">
            <ClientList />
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-primary-light rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-primary">Need Support?</h3>
            <p className="text-sm text-primary-hover mt-1">
              Our support team is available 24/7 to assist you with any questions or concerns.
              Contact us through the app or call our support line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
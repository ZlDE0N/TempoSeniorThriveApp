import React, { useState } from 'react';
import { Activity, AlertTriangle, Calendar, Clock, Heart, Pill, Users, Camera, Phone, Mail, MapPin, Video, MessageCircle, Bell, FileText } from 'lucide-react';
import { useVitalsStore } from '../../../../store/vitalsStore';
import { useMedicationStore } from '../../../../store/medicationStore';
import { useActivityStore } from '../../../../store/dashboard_store/activityStore';
import { useIncidentStore } from '../../../../store/dashboard_store/incidentStore';
import { useCaregiverStore } from '../../../../store/dashboard_store/caregiverStore';
import { useUserStore } from '../../../../store/userStore';
import { formatDateTime } from '../../../../utils/dateUtils';
import { getApproximateTime } from '../../../../utils/locationUtils';
import SeniorPhotoModal from './SeniorPhotoModal';
import VideoRoom from '../../video/VideoRoom';
import FamilyUpdates from './FamilyUpdates';
import MessageCenter from './MessageCenter';

export default function FamilyDashboard() {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { getLatestEntry } = useVitalsStore();
  const { getPendingMedications } = useMedicationStore();
  const { getTodayActivities } = useActivityStore();
  const { getActiveIncidents } = useIncidentStore();
  const { caregivers } = useCaregiverStore();
  const { setActiveSection, activeProfile, updateProfile } = useUserStore();

  // Get primary caregiver
  const primaryCaregiver = caregivers.find(c => c.type === 'registered-nurse');

  const handlePhotoUpload = (file: File) => {
    if (activeProfile) {
      const photoUrl = URL.createObjectURL(file);
      updateProfile(activeProfile.id, {
        ...activeProfile,
        avatar: photoUrl
      });
    }
  };

  const pendingMedications = getPendingMedications();
  const activeIncidents = getActiveIncidents();
  const todayActivities = getTodayActivities();

  // Get latest vital signs
  const latestBP = getLatestEntry('bloodPressure');
  const latestHR = getLatestEntry('heartRate');
  const latestTemp = getLatestEntry('temperature');

  return (
    <div className="space-y-6">
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="p-6 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Video className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-medium">Start Video Call</h3>
          <p className="text-sm opacity-90">Connect face-to-face with {activeProfile?.name}</p>
        </button>

        <button
          onClick={() => setActiveSection('messages')}
          className="p-6 bg-secondary text-white rounded-lg hover:bg-secondary-hover transition-colors"
        >
          <MessageCircle className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-medium">Send Message</h3>
          <p className="text-sm opacity-90">Stay in touch with the care team</p>
        </button>

        <button
          onClick={() => setActiveSection('calendar')}
          className="p-6 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          <Calendar className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-medium">View Schedule</h3>
          <p className="text-sm opacity-90">Check upcoming appointments and activities</p>
        </button>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={activeProfile?.avatar || 'https://images.unsplash.com/photo-1544654803-b69140b285a1?w=150&h=150&fit=crop'}
                alt={activeProfile?.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow-md text-gray-600 hover:text-gray-800"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{activeProfile?.name}'s Status</h2>
              <p className="text-gray-500">Last updated: {formatDateTime(new Date().toISOString())}</p>
            </div>
          </div>
          {activeIncidents.length > 0 && (
            <div className="bg-red-50 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">
                  {activeIncidents.length} Active {activeIncidents.length === 1 ? 'Incident' : 'Incidents'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Health Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Health Status</h3>
              <button
                onClick={() => setActiveSection('vitals')}
                className="text-sm text-primary hover:text-primary-hover font-medium"
              >
                View Details
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Blood Pressure</span>
                <span className="font-medium">{latestBP?.value || '--'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Heart Rate</span>
                <span className="font-medium">{latestHR?.value || '--'} bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Temperature</span>
                <span className="font-medium">{latestTemp?.value || '--'}°F</span>
              </div>
            </div>
          </div>

          {/* Medication Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Medications</h3>
              <button
                onClick={() => setActiveSection('medications')}
                className="text-sm text-primary hover:text-primary-hover font-medium"
              >
                View Schedule
              </button>
            </div>
            {pendingMedications.length === 0 ? (
              <p className="text-sm text-gray-500">All medications taken for today</p>
            ) : (
              <div className="space-y-3">
                {pendingMedications.slice(0, 3).map(med => (
                  <div key={med.id} className="flex justify-between items-center">
                    <span className="text-gray-600">{med.name}</span>
                    <span className="text-sm text-gray-500">{med.timeSlots[0]}</span>
                  </div>
                ))}
                {pendingMedications.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{pendingMedications.length - 3} more medications
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Activity Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Today's Activities</h3>
              <button
                onClick={() => setActiveSection('activities')}
                className="text-sm text-primary hover:text-primary-hover font-medium"
              >
                View All
              </button>
            </div>
            {todayActivities.length === 0 ? (
              <p className="text-sm text-gray-500">No activities recorded today</p>
            ) : (
              <div className="space-y-3">
                {todayActivities.slice(0, 3).map(activity => (
                  <div key={activity.id} className="flex justify-between items-center">
                    <span className="text-gray-600">{activity.name}</span>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(activity.timestamp).split(' ')[1]}
                    </span>
                  </div>
                ))}
                {todayActivities.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{todayActivities.length - 3} more activities
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Care Team Communication */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Caregiver */}
        {primaryCaregiver && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Primary Care Provider</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary hover:bg-primary-light rounded-md"
                >
                  <Video className="h-4 w-4 mr-1" />
                  Video Call
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {primaryCaregiver.firstName} {primaryCaregiver.lastName}
                </h4>
                <p className="text-sm text-gray-500">
                  {primaryCaregiver.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <a
                    href={`tel:${primaryCaregiver.phone}`}
                    className="flex items-center text-gray-600 hover:text-primary"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    <span className="text-sm">Call</span>
                  </a>
                  <a
                    href={`mailto:${primaryCaregiver.email}`}
                    className="flex items-center text-gray-600 hover:text-primary"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Updates</h3>
            <button
              onClick={() => setActiveSection('updates')}
              className="text-sm text-primary hover:text-primary-hover font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <Bell className="h-5 w-5 text-primary" />
              <span>New care note added by {primaryCaregiver?.firstName}</span>
              <span className="text-gray-500">1h ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Activity className="h-5 w-5 text-secondary" />
              <span>Morning exercise completed</span>
              <span className="text-gray-500">3h ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Pill className="h-5 w-5 text-accent" />
              <span>All morning medications taken</span>
              <span className="text-gray-500">4h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Documents */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Important Documents</h3>
          <button
            onClick={() => setActiveSection('documents')}
            className="text-sm text-primary hover:text-primary-hover font-medium"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <FileText className="h-6 w-6 text-primary mb-2" />
            <h4 className="font-medium text-gray-900">Care Plan</h4>
            <p className="text-sm text-gray-500">Updated 2 days ago</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <FileText className="h-6 w-6 text-secondary mb-2" />
            <h4 className="font-medium text-gray-900">Medication List</h4>
            <p className="text-sm text-gray-500">Updated 1 week ago</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <FileText className="h-6 w-6 text-accent mb-2" />
            <h4 className="font-medium text-gray-900">Emergency Contacts</h4>
            <p className="text-sm text-gray-500">Updated 1 month ago</p>
          </div>
        </div>
      </div>

      <SeniorPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onUpload={handlePhotoUpload}
        currentPhoto={activeProfile?.avatar}
      />

      <VideoRoom
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        participantName={activeProfile?.name}
      />
    </div>
  );
}
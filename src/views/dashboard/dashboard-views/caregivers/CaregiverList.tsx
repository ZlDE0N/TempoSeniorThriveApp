import React, { useState } from 'react';
import { Briefcase, Mail, Phone, Plus, Calendar, Clock, DollarSign, MapPin, Star, Shield, Award, Users, FileText } from 'lucide-react';
import { useCaregiverStore, Caregiver, CaregiverType } from '../../store/caregiverStore';
import CaregiverModal from './CaregiverModal';
import CaregiverScheduleModal from './CaregiverScheduleModal';
import ShiftTracker from './ShiftTracker';
import ShiftHistory from './ShiftHistory';
import ShiftHandoff from './ShiftHandoff';

export default function CaregiverList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [filterType, setFilterType] = useState<CaregiverType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'on-leave'>('all');
  const { caregivers, getCurrentShift } = useCaregiverStore();

  const currentShift = getCurrentShift();

  // Filter caregivers based on type and status
  const filteredCaregivers = caregivers.filter(caregiver => {
    const matchesType = filterType === 'all' || caregiver.type === filterType;
    const matchesStatus = filterStatus === 'all' || caregiver.status === filterStatus;
    return matchesType && matchesStatus;
  });

  // Calculate team statistics
  const stats = {
    total: caregivers.length,
    active: caregivers.filter(c => c.status === 'active').length,
    onLeave: caregivers.filter(c => c.status === 'on-leave').length,
    certified: caregivers.filter(c => c.certifications?.length > 0).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Care Team</h2>
          <p className="text-sm text-gray-500">Manage caregivers and shifts</p>
        </div>
        <button
          onClick={() => {
            setSelectedCaregiver(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Caregiver
        </button>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-light rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary font-medium">Total Team</h3>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-primary">{stats.total}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-green-600 font-medium">Active</h3>
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-yellow-600 font-medium">On Leave</h3>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-blue-600 font-medium">Certified</h3>
            <Award className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-600">{stats.certified}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CaregiverType | 'all')}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="all">All Types</option>
          <option value="registered-nurse">Registered Nurses</option>
          <option value="licensed-practical-nurse">Licensed Practical Nurses</option>
          <option value="certified-nursing-assistant">Certified Nursing Assistants</option>
          <option value="home-health-aide">Home Health Aides</option>
          <option value="personal-care-aide">Personal Care Aides</option>
          <option value="companion">Companions</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'on-leave')}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-leave">On Leave</option>
        </select>
      </div>

      {currentShift && (
        <>
          <ShiftTracker />
          <ShiftHandoff />
        </>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {showHistory ? 'Hide History' : 'Show Shift History'}
        </button>
      </div>

      {showHistory ? (
        <ShiftHistory />
      ) : (
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {filteredCaregivers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No caregivers found matching your filters.
            </div>
          ) : (
            filteredCaregivers.map((caregiver) => (
              <div key={caregiver.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary-light">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-dark">
                        {caregiver.firstName} {caregiver.lastName}
                      </h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500 space-x-2">
                        <span>{caregiver.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        <span>•</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          caregiver.status === 'active' ? 'bg-green-100 text-green-800' :
                          caregiver.status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {caregiver.status.charAt(0).toUpperCase() + caregiver.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        setSelectedCaregiver(caregiver);
                        setIsScheduleModalOpen(true);
                      }}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCaregiver(caregiver);
                        setIsModalOpen(true);
                      }}
                      className="text-primary hover:text-primary-hover font-medium text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {caregiver.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {caregiver.phone}
                  </div>
                </div>

                {caregiver.qualifications && caregiver.qualifications.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {caregiver.qualifications.map((qual, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary"
                      >
                        {qual}
                      </span>
                    ))}
                  </div>
                )}

                {caregiver.location && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    Last location update: {new Date(caregiver.location.lastUpdated).toLocaleString()}
                  </div>
                )}

                {caregiver.notes && (
                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {caregiver.notes}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Started: {new Date(caregiver.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Rate: ${caregiver.hourlyRate}/hour
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <CaregiverModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCaregiver(null);
        }}
        caregiver={selectedCaregiver}
      />
      
      <CaregiverScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setSelectedCaregiver(null);
        }}
        caregiver={selectedCaregiver}
      />
    </div>
  );
}
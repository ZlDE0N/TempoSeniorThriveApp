import React from 'react';
import { User, Phone, MapPin, Clock } from 'lucide-react';
import { useCaregiverPlatformStore } from '../../../../store/dashboard_store/caregiverPlatformStore';
import { useCaregiverStore } from '../../../../store/dashboard_store/caregiverStore';

export default function ClientList() {
  const { careRequests } = useCaregiverPlatformStore();
  const { getActiveCaregiver } = useCaregiverStore();
  const activeCaregiver = getActiveCaregiver();

  if (!activeCaregiver) return null;

  const activeClients = careRequests.filter(
    request => request.caregiverId === activeCaregiver.id && request.status === 'active'
  );

  return (
    <div className="space-y-4">
      {activeClients.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p>No active clients</p>
        </div>
      ) : (
        activeClients.map((client) => (
          <div
            key={client.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-secondary-light rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">
                  {client.clientDetails.name}
                </h4>
                <span className="text-xs text-gray-500">
                  {client.type}
                </span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {client.clientDetails.location}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {client.schedule.hours.length} shifts/week
              </div>
            </div>
            <button
              className="flex-shrink-0 p-2 text-primary hover:text-primary-hover rounded-full hover:bg-primary-light"
              title="Call client"
            >
              <Phone className="h-5 w-5" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
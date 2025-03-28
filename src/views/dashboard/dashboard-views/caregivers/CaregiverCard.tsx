import React, { useState } from 'react';
import { Star, Heart, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Caregiver } from '../../store/caregiverStore';
import { useCaregiverPlatformStore } from '../../store/caregiverPlatformStore';
import { useUserStore } from '../../store/userStore';
import CaregiverRatingModal from './CaregiverRatingModal';
import { formatDateTime } from '../../utils/dateUtils';

interface CaregiverCardProps {
  caregiver: Caregiver;
  showRating?: boolean;
}

export default function CaregiverCard({ caregiver, showRating = true }: CaregiverCardProps) {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const { currentUser } = useUserStore();
  const { getCaregiverMetrics } = useCaregiverPlatformStore();
  const metrics = getCaregiverMetrics(caregiver.id);

  const isFamily = currentUser?.role === 'family';
  const isSelf = currentUser?.role === 'self';

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary-light">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {caregiver.firstName} {caregiver.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {caregiver.type.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </p>
            </div>
          </div>

          {showRating && (
            <div className="text-right">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-900">
                  {metrics.averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {caregiver.reviews?.length || 0} reviews
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {caregiver.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {caregiver.phone}
          </div>
          {caregiver.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              Last seen: {formatDateTime(caregiver.location.lastUpdated)}
            </div>
          )}
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

        {(isFamily || isSelf) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsRatingModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover"
            >
              <Star className="h-4 w-4 mr-2" />
              Rate Caregiver
            </button>
          </div>
        )}
      </div>

      <CaregiverRatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        caregiverId={caregiver.id}
        caregiverName={`${caregiver.firstName} ${caregiver.lastName}`}
      />
    </div>
  );
}
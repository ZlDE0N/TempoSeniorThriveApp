import React, { useState } from 'react';
import { Clock, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from '../../dashboard_components/Modal';

interface ShiftStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartShift: (location?: string) => void;
}

export default function ShiftStartModal({ isOpen, onClose, onStartShift }: ShiftStartModalProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleStartShift = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          onStartShift(location);
          setIsGettingLocation(false);
          onClose();
        },
        (error) => {
          console.error('Location error:', error);
          setLocationError('Unable to get your location. Starting shift without location tracking.');
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocationError('Location services not available. Starting shift without location tracking.');
      setIsGettingLocation(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Start Your Shift"
    >
      <div className="space-y-6">
        <div className="bg-primary-light rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-medium text-primary">Ready to Begin?</h3>
              <p className="text-sm text-primary-hover mt-1">
                Starting your shift will enable you to:
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Track care activities in real-time
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Access client care plans and schedules
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Log medications and vital signs
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Document important observations
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              Location tracking helps verify care delivery and ensures safety
            </span>
          </div>
          {locationError && (
            <div className="mt-2 flex items-center text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
              <AlertTriangle className="h-4 w-4 mr-1" />
              {locationError}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStartShift}
            disabled={isGettingLocation}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50"
          >
            {isGettingLocation ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Starting...
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Start Shift
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
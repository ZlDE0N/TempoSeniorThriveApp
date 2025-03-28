import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { useCaregiverPlatformStore } from '../../store/caregiverPlatformStore';
import Modal from '../Modal';

interface CaregiverRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverId: string;
  caregiverName: string;
}

export default function CaregiverRatingModal({ isOpen, onClose, caregiverId, caregiverName }: CaregiverRatingModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { updateCaregiver } = useCaregiverPlatformStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateCaregiver(caregiverId, {
      reviews: [{
        id: crypto.randomUUID(),
        clientId: 'currentUserId',
        rating,
        comment,
        date: new Date().toISOString()
      }]
    });
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Rate ${caregiverName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Care Quality Rating
          </label>
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`p-2 rounded-full transition-colors ${
                  rating >= value
                    ? 'text-yellow-400 hover:text-yellow-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
              >
                <Star className="h-8 w-8" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Share Your Experience
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Tell us about your experience with this caregiver..."
          />
        </div>

        <div className="bg-primary-light rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Heart className="h-5 w-5 text-primary" />
            <p className="text-sm text-primary-hover">
              Your feedback helps maintain high quality care standards and supports caregiver development.
            </p>
          </div>
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
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
          >
            Submit Rating
          </button>
        </div>
      </form>
    </Modal>
  );
}
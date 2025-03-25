import React from 'react';
import { Activity, Heart, Star, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Sport } from '../../../services/sportsService';
import Modal from '../../Modal';

interface SportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sport: Sport | null;
}

export default function SportsModal({ isOpen, onClose, sport }: SportsModalProps) {
  if (!sport) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={sport.name}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary-light">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{sport.name}</h3>
              <p className="text-sm text-gray-500">{sport.type}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            sport.difficulty === 'easy'
              ? 'bg-green-100 text-green-800'
              : sport.difficulty === 'moderate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {sport.difficulty}
          </span>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-sm text-gray-600">{sport.description}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Benefits</h4>
          <div className="space-y-2">
            {sport.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Heart className="h-4 w-4 text-primary mr-2" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Required Equipment</h4>
          <div className="space-y-2">
            {sport.equipment.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item}</span>
                <a
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(`${sport.name} ${item}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShoppingCart className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Safety Tips</h4>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="space-y-2">
              {sport.safetyTips.map((tip, index) => (
                <div key={index} className="flex items-center text-sm text-yellow-800">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-primary-light rounded-lg p-4">
          <div className="flex items-center space-x-2 text-primary">
            <Star className="h-5 w-5" />
            <span className="font-medium">Pro Tip</span>
          </div>
          <p className="mt-2 text-sm text-primary-hover">
            Start slowly and gradually increase intensity. Listen to your body and celebrate small improvements!
          </p>
        </div>
      </div>
    </Modal>
  );
}
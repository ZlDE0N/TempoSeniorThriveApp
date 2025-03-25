import React from 'react';
import { SmilePlus, Smile, Meh, Frown } from 'lucide-react';

interface MoodSelectorProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

const moods = [
  { value: 5, icon: SmilePlus, label: '5 - Excellent' },
  { value: 4, icon: Smile, label: '4 - Very Good' },
  { value: 3, icon: Meh, label: '3 - Good' },
  { value: 2, icon: Meh, label: '2 - Fair' },
  { value: 1, icon: Frown, label: '1 - Poor' }
];

export default function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Mood Rating
      </label>
      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = value === mood.value;
          
          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => onChange(isSelected ? undefined : mood.value)}
              className={`p-2 rounded-full transition-all ${
                isSelected
                  ? 'bg-primary text-white transform scale-110'
                  : 'text-gray-400 hover:text-primary hover:bg-primary-light'
              }`}
              title={mood.label}
            >
              <Icon className={`h-8 w-8 ${mood.value <= 2 ? 'transform rotate-180' : ''}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
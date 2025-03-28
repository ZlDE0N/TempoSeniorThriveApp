import React from 'react';
import { Settings } from 'lucide-react';
import { useVitalsConfig } from '@/hooks/useVitalsConfig';

interface VitalsSettingsProps {
  onClose?: () => void;
}

const vitalGroups = [
  {
    name: 'Basic Vitals',
    items: ['bloodPressure', 'heartRate', 'temperature', 'respiratoryRate', 'oxygenLevel']
  },
  {
    name: 'Health Metrics',
    items: ['weight', 'bloodGlucose', 'painLevel', 'hydrationLevel']
  },
  {
    name: 'Wellness Indicators',
    items: ['nutrition', 'sleepQuality', 'mood', 'temperatureTrend']
  }
];

const vitalLabels: Record<string, string> = {
  bloodPressure: 'Blood Pressure',
  heartRate: 'Heart Rate',
  temperature: 'Temperature',
  respiratoryRate: 'Respiratory Rate',
  oxygenLevel: 'Oxygen Level',
  weight: 'Weight',
  bloodGlucose: 'Blood Glucose',
  painLevel: 'Pain Level',
  hydrationLevel: 'Hydration',
  nutrition: 'Nutrition & Calories',
  sleepQuality: 'Sleep Quality',
  mood: 'Mood',
  temperatureTrend: 'Temperature Trend'
};

export default function VitalsSettings({ onClose }: VitalsSettingsProps) {
  const { config, toggleVital } = useVitalsConfig();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Settings className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm text-gray-500">Select the vitals you want to track</span>
        </div>
        <button 
          onClick={() => Object.keys(config).forEach(toggleVital)}
          className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
        >
          {Object.values(config).every(Boolean) ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="space-y-6">
        {vitalGroups.map((group) => (
          <div key={group.name} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <h4 className="text-sm font-medium text-dark mb-4">{group.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((vital) => (
                <label
                  key={vital}
                  className="relative flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={config[vital] || false}
                      onChange={() => toggleVital(vital)}
                      className={`h-4 w-4 rounded border-gray-300 focus:ring-primary ${
                        config[vital] ? 'bg-primary border-primary' : ''
                      }`}
                    />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-dark">
                    {vitalLabels[vital]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {onClose && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
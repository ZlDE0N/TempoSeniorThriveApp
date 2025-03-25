import React from 'react';
import { Shield, Eye, EyeOff, Lock, Share2, Heart, Pill, Activity, Brain, Users, FileText, AlertTriangle, SmilePlus, Moon, Apple } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

const privacySettings = [
  { 
    key: 'vitals', 
    label: 'Wellness Metrics', 
    description: 'Share your health journey with trusted care partners',
    icon: Heart 
  },
  { 
    key: 'medications', 
    label: 'Medication Journey', 
    description: 'Keep your care circle informed about your medication routine',
    icon: Pill
  },
  { 
    key: 'activities', 
    label: 'Daily Adventures', 
    description: 'Share your activity milestones with those who support you',
    icon: Activity
  },
  { 
    key: 'cognitive', 
    label: 'Brain Power', 
    description: 'Let others celebrate your cognitive achievements',
    icon: Brain
  },
  { 
    key: 'social', 
    label: 'Social Connections', 
    description: 'Share your social activities and engagement',
    icon: Users
  },
  { 
    key: 'documents', 
    label: 'Important Files', 
    description: 'Control access to your personal documents',
    icon: FileText
  },
  { 
    key: 'incidents', 
    label: 'Health Events', 
    description: 'Keep your care team informed about important health updates',
    icon: AlertTriangle
  },
  { 
    key: 'notes', 
    label: 'Daily Reflections', 
    description: 'Share personal notes and observations',
    icon: FileText
  },
  { 
    key: 'mood', 
    label: 'Mood Journey', 
    description: 'Share your emotional wellbeing with trusted supporters',
    icon: SmilePlus
  },
  { 
    key: 'sleep', 
    label: 'Sleep Stories', 
    description: 'Share insights about your rest and recovery',
    icon: Moon
  },
  { 
    key: 'nutrition', 
    label: 'Nourishment Log', 
    description: 'Share your nutrition journey with care partners',
    icon: Apple
  }
];

export default function PrivacySettings() {
  const { sharingPreferences, updateSharingPreferences } = useUserStore();

  const toggleSharing = (key: keyof typeof sharingPreferences) => {
    updateSharingPreferences({ [key]: !sharingPreferences[key] });
  };

  const allEnabled = Object.values(sharingPreferences).every(Boolean);
  const someEnabled = Object.values(sharingPreferences).some(Boolean);

  const toggleAll = () => {
    const newValue = !allEnabled;
    const updates = Object.keys(sharingPreferences).reduce((acc, key) => ({
      ...acc,
      [key]: newValue
    }), {});
    updateSharingPreferences(updates);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Your Privacy Choices</h2>
          <p className="text-sm text-gray-500">Customize how you share your journey with your care circle</p>
        </div>
        <button
          onClick={toggleAll}
          className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
            allEnabled
              ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              : 'border-primary text-white bg-primary hover:bg-primary-hover'
          }`}
        >
          {allEnabled ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Keep Private
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 mr-2" />
              Share Journey
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 space-y-6">
          {privacySettings.map(({ key, label, description, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <div className="flex-1">
                <div className="flex items-center">
                  <Icon className={`h-5 w-5 ${
                    sharingPreferences[key as keyof typeof sharingPreferences]
                      ? 'text-primary'
                      : 'text-gray-400'
                  } mr-2`} />
                  <label htmlFor={key} className="text-sm font-medium text-gray-900">
                    {label}
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500 ml-7">{description}</p>
              </div>
              <div className="ml-4">
                <button
                  type="button"
                  onClick={() => toggleSharing(key as keyof typeof sharingPreferences)}
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    sharingPreferences[key as keyof typeof sharingPreferences]
                      ? 'bg-primary'
                      : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                      sharingPreferences[key as keyof typeof sharingPreferences]
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary-light rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-primary">Your Privacy Matters</h3>
            <p className="text-sm text-primary-hover mt-1">
              You're in control of your information. When you choose to share parts of your journey, 
              it helps your care circle provide better support while respecting your independence. 
              Your choices can be updated anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
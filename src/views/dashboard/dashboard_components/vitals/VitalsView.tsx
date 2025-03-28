import React, { useState } from 'react';
import { 
  Heart, Activity, Thermometer, Scale, Droplets, Stethoscope, 
  Droplet, Gauge, Apple, Moon, SmilePlus, BarChart3, UserPlus
} from 'lucide-react';
import VitalCard from './VitalCard';
import VitalsSettings from './VitalsSettings';
import Modal from '../Modal';
import { useVitalsConfig } from '../../hooks/useVitalsConfig';
import { useUserStore } from '../../../../store/dashboard_store/userStore';
import AddPatient from '../auth/AddPatient';
import ExportButton from '../reports/ExportButton';

const vitalDefinitions = {
  bloodPressure: { 
    icon: Heart, 
    title: "Blood Pressure",
    unit: "mmHg",
    color: 'primary' as const,
  },
  heartRate: { 
    icon: Activity,
    title: "Heart Rate",
    unit: "bpm",
    color: 'secondary' as const,
  },
  temperature: {
    icon: Thermometer,
    title: "Temperature",
    unit: "°F",
    color: 'accent' as const,
  },
  respiratoryRate: {
    icon: Stethoscope,
    title: "Respiratory Rate",
    unit: "breaths/min",
    color: 'primary' as const,
  },
  oxygenLevel: {
    icon: Droplets,
    title: "Oxygen Level",
    unit: "%",
    color: 'secondary' as const,
  },
  weight: {
    icon: Scale,
    title: "Weight",
    unit: "lbs",
    color: 'accent' as const,
  },
  bloodGlucose: {
    icon: Droplet,
    title: "Blood Glucose",
    unit: "mg/dL",
    color: 'primary' as const,
  },
  painLevel: {
    icon: Gauge,
    title: "Pain Level",
    unit: "/10",
    color: 'secondary' as const,
  },
  hydrationLevel: {
    icon: Droplet,
    title: "Hydration",
    unit: "mL",
    color: 'accent' as const,
  },
  nutrition: {
    icon: Apple,
    title: "Nutrition",
    unit: "kcal",
    color: 'primary' as const,
  },
  sleepQuality: {
    icon: Moon,
    title: "Sleep Quality",
    unit: "hours",
    color: 'secondary' as const,
  },
  mood: {
    icon: SmilePlus,
    title: "Mood",
    unit: "/5",
    color: 'accent' as const,
  },
  temperatureTrend: {
    icon: BarChart3,
    title: "Temperature Trend",
    unit: "°F",
    color: 'primary' as const,
  }
};

export default function VitalsView() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const { config } = useVitalsConfig();
  const { activeProfile, currentUser } = useUserStore();

  // Get date range for export (last 30 days)
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const enabledVitals = Object.entries(config)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const isFamily = currentUser?.role === 'family';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">
            {isFamily ? `${activeProfile?.name}'s Vital Signs` : 'Your Vital Signs'}
          </h2>
          <p className="text-sm text-gray-500">
            {isFamily 
              ? 'Monitor and track vital signs to ensure wellbeing'
              : 'Track your vital signs to monitor your health'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {!isFamily && (
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              onClick={() => setIsAddPatientOpen(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Care Partner
            </button>
          )}
          <ExportButton 
            type="vitals"
            dateRange={{ start: startDate, end: endDate }}
          />
          {!isFamily && (
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              onClick={() => setIsSettingsOpen(true)}
            >
              Personalize Tracking
            </button>
          )}
        </div>
      </div>

      {enabledVitals.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isFamily 
              ? 'No vital signs are being tracked yet'
              : 'Start Your Wellness Journey'}
          </h3>
          <p className="text-gray-500 mb-4">
            {isFamily
              ? 'Work with the care team to set up vital sign tracking'
              : 'Choose which aspects of your health you\'d like to track. Click "Personalize Tracking" to begin.'}
          </p>
          {!isFamily && (
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
            >
              Get Started
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enabledVitals.map((key) => {
            const vital = vitalDefinitions[key as keyof typeof vitalDefinitions];
            if (!vital) return null;

            return (
              <VitalCard
                key={key}
                icon={vital.icon}
                title={vital.title}
                unit={vital.unit}
                color={vital.color}
                vitalKey={key}
              />
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Personalize Your Wellness Journey"
      >
        <VitalsSettings onClose={() => setIsSettingsOpen(false)} />
      </Modal>

      <AddPatient
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
      />
    </div>
  );
}
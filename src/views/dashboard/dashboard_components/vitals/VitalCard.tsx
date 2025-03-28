import React, { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import { useVitalsStore } from '@/store/dashboard_store/vitalsStore';
import { useUserStore } from '@/store/dashboard_store/userStore';

import VitalEntryModal from './VitalEntryModal';


import { formatDateTime } from '@/utils/dateUtils';

interface VitalCardProps {
  icon: React.ElementType;
  title: string;
  unit: string;
  color: 'primary' | 'secondary' | 'accent';
  vitalKey: string;
}

const statusStyles = {
  normal: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  critical: 'bg-red-100 text-red-800',
};

export default function VitalCard({ icon: Icon, title, unit, color, vitalKey }: VitalCardProps) {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const latestEntry = useVitalsStore((state) => state.getLatestEntry(vitalKey));
  const { careMode, activeProfile } = useUserStore();

  const displayValue = latestEntry?.value?.toString() || '—';
  const displayTime = latestEntry
    ? formatDateTime(latestEntry.timestamp)
    : 'No readings';

  const isOutdated = latestEntry && (
    new Date().getTime() - new Date(latestEntry.timestamp).getTime() > 24 * 60 * 60 * 1000
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-${color}-light`}>
              <Icon className={`h-6 w-6 text-${color}`} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-dark">{title}</h3>
              <div className="mt-1">
                <span className="text-2xl font-semibold text-dark">{displayValue}</span>
                <span className="ml-1 text-sm text-gray-500">{unit}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEntryModalOpen(true)}
            className={`p-2 rounded-full bg-${color}-light opacity-80 hover:opacity-100 transition-opacity`}
            title={`Add ${title} Reading`}
          >
            <Plus className={`h-5 w-5 text-${color}`} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{displayTime}</span>
            {isOutdated && (
              <div className="ml-2 flex items-center text-yellow-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-xs">Outdated</span>
              </div>
            )}
          </div>
          {latestEntry?.status && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[latestEntry.status]}`}>
              {latestEntry.status.charAt(0).toUpperCase() + latestEntry.status.slice(1)}
            </span>
          )}
        </div>
        {latestEntry?.notes && (
          <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
            {latestEntry.notes}
          </p>
        )}
      </div>

      <VitalEntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        vitalKey={vitalKey}
        title={title}
        unit={unit}
        color={color}
      />
    </>
  );
}
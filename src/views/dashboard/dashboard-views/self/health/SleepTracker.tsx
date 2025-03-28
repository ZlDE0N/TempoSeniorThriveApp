import React, { useState } from 'react';
import { Moon, Plus, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { useHealthStore } from '../../../../../store/dashboard_store/healthStore';
import SleepModal from './SleepModal';
import { formatDateTime } from '../../../../../utils/dateUtils';

export default function SleepTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { sleep, getSleepStats } = useHealthStore();

  const stats = getSleepStats(30); // Get last 30 days of stats

  const getSleepQualityColor = (quality: number) => {
    if (quality >= 4) return 'text-green-500';
    if (quality >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const calculateSleepDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    return Math.round((end - start) / (1000 * 60 * 60) * 10) / 10; // Hours with 1 decimal
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Sleep Tracker</h2>
          <p className="text-sm text-gray-500">Monitor your sleep patterns and quality</p>
        </div>
        <button
          onClick={() => {
            setSelectedEntry(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Sleep
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Sleep Duration */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Average Sleep</h3>
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">
            {stats.averageHours.toFixed(1)}h
          </div>
          <p className="mt-1 text-sm text-gray-500">30-day average</p>
        </div>

        {/* Sleep Quality */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Sleep Quality</h3>
            <Moon className="h-5 w-5 text-secondary" />
          </div>
          <div className="text-3xl font-bold text-secondary">
            {stats.averageQuality.toFixed(1)}/5
          </div>
          <p className="mt-1 text-sm text-gray-500">Average rating</p>
        </div>

        {/* Sleep Disruptions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Disruptions</h3>
            <AlertTriangle className="h-5 w-5 text-accent" />
          </div>
          <div className="text-3xl font-bold text-accent">
            {stats.commonInterruptions.toFixed(1)}
          </div>
          <p className="mt-1 text-sm text-gray-500">Average per night</p>
        </div>
      </div>

      {/* Common Factors */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Common Factors</h3>
        <div className="flex flex-wrap gap-2">
          {stats.commonFactors.map((factor) => (
            <span
              key={factor}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
            >
              {factor}
            </span>
          ))}
        </div>
      </div>

      {/* Sleep History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sleep History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {sleep.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Moon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No sleep entries</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start tracking your sleep to see patterns and trends
              </p>
            </div>
          ) : (
            sleep.map((entry) => (
              <div
                key={entry.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedEntry(entry);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {formatDateTime(entry.date).split('at')[0]}
                      </span>
                      <span className={`font-medium ${getSleepQualityColor(entry.quality)}`}>
                        Quality: {entry.quality}/5
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-900">
                      {calculateSleepDuration(entry.startTime, entry.endTime)} hours
                      {entry.interruptions > 0 && ` • ${entry.interruptions} interruptions`}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {entry.startTime.split('T')[1].slice(0, 5)} - {entry.endTime.split('T')[1].slice(0, 5)}
                    </div>
                    {entry.factors && Object.keys(entry.factors).length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1 justify-end">
                        {Object.entries(entry.factors)
                          .filter(([_, value]) => value)
                          .map(([factor]) => (
                            <span
                              key={factor}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {factor}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {entry.notes && (
                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {entry.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <SleepModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEntry(null);
        }}
        entry={selectedEntry}
      />
    </div>
  );
}
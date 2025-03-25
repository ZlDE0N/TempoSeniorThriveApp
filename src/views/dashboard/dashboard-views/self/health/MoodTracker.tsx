import React, { useState } from 'react';
import { Smile, Plus, TrendingUp, Calendar, Activity } from 'lucide-react';
import { useHealthStore } from '../../../store/healthStore';
import MoodModal from './MoodModal';
import { formatDateTime } from '../../../utils/dateUtils';

export default function MoodTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { mood, getMoodTrends } = useHealthStore();

  const trends = getMoodTrends(30); // Get last 30 days of trends

  const getMoodIcon = (level: number) => {
    switch (level) {
      case 1:
      case 2:
        return '😔';
      case 3:
        return '😐';
      case 4:
      case 5:
        return '😊';
      default:
        return '😐';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Mood Tracker</h2>
          <p className="text-sm text-gray-500">Monitor your emotional wellbeing</p>
        </div>
        <button
          onClick={() => {
            setSelectedEntry(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Mood
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Mood */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Average Mood</h3>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">
            {trends.averageLevel.toFixed(1)}
          </div>
          <p className="mt-1 text-sm text-gray-500">30-day average</p>
        </div>

        {/* Common Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top Activities</h3>
            <Activity className="h-5 w-5 text-secondary" />
          </div>
          <div className="space-y-2">
            {trends.correlatedActivities.map((activity) => (
              <div
                key={activity}
                className="text-sm bg-gray-50 px-3 py-2 rounded-lg"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>

        {/* Common Triggers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Common Triggers</h3>
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-2">
            {trends.commonTriggers.map((trigger) => (
              <div
                key={trigger}
                className="text-sm bg-gray-50 px-3 py-2 rounded-lg"
              >
                {trigger}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Mood History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mood.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Smile className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No mood entries</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start tracking your mood to see patterns and trends
              </p>
            </div>
          ) : (
            mood.map((entry) => (
              <div
                key={entry.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedEntry(entry);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getMoodIcon(entry.level)}</div>
                    <div>
                      <div className="text-sm text-gray-500">
                        {formatDateTime(entry.timestamp)}
                      </div>
                      {entry.notes && (
                        <p className="mt-1 text-sm text-gray-900">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                  {entry.activities && entry.activities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.activities.map((activity) => (
                        <span
                          key={activity}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <MoodModal
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
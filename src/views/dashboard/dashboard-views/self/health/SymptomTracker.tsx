import React, { useState } from 'react';
import { Thermometer, Plus, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import { useHealthStore } from '../../../store/healthStore';
import SymptomModal from './SymptomModal';
import { formatDateTime } from '../../../utils/dateUtils';

export default function SymptomTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const { symptoms, getSymptomTrends } = useHealthStore();

  const trends = getSymptomTrends(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    new Date().toISOString()
  );

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
      case 2:
        return 'text-green-500';
      case 3:
        return 'text-yellow-500';
      case 4:
      case 5:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Symptom Tracker</h2>
          <p className="text-sm text-gray-500">Monitor and track your symptoms</p>
        </div>
        <button
          onClick={() => {
            setSelectedSymptom(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Symptom
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Most Common Symptoms */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Common Symptoms</h3>
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            {Object.entries(trends.symptomFrequency)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{type}</span>
                  <span className="font-medium text-primary">{count}x</span>
                </div>
              ))}
          </div>
        </div>

        {/* Average Severity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Average Severity</h3>
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <div className="space-y-2">
            {Object.entries(trends.averageSeverity)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([type, avg]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{type}</span>
                  <span className={`font-medium ${getSeverityColor(avg)}`}>
                    {avg.toFixed(1)}/5
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Common Triggers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Common Triggers</h3>
            <AlertCircle className="h-5 w-5 text-accent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {trends.commonTriggers.map((trigger) => (
              <span
                key={trigger}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {trigger}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Symptom History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Symptom History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {symptoms.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Thermometer className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No symptoms logged</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start tracking your symptoms to identify patterns
              </p>
            </div>
          ) : (
            symptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedSymptom(symptom);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{symptom.type}</h4>
                      <span className={`${getSeverityColor(symptom.severity)} font-medium`}>
                        Severity: {symptom.severity}/5
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDateTime(symptom.timestamp)}
                      {symptom.duration ? ` • ${symptom.duration} minutes` : ''}
                      {symptom.location ? ` • ${symptom.location}` : ''}
                    </p>
                  </div>
                </div>

                {symptom.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {symptom.description}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-2">
                  {symptom.triggers && symptom.triggers.length > 0 && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Triggers:</span>
                      {symptom.triggers.map((trigger) => (
                        <span
                          key={trigger}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-1"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                  )}

                  {symptom.relievedBy && symptom.relievedBy.length > 0 && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Relieved by:</span>
                      {symptom.relievedBy.map((method) => (
                        <span
                          key={method}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-1"
                        >
                          {method}
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

      <SymptomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSymptom(null);
        }}
        symptom={selectedSymptom}
      />
    </div>
  );
}
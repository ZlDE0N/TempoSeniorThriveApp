import React from 'react';

interface VitalChartProps {
  vitals: string[];
}

export default function VitalChart({ vitals }: VitalChartProps) {
  return (
    <div className="relative h-64">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">
          Chart visualization will be implemented here for: {vitals.join(', ')}
        </p>
      </div>
    </div>
  );
}
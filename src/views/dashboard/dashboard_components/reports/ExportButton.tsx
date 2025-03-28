import React, { useState } from 'react';
import { Download, Loader } from 'lucide-react';
// import { saveAs } from 'file-saver';
// import { PDFExporter } from '../../integrations/data/PDFExporter';
import { useVitalsStore } from '@/store/dashboard_store/vitalsStore';
import { useMedicationStore } from '@/store/dashboard_store/medicationStore';
import { useActivityStore } from '@/store/dashboard_store/activityStore';
import { useIncidentStore } from '@/store/dashboard_store/incidentStore';

interface ExportButtonProps {
  type: 'vitals' | 'medications' | 'activities' | 'summary';
  dateRange: {
    start: string;
    end: string;
  };
}

export default function ExportButton({ type, dateRange }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { vitalsData } = useVitalsStore();
  const { medicationLogs, medications } = useMedicationStore();
  const { activities } = useActivityStore();
  const { incidents } = useIncidentStore();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      let blob: Blob;

      switch (type) {
        case 'vitals': {
          // Flatten vitals data
          const vitals = Object.entries(vitalsData).flatMap(([type, entries]) =>
            entries.map(entry => ({ ...entry, type }))
          ).filter(entry => 
            entry.timestamp >= dateRange.start && entry.timestamp <= dateRange.end
          );
          blob = await PDFExporter.generateVitalsReport(vitals, dateRange);
          break;
        }

        case 'medications': {
          const medLogs = medicationLogs
            .filter(log => log.timestamp >= dateRange.start && log.timestamp <= dateRange.end)
            .map(log => {
              const med = medications.find(m => m.id === log.medicationId);
              return {
                ...log,
                medication: med?.name,
                dosage: med?.dosage
              };
            });
          blob = await PDFExporter.generateMedicationReport(medLogs, dateRange);
          break;
        }

        case 'activities': {
          const filteredActivities = activities
            .filter(activity => 
              activity.timestamp >= dateRange.start && activity.timestamp <= dateRange.end
            );
          blob = await PDFExporter.generateActivityReport(filteredActivities, dateRange);
          break;
        }

        case 'summary': {
          // Get all data for comprehensive summary
          const vitals = Object.entries(vitalsData).flatMap(([type, entries]) =>
            entries.map(entry => ({ ...entry, type }))
          ).filter(entry => 
            entry.timestamp >= dateRange.start && entry.timestamp <= dateRange.end
          );

          const medLogs = medicationLogs
            .filter(log => log.timestamp >= dateRange.start && log.timestamp <= dateRange.end)
            .map(log => {
              const med = medications.find(m => m.id === log.medicationId);
              return {
                ...log,
                medication: med?.name,
                dosage: med?.dosage
              };
            });

          const filteredActivities = activities
            .filter(activity => 
              activity.timestamp >= dateRange.start && activity.timestamp <= dateRange.end
            );

          const filteredIncidents = incidents
            .filter(incident => 
              incident.timestamp >= dateRange.start && incident.timestamp <= dateRange.end
            );

          blob = await PDFExporter.generateHealthSummary({
            vitals,
            medications: medLogs,
            activities: filteredActivities,
            incidents: filteredIncidents
          }, dateRange);
          break;
        }
      }

      // Save the file
      saveAs(blob, `health-${type}-${dateRange.start}-to-${dateRange.end}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isExporting ? (
        <Loader className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      Export {type.charAt(0).toUpperCase() + type.slice(1)} PDF
    </button>
  );
}
import React, { useState } from 'react';
import { FileText, Download, TrendingUp, Calendar, Filter, Printer } from 'lucide-react';
import { useMedicationStore } from '../../store/medicationStore';
import { useVitalsStore } from '../../store/vitalsStore';
import { useActivityStore } from '../../store/activityStore';
import MedicationAdherenceReport from './MedicationAdherenceReport';
import VitalsTrendReport from './VitalsTrendReport';
import CareSummaryReport from './CareSummaryReport';
import BillingReport from './BillingReport';

type ReportType = 'medication' | 'vitals' | 'summary' | 'billing';

export default function ReportingDashboard() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('medication');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const reports = [
    { 
      id: 'medication',
      title: 'Medication Adherence',
      description: 'Track medication compliance and patterns',
      icon: FileText,
      component: MedicationAdherenceReport
    },
    {
      id: 'vitals',
      title: 'Vitals Trends',
      description: 'Analyze vital signs over time',
      icon: TrendingUp,
      component: VitalsTrendReport
    },
    {
      id: 'summary',
      title: 'Care Summary',
      description: 'Comprehensive care report for appointments',
      icon: Calendar,
      component: CareSummaryReport
    },
    {
      id: 'billing',
      title: 'Billing & Insurance',
      description: 'Export reports for insurance claims',
      icon: Download,
      component: BillingReport
    }
  ];

  const ReportComponent = reports.find(r => r.id === selectedReport)?.component || MedicationAdherenceReport;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Reports & Analytics</h2>
          <p className="text-sm text-gray-500">Generate detailed care reports and analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id as ReportType)}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedReport === report.id
                  ? 'bg-primary text-white shadow-lg scale-[1.02]'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-6 w-6 ${
                selectedReport === report.id ? 'text-white' : 'text-primary'
              }`} />
              <h3 className="mt-2 font-medium">{report.title}</h3>
              <p className={`mt-1 text-sm ${
                selectedReport === report.id ? 'text-white/80' : 'text-gray-500'
              }`}>
                {report.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow">
        <ReportComponent dateRange={dateRange} />
      </div>
    </div>
  );
}
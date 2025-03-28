import { VitalEntry } from '../../store/vitalsStore';
import { CaregiverShift } from '../../store/caregiverStore';

export function calculateMedicationAdherence(logs: { medicationId: string; taken: boolean }[]): number {
  if (logs.length === 0) return 0;
  const takenCount = logs.filter(log => log.taken).length;
  return (takenCount / logs.length) * 100;
}

export function calculateVitalsTrends(vitals: VitalEntry[]): {
  hasConcerningTrend: boolean;
  trendDirection?: 'increasing' | 'decreasing';
  severity?: 'warning' | 'critical';
} {
  if (vitals.length < 3) return { hasConcerningTrend: false };

  // For blood pressure, split systolic/diastolic
  const values = vitals.map(v => {
    if (v.value.includes('/')) {
      return parseInt(v.value.split('/')[0]); // Use systolic for trend
    }
    return parseFloat(v.value.toString());
  });

  // Calculate trend using linear regression
  const xValues = Array.from({ length: values.length }, (_, i) => i);
  const slope = calculateSlope(xValues, values);

  // Determine if trend is concerning based on slope and recent values
  const recentStatuses = vitals.slice(-3).map(v => v.status);
  const hasWarnings = recentStatuses.includes('warning');
  const hasCritical = recentStatuses.includes('critical');

  return {
    hasConcerningTrend: Math.abs(slope) > 5 || hasWarnings || hasCritical,
    trendDirection: slope > 0 ? 'increasing' : 'decreasing',
    severity: hasCritical ? 'critical' : hasWarnings ? 'warning' : undefined
  };
}

export function calculateCaregiverHours(shifts: Pick<CaregiverShift, 'startTime' | 'endTime'>[]): number {
  return shifts.reduce((total, shift) => {
    if (!shift.endTime) return total;
    const duration = new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime();
    return total + (duration / (1000 * 60 * 60));
  }, 0);
}

export function generateBillingTotals(
  shifts: Pick<CaregiverShift, 'startTime' | 'endTime' | 'caregiverId'>[],
  caregiver: { id: string; hourlyRate: number },
  includeOvertime = false
): {
  totalHours: number;
  totalAmount: number;
  regularHours: number;
  overtimeHours: number;
} {
  const caregiverShifts = shifts.filter(s => s.caregiverId === caregiver.id);
  const totalHours = calculateCaregiverHours(caregiverShifts);
  
  let regularHours = totalHours;
  let overtimeHours = 0;

  if (includeOvertime) {
    regularHours = Math.min(totalHours, 8);
    overtimeHours = Math.max(0, totalHours - 8);
  }

  const totalAmount = (regularHours * caregiver.hourlyRate) + 
    (overtimeHours * caregiver.hourlyRate * 1.5);

  return {
    totalHours,
    totalAmount,
    regularHours,
    overtimeHours
  };
}

// Helper function for linear regression
function calculateSlope(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

  return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
}
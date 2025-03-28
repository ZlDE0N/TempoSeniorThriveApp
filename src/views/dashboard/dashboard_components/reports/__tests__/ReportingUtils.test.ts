import { describe, test, expect } from 'vitest';
import { 
  calculateMedicationAdherence,
  calculateVitalsTrends,
  calculateCaregiverHours,
  generateBillingTotals
} from '../ReportingUtils';

describe('Medication Adherence Calculations', () => {
  test('should calculate correct adherence rate', () => {
    const mockLogs = [
      { medicationId: '1', taken: true },
      { medicationId: '1', taken: true },
      { medicationId: '1', taken: false },
      { medicationId: '1', taken: true }
    ];

    const result = calculateMedicationAdherence(mockLogs);
    expect(result).toBe(75); // 3 taken out of 4 = 75%
  });

  test('should handle empty logs', () => {
    const result = calculateMedicationAdherence([]);
    expect(result).toBe(0);
  });
});

describe('Vitals Trend Analysis', () => {
  test('should detect concerning trends', () => {
    const mockVitals = [
      { value: '120/80', timestamp: '2024-01-01', status: 'normal' },
      { value: '130/85', timestamp: '2024-01-02', status: 'normal' },
      { value: '140/90', timestamp: '2024-01-03', status: 'warning' }
    ];

    const result = calculateVitalsTrends(mockVitals);
    expect(result.hasConcerningTrend).toBe(true);
    expect(result.trendDirection).toBe('increasing');
  });
});

describe('Caregiver Hours Calculation', () => {
  test('should calculate total hours correctly', () => {
    const mockShifts = [
      {
        startTime: '2024-01-01T09:00:00Z',
        endTime: '2024-01-01T17:00:00Z'
      },
      {
        startTime: '2024-01-02T09:00:00Z',
        endTime: '2024-01-02T13:00:00Z'
      }
    ];

    const result = calculateCaregiverHours(mockShifts);
    expect(result).toBe(12); // 8 hours + 4 hours = 12 hours
  });

  test('should handle shifts crossing midnight', () => {
    const mockShifts = [
      {
        startTime: '2024-01-01T22:00:00Z',
        endTime: '2024-01-02T06:00:00Z'
      }
    ];

    const result = calculateCaregiverHours(mockShifts);
    expect(result).toBe(8);
  });
});

describe('Billing Calculations', () => {
  test('should calculate correct billing totals', () => {
    const mockShifts = [
      {
        caregiverId: '1',
        startTime: '2024-01-01T09:00:00Z',
        endTime: '2024-01-01T17:00:00Z'
      }
    ];

    const mockCaregiver = {
      id: '1',
      hourlyRate: 25
    };

    const result = generateBillingTotals(mockShifts, mockCaregiver);
    expect(result.totalHours).toBe(8);
    expect(result.totalAmount).toBe(200); // 8 hours * $25/hour
  });

  test('should handle overtime rates', () => {
    const mockShifts = [
      {
        caregiverId: '1',
        startTime: '2024-01-01T09:00:00Z',
        endTime: '2024-01-01T21:00:00Z' // 12 hour shift
      }
    ];

    const mockCaregiver = {
      id: '1',
      hourlyRate: 25
    };

    const result = generateBillingTotals(mockShifts, mockCaregiver, true);
    // First 8 hours at regular rate, 4 hours at 1.5x
    expect(result.totalAmount).toBe(350); // (8 * 25) + (4 * 37.50)
  });
});
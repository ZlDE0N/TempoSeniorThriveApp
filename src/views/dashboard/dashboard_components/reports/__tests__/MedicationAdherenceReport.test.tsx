import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MedicationAdherenceReport from '../MedicationAdherenceReport';
import { useMedicationStore } from '../../../store/medicationStore';

// Mock the store
vi.mock('../../../store/medicationStore', () => ({
  useMedicationStore: vi.fn()
}));

describe('MedicationAdherenceReport', () => {
  const mockMedications = [
    {
      id: '1',
      name: 'Test Med 1',
      dosage: '10mg',
      timeSlots: ['09:00']
    }
  ];

  const mockLogs = [
    {
      id: '1',
      medicationId: '1',
      timestamp: '2024-01-01T09:00:00Z',
      taken: true
    },
    {
      id: '2',
      medicationId: '1',
      timestamp: '2024-01-02T09:00:00Z',
      taken: false
    }
  ];

  beforeEach(() => {
    (useMedicationStore as any).mockReturnValue({
      medications: mockMedications,
      medicationLogs: mockLogs
    });
  });

  test('renders adherence statistics correctly', () => {
    render(
      <MedicationAdherenceReport 
        dateRange={{ 
          start: '2024-01-01', 
          end: '2024-01-31' 
        }} 
      />
    );

    // Check if medication name is displayed
    expect(screen.getByText('Test Med 1')).toBeInTheDocument();

    // Check if adherence rate is calculated and displayed correctly
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  test('filters logs by date range', () => {
    render(
      <MedicationAdherenceReport 
        dateRange={{ 
          start: '2024-01-02', 
          end: '2024-01-02' 
        }} 
      />
    );

    // Should only show one log, with 0% adherence
    expect(screen.getByText('0.0%')).toBeInTheDocument();
  });
});
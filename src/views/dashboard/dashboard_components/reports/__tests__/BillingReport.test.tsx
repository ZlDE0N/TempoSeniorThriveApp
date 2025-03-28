import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BillingReport from '../BillingReport';
import { useCaregiverStore } from '../../../store/caregiverStore';

// Mock the store
vi.mock('../../../store/caregiverStore', () => ({
  useCaregiverStore: vi.fn()
}));

describe('BillingReport', () => {
  const mockCaregivers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      hourlyRate: 25
    }
  ];

  const mockShifts = [
    {
      id: '1',
      caregiverId: '1',
      startTime: '2024-01-01T09:00:00Z',
      endTime: '2024-01-01T17:00:00Z',
      status: 'completed'
    }
  ];

  beforeEach(() => {
    (useCaregiverStore as any).mockReturnValue({
      caregivers: mockCaregivers,
      shifts: mockShifts
    });
  });

  test('calculates total hours and amount correctly', () => {
    render(
      <BillingReport 
        dateRange={{ 
          start: '2024-01-01', 
          end: '2024-01-31' 
        }} 
      />
    );

    // 8 hours at $25/hour = $200
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('8.0')).toBeInTheDocument();
  });

  test('filters shifts by date range', () => {
    render(
      <BillingReport 
        dateRange={{ 
          start: '2024-02-01', 
          end: '2024-02-28' 
        }} 
      />
    );

    // Should show zero totals as no shifts in range
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });
});
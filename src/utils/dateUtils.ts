import { format, parseISO, isToday as isDateToday } from 'date-fns';

// Format time in 12-hour format (e.g., "9:30 AM")
export function formatTime(date: string | Date | undefined): string {
  if (!date) return 'Not set';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'h:mm a');
  } catch (error) {
    return 'Invalid date';
  }
}

// Format date only (e.g., "Mar 15")
export function formatDate(date: string | Date | undefined): string {
  if (!date) return 'Not set';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'MMM d');
  } catch (error) {
    return 'Invalid date';
  }
}

// Format date and time (e.g., "March 15, 2024 at 9:30 AM")
export function formatDateTime(date: string | Date | undefined): string {
  if (!date) return 'Not set';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'MMMM d, yyyy \'at\' h:mm a');
  } catch (error) {
    return 'Invalid date';
  }
}

// Get current date-time in ISO format
export function getCurrentDateTime(): string {
  return new Date().toISOString();
}

// Check if a date is today
export function isToday(date: string | Date | undefined): boolean {
  if (!date) return false;
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isDateToday(parsedDate);
  } catch (error) {
    return false;
  }
}

// Convert time string to ISO datetime
export function timeToDateTime(timeStr: string, dateStr?: string): string {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = dateStr ? new Date(dateStr) : new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

// Get time string from ISO datetime
export function getTimeFromDateTime(dateTime: string | undefined): string {
  if (!dateTime) return '';
  try {
    const date = parseISO(dateTime);
    return format(date, 'HH:mm');
  } catch (error) {
    return '';
  }
}

// Get formatted duration (e.g., "2h 30m" or "45m")
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
}
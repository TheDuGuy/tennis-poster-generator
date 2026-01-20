import { format, parse } from 'date-fns';

/**
 * Format a date string for display
 */
export function formatEventDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d');
  } catch {
    return dateString;
  }
}

/**
 * Format a date string with time
 */
export function formatEventDateTime(dateString: string, time?: string): string {
  try {
    const date = new Date(dateString);
    const dateStr = format(date, 'EEE, MMM d');
    return time ? `${dateStr} at ${time}` : dateStr;
  } catch {
    return dateString;
  }
}

/**
 * Get month name from date
 */
export function getMonthYear(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM yyyy');
  } catch {
    return '';
  }
}

/**
 * Parse date input to ISO string
 */
export function parseDateToISO(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch {
    return dateString;
  }
}

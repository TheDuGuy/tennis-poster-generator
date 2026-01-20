import { z } from 'zod';

// Single event entry within a day
export const dayEventSchema = z.object({
  time: z.string().optional(),
  title: z.string(),
  type: z.enum(['tournament', 'social', 'meeting', 'training', 'maintenance', 'other']).optional(),
});

// A single day in the calendar
export const calendarDaySchema = z.object({
  date: z.number(), // Day of month (1-31)
  events: z.array(dayEventSchema),
});

// Note/info item for the side panel
export const noteItemSchema = z.object({
  title: z.string(),
  content: z.string(),
});

// Full calendar grid data
export const eventsCalendarGridSchema = z.object({
  year: z.number(),
  month: z.number(), // 1-12
  title: z.string().default("WHAT'S ON"),
  clubName: z.string().default("Tennis Club"),
  clubWebsite: z.string().optional(),
  headerInfo: z.string().optional(), // e.g., "Pricing & membership info"
  days: z.array(calendarDaySchema),
  notes: z.array(noteItemSchema),
  committeeInfo: z.string().optional(),
  captainsInfo: z.string().optional(),
  qrCodeUrl: z.string().optional(),
});

export type DayEvent = z.infer<typeof dayEventSchema>;
export type CalendarDay = z.infer<typeof calendarDaySchema>;
export type NoteItem = z.infer<typeof noteItemSchema>;
export type EventsCalendarGridData = z.infer<typeof eventsCalendarGridSchema>;

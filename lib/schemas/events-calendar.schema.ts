import { z } from 'zod';

export const eventTypeSchema = z.enum(['social', 'match', 'league', 'tournament']);

export const eventSchema = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string().optional(),
  title: z.string().min(1, 'Event title is required'),
  description: z.string().optional(),
  type: eventTypeSchema,
});

export const eventsCalendarSchema = z.object({
  month: z.string().min(1, 'Month is required'),
  clubWebsite: z.string().url().optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  events: z.array(eventSchema).min(1, 'At least one event is required').max(10, 'Maximum 10 events allowed'),
});

export type EventType = z.infer<typeof eventTypeSchema>;
export type Event = z.infer<typeof eventSchema>;
export type EventsCalendarData = z.infer<typeof eventsCalendarSchema>;

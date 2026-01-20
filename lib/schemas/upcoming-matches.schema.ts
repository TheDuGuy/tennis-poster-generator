import { z } from 'zod';

export const upcomingMatchesSchema = z.object({
  roundName: z.string().min(1, 'Round name is required'),
  numberOfMatches: z.number().min(4).max(15),
  deadlineDate: z.string().optional(),
  whatsappGroup: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type UpcomingMatchesData = z.infer<typeof upcomingMatchesSchema>;

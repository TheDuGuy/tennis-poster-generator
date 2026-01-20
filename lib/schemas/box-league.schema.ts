import { z } from 'zod';

export const boxLeagueSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().optional(),
  benefits: z.array(z.string().min(1)).min(1).max(4),
  signupUrl: z.string().url().optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type BoxLeagueData = z.infer<typeof boxLeagueSchema>;

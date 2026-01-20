import { z } from 'zod';

export const resultsGridSchema = z.object({
  seasonName: z.string().min(1, 'Season name is required'),
  groupNames: z.array(z.string().min(1)).min(1).max(3),
  rowsPerGroup: z.number().min(4).max(12),
  leagueTableUrl: z.string().url().optional().or(z.literal('')),
  instructions: z.string().optional(),
});

export type ResultsGridData = z.infer<typeof resultsGridSchema>;

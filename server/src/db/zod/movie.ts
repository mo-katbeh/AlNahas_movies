import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1).max(255),
  year: z.number().min(1888).max(new Date().getFullYear()),
  posterUrl: z.string().url(),

});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;

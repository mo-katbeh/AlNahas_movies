import { z, uuid } from 'zod';

export const createMovieSchema = z.object({
  id : uuid(),
  title: z.string().min(3).max(100),
  genre: z.string().min(3).max(100),
  releaseYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  posterUrl: z.url(),
  description: z.string().min(10).max(2000),
}).partial({posterUrl: true, description: true});

export type MovieInput = z.infer<typeof createMovieSchema>;

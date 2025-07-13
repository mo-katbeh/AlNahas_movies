import { z } from 'zod';

export const assignMovieToCategorySchema = z.object({
  movieId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export const removeMovieFromCategorySchema = assignMovieToCategorySchema;

export type MovieCategoryInput = z.infer<typeof assignMovieToCategorySchema>;

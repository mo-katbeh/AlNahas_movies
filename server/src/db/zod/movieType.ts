import { z, uuid } from 'zod';
export const movieType = z.object({
    id: z.never(),
    title: z.string(),
    genre: z.string().nullable(),
    description: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    is_deleted: z.boolean().nullable(),
    release_year: z.number(),
    poster_url: z.string().nullable()
})
export const createMovieSchema = z.object({
  title: z.string().min(3).max(100),
  genre: z.string().min(3).max(100),
  releaseYear: z.number().min(1900).max(new Date().getFullYear()),
  posterUrl: z.url().optional(),
  description: z.string().min(10).max(2000).optional(),
})
export const updateMovieSchema = z.object({
  id: z.coerce.bigint(),
  title: z.string().min(3).max(100).optional(),
  genre: z.string().min(3).max(100).optional(),
  releaseYear: z.coerce.number().min(1900).max(new Date().getFullYear()).optional(),
  posterUrl: z.url().optional(),
  description: z.string().min(10).max(2000).optional(),
})
export const deleteMovieSchema = z.object({
    id: z.coerce.bigint(),

})

export type MovieType = z.infer<typeof movieType>
export type MovieInput = z.infer<typeof createMovieSchema>;

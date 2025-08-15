import { z } from 'zod';

export const watchlistStatusEnum = z.enum(['TO_WATCH', 'WATCHED']);

export const addToWatchlistSchema = z.object({
  userId: z.string().uuid(),
  movieId: z.string().uuid(),
  status: watchlistStatusEnum,
  rating: z.coerce.number().min(1).max(5)
  .catch()
  .optional(),
  review: z.string().max(1000).optional(),
});

export const updateWatchlistItemSchema = z.object({
  id: z.string().uuid(),
  status: watchlistStatusEnum.optional(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().max(1000).optional(),
});

export const deleteWatchlistItemSchema = z.object({
  id: z.string().uuid(),
});

export type WatchlistInput = z.infer<typeof addToWatchlistSchema>;

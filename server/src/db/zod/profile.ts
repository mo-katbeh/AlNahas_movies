import { z } from 'zod';

export const createProfileSchema = z.object({
  bio: z.string().min(1).max(255).or(z.literal("")).optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

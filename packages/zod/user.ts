import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
});

export const createUserSchema = userSchema;

export type UserInput = z.infer<typeof userSchema>;

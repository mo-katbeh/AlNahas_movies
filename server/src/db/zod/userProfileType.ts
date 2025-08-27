import { uuid, z } from 'zod';

export const createUserProfileSchema = z.object({
    id: uuid(),
    userId: uuid(),
    birthDate: z.date().min(new Date().getFullYear() - 12),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.literal(["male", "female"]),
    phoneNumber: z.coerce.number().min(6)
}).partial({ firstName:true, lastName:true, birthDate: true, gender: true, phoneNumber: true });

export type CreateUserProfileInput = z.infer<typeof createUserProfileSchema>;

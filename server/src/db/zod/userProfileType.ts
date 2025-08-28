import { uuid, z } from 'zod';

export const createUserProfileSchema = z.object({
    userId: uuid(),
    birthDate: z.iso.date().max(new Date().getFullYear() - 12),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.literal(["male", "female"]),
    phoneNumber: z.coerce.string().min(6)
}).partial({ firstName:true, lastName:true, birthDate: true, phoneNumber: true });

export const updateUserProfileSchema = z.object({
    id: uuid(),
    birthDate: z.iso.date().max(new Date().getFullYear() - 12),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    phoneNumber: z.coerce.string().min(6)
}).partial({firstName:true, lastName:true,  phoneNumber: true, birthDate: true})

export const deleteUserProfileSchema = z.object({
    id: uuid(),
})


export type CreateUserProfileInput = z.infer<typeof createUserProfileSchema>;

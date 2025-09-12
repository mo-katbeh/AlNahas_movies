import { string, uuid, z } from 'zod';

const genderEnum = ["male", "female"] as const
export const createUserProfileSchema = z.object({
    userId: z.number(),
    birthDate: z.iso.date().max(new Date().getFullYear() - 12),
    firstName: z.string().min(3, {error: 'Name must be at least 3 characters. '}),
    lastName: z.string().min(3),
    gender: z.enum(genderEnum),
    phoneNumber: z.string().min(6)
}).partial({ firstName:true, lastName:true, birthDate: true, phoneNumber: true });
export const updateUserProfileSchema = z.object({
    id: z.coerce.bigint(),
    birthDate: z.iso.date().max(new Date().getFullYear() - 12),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    phoneNumber: z.coerce.string().min(6)
}).partial({firstName:true, lastName:true,  phoneNumber: true, birthDate: true})

export const deleteUserProfileSchema = z.object({
    id: z.coerce.bigint(),
})


export type CreateUserProfileInput = z.infer<typeof createUserProfileSchema>;

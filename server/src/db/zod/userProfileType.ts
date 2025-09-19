import { date, string, uuid, z } from 'zod';

export const createUserProfileSchema = z.object({
    // userId: z.coerce.bigint(),
    birthDate: z.iso.date().refine((date)=>{
        const max = new Date();
        max.setFullYear(max.getFullYear() - 12);
        console.log("date", date)
        console.log("max", max) 
        return date <= max.toISOString().split("T")[0];
    }, { message: "You are still young to watch movies" }).optional(),
    firstName: z.union([z.string().min(3, {error: 'Name must be at least 3 characters. '}), z.literal("").optional()]),
    lastName: z.string().min(3, {error: 'Name must be at least 3 characters. '}).optional(),
    gender: z.enum(["Male", "Female"]),
    phoneNumber: z.string().optional()
});
export type CreateUserProfileInput = z.infer<typeof createUserProfileSchema>;
export type CreateUserProfileInputRaw = z.input<typeof createUserProfileSchema>;
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



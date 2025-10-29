import {  z } from 'zod';

export const createUserProfileSchema = z.object({
    // userId: z.coerce.bigint(),
    birthDate:z.union([z.iso.date().refine((date)=>{
        const max = new Date();
        max.setFullYear(max.getFullYear() - 12);
        console.log("date", date)
        console.log("max", max) 
        return date <= max.toISOString().split("T")[0];
    }, { message: "You are still young to watch movies" }),z.literal("").optional()]) ,
    
    firstName: z.union([z.string().min(3, {message: 'Name must be at least 3 characters. '}), z.literal("").optional()]),
    lastName: z.union([z.string().min(3, {message: 'Name must be at least 3 characters. '}), z.literal("").optional()]),
    gender: z.enum(["Male", "Female"]),
    phoneNumber: z.union([z.string().min(6, {error: "Number must be at least 6 characters."}), z.literal("").optional()])
});
export type CreateUserProfileInput = z.infer<typeof createUserProfileSchema>;
export type CreateUserProfileInputRaw = z.input<typeof createUserProfileSchema>;
export const updateUserProfileSchema = z.object({
    id: z.coerce.bigint(),
    birthDate:z.union([z.iso.date().refine((date)=>{
        const max = new Date();
        max.setFullYear(max.getFullYear() - 12);
        console.log("date", date)
        console.log("max", max) 
        return date <= max.toISOString().split("T")[0];
    }, { message: "You are still young to watch movies" }),z.literal("").optional()]) ,
    
    firstName: z.union([z.string().min(3, {message: 'Name must be at least 3 characters. '}), z.literal("").optional()]),
    lastName: z.union([z.string().min(3, {message: 'Name must be at least 3 characters. '}), z.literal("").optional()]),
    gender: z.enum(["Male", "Female"]),
    phoneNumber: z.string().optional()
})
export const deleteUserProfileSchema = z.object({
    id: z.coerce.bigint(),
})



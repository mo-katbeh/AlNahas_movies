import {  z } from "zod"

export const createUserSchema = z.object({
    id: z.bigint(),
    role: z.enum(['user', 'admin']).default('user'),
    name: z.string().min(3, {error: "Name must be more than 3 characters"}),
    email: z.email(),
    emailVerified: z.boolean().default(false),
    image: z.url(),
}).omit({id: true})
export const delelteUserSchema = z.object({
    id: z.coerce.bigint(),
})

export type UserInput = z.infer<typeof createUserSchema>
import {z} from "zod"

export const createUser =  z.object({
    id: z.bigint(),
    role: z.enum(['user', 'admin']).default('user'),
    name: z.string().min(3, {error: "Name must be more than 3 characters"}),
    email: z.email(),
    emailVerified: z.boolean().default(false),
    image: z.url(),
    
})

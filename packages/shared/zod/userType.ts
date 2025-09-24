import { uuid, z } from "zod"
const userEnum = ["user", "admin"] as const
export const createUserSchema = z.object({
    id: z.coerce.bigint(),
    role: z.enum(userEnum).default("user"),
    name: z.string().min(3),
    email: z.email(),
}).omit({id: true})
export const delelteUserSchema = z.object({
    id: z.coerce.bigint(),
})

export type UserInput = z.infer<typeof createUserSchema>
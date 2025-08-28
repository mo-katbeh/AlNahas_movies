import { uuid, z } from "zod"

export const createUserSchema = z.object({
    id: z.uuid(),
    role: z.literal(["user", "admin"]).default("user"),
    email: z.email(),
}).omit({id: true})
export const delelteUserSchema = z.object({
    id: z.uuid(),
})

export type UserInput = z.infer<typeof createUserSchema>
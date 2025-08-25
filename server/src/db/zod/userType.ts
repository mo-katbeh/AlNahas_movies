import { uuid, z } from "zod"

export const createUserSchema = z.object({
    id: uuid(),
    role: z.literal(["user", "admin"]).default("user"),
    email: z.email(),
})

export type UserInput = z.infer<typeof createUserSchema>
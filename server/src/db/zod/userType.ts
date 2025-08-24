import { uuid, z } from "zod"

const userRole = ["user", "admin"] as const
export const user = z.object({
    id: uuid(),
    role: z.enum(userRole),
    firstName: z.coerce.string().min(3).trim(),
    lastName: z.coerce.string().min(3).trim(),
    email: z.email(),
    birthDate: z.date().max(new Date().getFullYear() - 12), // find solution

})

export type userType = z.infer<typeof user>
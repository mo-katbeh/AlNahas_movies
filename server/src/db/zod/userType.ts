import { uuid, z } from "zod"

const userRole = ["user", "admin"] as const
export const user = z.object({
    id: uuid(),
    role: z.enum(userRole),
    // firstName: z.coerce.string().min(3).trim(),
    // lastName: z.coerce.string().min(3).trim(),
    email: z.email().nonoptional(),


})

export type userType = z.infer<typeof user>
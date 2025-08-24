import { z } from "zod"

export const genre = z.object({
    id: z.uuid(),
    name: z.coerce.string().min(3)
})

export type genreType = z.infer<typeof genre>;



import { z } from "zod"

export const watchListItemSchema =  z.object({
    // id: z.coerce.bigint(),
    userId: z.coerce.string(),
    movieId: z.coerce.bigint(),
    // status: z.literal(["planned", "watching", "completed"]).default("planned")
})

export type WatchListItemInput = z.Infer<typeof watchListItemSchema>
import { uuid, z } from "zod"

export const watchListItemSchema =  z.object({
    id: uuid(),
    userId: uuid(),
    movieId: uuid(),
    status: z.literal(["planned", "watching", "completed"]).default("planned")
})

export type WatchListItemInput = z.Infer<typeof watchListItemSchema>
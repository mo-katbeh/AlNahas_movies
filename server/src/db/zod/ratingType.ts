import {uuid, z } from "zod"

export const createRatingSchema = z.object({
    id: z.coerce.bigint(),
    userId: uuid(),
    movieId: uuid(),
    rating: z.coerce.number().gte(0.1).lte(5),
    review: z.string().min(3)

}).partial({ rating: true, review: true})

export type RatingInput = z.infer<typeof createRatingSchema>
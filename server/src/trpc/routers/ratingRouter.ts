import { publicProcedure, router } from "../init";

export const ratingRouter = router({
    fetchRatingsOfMovie: publicProcedure
        .query(({ctx})=>{
            ctx.db
            .selectFrom('ratings')
            .selectAll()
            .execute()
        })
})
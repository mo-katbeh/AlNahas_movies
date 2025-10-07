import { sql } from "kysely";
import { publicProcedure, router } from "../init";
import { watchListItemSchema } from "../../../../packages/shared/zod/watchListItemType";

export const watchListItemRouter = router({
    addToWatchlist: publicProcedure
        .input(watchListItemSchema)
        .mutation(async({ctx, input})=>{
            try{await ctx.db
                .insertInto('watchlist_items')
                .values({
                    user_id: input.userId,
                    movie_id: input.movieId
                })
                .returningAll()
                .execute()
            }catch(error){
                console.log("field add movie", error)
                throw new Error()
            }

                
                
        }),
    getWatcListItem: publicProcedure
     .query(async({ctx})=>{
        try{
            
            const resultWatchList = await ctx.db
                .selectFrom('watchlist_items as wl')
            
                .innerJoin('movies as m', 'm.id', 'wl.movie_id')
                .innerJoin('ratings as r', 'r.movie_id', 'm.id')
                .innerJoin('users as u', 'u.id', 'wl.user_id')
                .leftJoin('user_profile as up', 'up.user_id', 'u.id')
                .select([
                    sql<string>`concat(up.first_name,' ',up.last_name)`.as('full_name'),
                    'm.title as movie_title',
                    'r.rating as rating',
                    'wl.status as status',

                ])
                .execute()
                console.log(resultWatchList)
        }
        catch(err){
            console.log("Select error")
        }
     })
})
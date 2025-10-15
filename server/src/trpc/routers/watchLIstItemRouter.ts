import { sql } from "kysely";
import { protectedProcedure, publicProcedure, router } from "../init";
import { watchListItemSchema } from "../../../../packages/shared/zod/watchListItemType";
import {z}from 'zod'
import db from "../../db/kysely/client";

export const watchListItemRouter = router({
    removeMovie: protectedProcedure
        .input(z.object({movieId: z.coerce.bigint()}))
        .mutation(async({ctx,input})=>{
            try{
                await ctx.db
            .deleteFrom('watchlist_items')
            .where('watchlist_items.movie_id', '=', input.movieId)
            .execute()
        }catch(err){
            console.log("feild remove movie", err)
            // throw new Error(err)
        }
        }),
    getWatchlist: protectedProcedure
    .input(z.object({userId: z.coerce.string(), search: z.string()})
    )    
    .query(async({ctx,input})=>{
        const watclist = await ctx.db
        .selectFrom('watchlist_items as wl')
        .selectAll()
        .innerJoin('movies as m', 'm.id', 'wl.movie_id')
        .select(['m.release_year', 'm.poster_url', 'm.title', 'm.genre'])
        .$if(!!input.search, (qb)=>
        qb.where('m.title', 'ilike', `%${input.search}%`))
        .execute()
        // const watclist = await ctx.db
        // .selectFrom('watchlist_items as wl')
        // .selectAll()
        // .innerJoin('movies as m', 'm.id', 'wl.movie_id')
        // .select(['m.release_year', 'm.poster_url', 'm.title', 'm.genre'])
        // .execute()
        
        return watclist

    }),
    addToWatchlist: protectedProcedure
        .input(watchListItemSchema)
        .mutation(async({ctx, input})=>{
            try{
              await ctx.db
                .insertInto('watchlist_items')
                .values({
                    user_id: input.userId,
                    movie_id: input.movieId
                })
                .returningAll()
                .execute()
                
                const movieTitle = ctx.db
                .selectFrom('movies')
                .select('title')
                .where('movies.id', '=', input.movieId)
                .execute()
                return movieTitle
            }catch(error){
                // console.log("field add movie", error)
               
                throw new Error("Movie already added to your watchlist")
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
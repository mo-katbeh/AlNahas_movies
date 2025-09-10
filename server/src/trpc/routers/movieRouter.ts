import { createMovieSchema, deleteMovieSchema, updateMovieSchema } from "../../db/zod/movieType";
import { adminPocedure, router } from "../init";
import { z } from "zod"
export const movieRouter = router({
    // infinitMovies: adminPocedure
    //     .input(z.object({
    //         limit: z.number(),
    //         Cursor: z.number()
    //     }))
    //     .query(async({ctx, input})=>{
    //         const {limit, Cursor} = input
    //         const movies = await ctx.db
    //             .selectFrom('movies')
    //             .selectAll()
    //             .limit(Cursor)
    //             .offset((limit - 1) * Cursor)
    //             .execute()
    //         return movies;
    //     })
    infiniteMovies: adminPocedure
        .input(z.object({
            limit: z.number().min(1).max(30),
            cursor: z.string().nullish()}))
        .query(async({ctx, input})=>{
            const {limit, cursor} = input
            const cursorBigInt = cursor ? BigInt(cursor): null; 
            let q = await ctx.db
                .selectFrom('movies')
                .selectAll()
                .orderBy('id', 'asc')
                .limit(limit + 1)
            if(cursorBigInt){
                q = await q.where('id', '>', cursorBigInt)
            }
            const movies = await q.execute() 
            let nextCursor : string | undefined = undefined
            if(movies.length > limit ){
                const newMovies = movies.pop()
                nextCursor = newMovies?.id.toString()
            }
            return{
                movies,
                nextCursor
            }
        })
    // infinitMovies: adminPocedure
    //     .input( z.object({
    //         limit: z.number().min(1).max(30),
    //         cursor: z.string().nullish(),

    //     }) )
    //     .query(async({ ctx, input})=>{
    //         const {limit, cursor} = input
    //         const cursorBigInt = cursor ? BigInt(cursor) : null;
    //         let query = await ctx.db
    //             .selectFrom('movies')
    //             .selectAll()
    //             .orderBy('id', 'asc')
    //             .limit(limit+1)
    //         if(cursorBigInt){
    //             query = query.where('id', '>', cursorBigInt)
    //         }
    //         const items = await query.execute();

    //         let nextCursor: string | undefined = undefined;
    //     if (items.length > limit) {
    //         const nextItem = items.pop(); 
    //         nextCursor = nextItem?.id.toString(); 
    //     }
    //     return{
    //         items,
    //         nextCursor
    //     }
    //     })
    ,
    fetchMovies: adminPocedure
        .input(z.object({
            page: z.number(),
            pageSize: z.number()
        }))
        .query(async({ ctx, input })=>{
            const {page, pageSize}= input;
            const movies = await ctx.db
                .selectFrom('movies')
                .selectAll()
                .limit(pageSize)
                .offset((page -1)* pageSize)
                .execute() 
            return movies
        }),
    createmovie: adminPocedure
        .input( createMovieSchema )
        .mutation(async({ ctx, input })=>{
            try{
            const movie = await ctx.db.transaction().execute(async (trx)=>{
                await trx
                    .insertInto('movies')
                    .values({
                    title: input.title,
                    genre: input.genre,
                    release_year: input.releaseYear,
                    poster_url: input.posterUrl,
                    description: input.description
                    })
                    .returning('title')
                    .executeTakeFirstOrThrow()
            })
            console.log("Movie :", movie)
                return movie;
            }
            catch(err){
                console.log("Failed creating user profile's")
            }

        }),
    updateMovie: adminPocedure
        .input(updateMovieSchema)
        .mutation(async({ ctx, input })=>{
            try{
                await ctx.db
                .updateTable("movies")
                .set( { 
                    title: input.title,
                    genre: input.genre,
                    release_year: input.releaseYear,
                    poster_url: input.posterUrl,
                    description: input.description
                })
                .where('movies.id', "=", input.id)
                .execute()
            const updateMovieResult =  await ctx.db
                .selectFrom("movies")
                .selectAll()
                .where('movies.id', '=', input.id)
                .execute()
            console.log("New Movie info:", updateMovieResult)
            return updateMovieResult;
            }
            catch(err){
                console.log("Updating user profile failed", err)
            }
        })
        ,
    deleteMovie: adminPocedure
        .input( deleteMovieSchema )
        .mutation( async({ctx, input})=>{
            try{
                const resultOfDelete = await ctx.db
                    .deleteFrom("movies")
                    .where('movies.id', '=', input.id)
                    .executeTakeFirst()
                console.log("nummber of rows deleted: ", resultOfDelete.numDeletedRows)

            }
            catch(err){
                console.log("Proccess of deleting failed", err)
            }
        })
})
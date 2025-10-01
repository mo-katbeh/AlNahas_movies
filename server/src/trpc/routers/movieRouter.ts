import { sql } from "kysely";
import { createMovieSchema, deleteMovieSchema, updateMovieSchema } from "../../../../packages/shared/zod/movieType";
import { adminPocedure, protectedProcedure, publicProcedure, router } from "../init";
import { bigint, number, z } from "zod"
//carousel
export const movieRouter = router({
    infiniteMovies: adminPocedure
        .input(z.object({
            limit: z.number().min(1).max(30),
            cursor: z.string().nullish()}))
        .query(async({ctx, input})=>{
            try{
            const {limit, cursor} = input
            const cursorBigInt = cursor ? BigInt(cursor): null; 
            let q = ctx.db
                .selectFrom('movies')
                .selectAll()
                .orderBy('id', 'asc')
                .limit(limit + 1)
            if(cursorBigInt){
                q = q.where('id', '>', cursorBigInt)
            }
            const movies = await q.execute() 
            let nextCursor : string | undefined = undefined
            if(movies.length > limit ){
                const newMovies = movies.pop()
                nextCursor = newMovies?.id.toString()
            }
            const moviesWithRatings  = await ctx.db
                .selectFrom('movies')
                .leftJoin('ratings as r', 'r.movie_id', 'movies.id')
                .selectAll('movies')
                .select(()=> [
                    // sql<number[]>`coalesce(array_agg(r.rating), '{}')`.as('movie_ratings'),
                    sql<number>`coalesce(avg(r.rating), 0)`.as('avg_ratings')
                ])
                .groupBy('movies.id')
           
                .execute()
            return{
                movies,
                nextCursor,
                moviesWithRatings

            }}
            catch(err){
                console.log("feild", err)
            }
        }),
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
    getMovies: publicProcedure
            .query(async({ctx})=>{
             const movies = await ctx.db
                .selectFrom('movies')
                .selectAll()
                .execute()
            return movies
            }),
    createmovie: protectedProcedure
        .input( createMovieSchema )
        .mutation(async({ ctx, input })=>{
            // try{
            // const movie = await ctx.db.transaction().execute(async (trx)=>{
            //     return trx
            //         .insertInto('movies')
            //         .values({
            //         title: input.title,
            //         genre: input.genre,
            //         release_year: input.releaseYear,
            //         poster_url: input.posterUrl,
            //         description: input.description
            //         })
            //         .returning('title')
            //         .executeTakeFirstOrThrow()
            // })
            // console.log("Movie :", movie)
            //     return movie;
            // }
            // catch(err){
            //     console.log("Failed creating user profile's")
            // }
             try{
            const movie = ctx.db
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
        }),
})
import { createMovieSchema, deleteMovieSchema, updateMovieSchema } from "../../db/zod/movieType";
import { adminPocedure, publicProcedure, router } from "../init";

export const movieRouter = router({
    createmovie: adminPocedure
        .input( createMovieSchema )
        .mutation(async({ ctx, input })=>{
            try{
            await  ctx.db
                .insertInto('movies')
                .values({
                title: input.title,
                genre: input.genre,
                release_year: input.releaseYear,
                poster_url: input.posterUrl,
                description: input.description
                })
                .execute()
            const creataeMovie = await ctx.db
                .selectFrom('movies')
                .selectAll()
                .where('movies.title', '=', input.title)
                .execute()
                console.log("Movie :", creataeMovie)
                return creataeMovie;
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
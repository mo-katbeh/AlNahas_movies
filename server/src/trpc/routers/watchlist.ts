// server/trpc/routers/watchlist.ts
import { publicProcedure, router } from '../init';
import { getMovies } from '../../db/kysely/queries/watchlist'; // from your kysely logic
// import {  } from '../../db/zod/movie'; // zod schema

console.log('🧪 getMovies is:', getMovies);
export const watchlistRouter = router({
  getAll: publicProcedure
    .query(async () => {  
      try{
        const movies = await getMovies();
        console.log("DB is ", movies)
      return movies
      }
      catch(err){
        // console.error('TRPC getAll error:', err);
        // throw new Error('Failed to fetch movies');
      }
      
    }),
});

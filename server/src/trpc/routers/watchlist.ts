// server/trpc/routers/watchlist.ts
import { publicProcedure, router } from '../init';
import { getMovies, getMoviesWithCategories } from '../../db/kysely/queries/watchlist'; 
import { z } from 'zod';

export const watchlistRouter = router({
  getAll: publicProcedure
    // .input( z.object({ userId: z.string()}))
    .query(async () => {  
      try{
        const movies = await getMoviesWithCategories();
      return movies 
      }
      catch(err){
        console.error('TRPC getAll error:', err);
        throw new Error('Failed to fetch movies');
      }
      
    }),
});

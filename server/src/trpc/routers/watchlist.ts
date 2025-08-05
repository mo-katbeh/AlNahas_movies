// server/trpc/routers/watchlist.ts
import { publicProcedure, router } from '../init';
import { getMovies, getMoviesWithCategories } from '../../db/kysely/queries/watchlist'; 

export const watchlistRouter = router({
  getAll: publicProcedure
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

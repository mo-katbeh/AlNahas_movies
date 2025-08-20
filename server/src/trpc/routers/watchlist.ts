// server/trpc/routers/watchlist.ts
// import { publicProcedure, router } from '../init';
// import { getWatchlistForUser } from '../../db/kysely/queries/watchlist'; 
// import { z } from 'zod';

// export const watchlistRouter = router({
//   getAll: publicProcedure
//     .input( z.object({ userId: z.string()}))
//     .query(async ({input}) => {  
//       try{
//         const watchlists = await getWatchlistForUser(input.userId);
//       return watchlists
//       }
//       catch(err){
//         console.error('TRPC getAll error:', err);
//         throw new Error('Failed to fetch movies');
//       }
      
//     }),
// });

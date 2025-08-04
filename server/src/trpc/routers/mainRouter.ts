import { usersRouter } from './users';
import { watchlistRouter } from './watchlist';
import { publicProcedure, router } from '../init';


export const appRouter = router({
  // test: publicProcedure.query(()=> 'hello'),
  watchlist: watchlistRouter,
  user: usersRouter
});

export type AppRouter = typeof appRouter;
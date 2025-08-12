import { usersRouter } from './users';
import { watchlistRouter } from './watchlist';
import { publicProcedure, router } from '../init';
import { movieRouter } from './movies';


export const appRouter = router({
  // test: publicProcedure.query(()=> 'hello'),
  watchlist: watchlistRouter,
  user: usersRouter,
  movie: movieRouter
});

export type AppRouter = typeof appRouter;
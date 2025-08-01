import { usersRouter } from './routers/users';
import { watchlistRouter } from './routers/watchlist';
import { publicProcedure, router } from './core';

export const appRouter = router({
  // test: publicProcedure.query(()=> 'hello'),
  watchlist: watchlistRouter,
  user: usersRouter
});

export type AppRouter = typeof appRouter;
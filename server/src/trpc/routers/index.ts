// server/trpc/routers/index.ts
import { router } from '../index';
import { watchlistRouter } from './watchlist';

export const appRouter = router({
  watchlist: watchlistRouter,
});

export type AppRouter = typeof appRouter;


import {  router } from '../init';
import { userProfileRouter } from './userProfileRouter';
import { userRouter } from './userRouter';
import { movieRouter } from './movieRouter';
import { watchListItemRouter } from './watchLIstItemRouter';
import { ratingRouter } from './ratingRouter';


export const appRouter = router({
  user: userRouter,
  userProfile: userProfileRouter,
  movie: movieRouter,
  watchlist: watchListItemRouter,
  rating: ratingRouter,
});

export type AppRouter = typeof appRouter;
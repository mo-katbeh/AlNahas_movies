
import {  router } from '../init';
import { userProfileRouter } from './userProfileRouter';
import { userRouter } from './userRouter';
import { movieRouter } from './movieRouter';
import { watchListItemRouter } from './watchLIstItemRouter';
import { ratingRouter } from './ratingRouter';
// import { authRouter } from './authRouter';


export const appRouter = router({
  user: userRouter,
  userProfile: userProfileRouter,
  movie: movieRouter,
  watchlist: watchListItemRouter,
  rating: ratingRouter,
  // auth: authRouter
});

export type AppRouter = typeof appRouter;
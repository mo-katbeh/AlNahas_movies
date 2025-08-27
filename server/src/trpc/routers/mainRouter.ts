
import {  router } from '../init';
import { userProfileRouter } from './userProfileRouter';
import { userRouter } from './userRouter';


export const appRouter = router({
  user: userRouter,
  userProfile: userProfileRouter
});

export type AppRouter = typeof appRouter;
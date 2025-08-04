import express from 'express';
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/routers/mainRouter';
import { createContext } from './context';
import './db/kysely/client'
import './db/kysely/queries/watchlist'

// console.log("Imported appRouter:", appRouter);

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
console.log("before call trpc")
async function main() {
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
      // onError: e => console.log("Error:", e.error)
    })
  );
  console.log("after call trpc")
  // console.log("Imported appRouter:", appRouter);
  // console.log(process.env.SERVER_PORT)
  
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

main()
// .catch(err => console.log(err))


export type AppRouter = typeof appRouter
import express from 'express';
import * as trpcExpress from'@trpc/server/adapters/express'
import cors from 'cors'
import { appRouter } from './trpc/routers/mainRouter';
import { createContext } from './context';
import './db/kysely/client'
import { auth } from '../utils/auth';
import {toNodeHandler} from 'better-auth/node'
const app = express();

// app.all('/trpc/auth/{*any}', toNodeHandler(auth));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

async function main() {
    app.use(
    '/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext
        })
    )
    app.listen(3000, ()=>{
        console.log("Server running on http://localhost:3000")
    })
}
main()
    .catch(err => console.log(err))
export type AppRouter = typeof appRouter
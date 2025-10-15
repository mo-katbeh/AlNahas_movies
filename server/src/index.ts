import express from 'express';
import * as trpcExpress from'@trpc/server/adapters/express'
import cors from 'cors'
import { appRouter } from './trpc/routers/mainRouter';
import { createContext } from './context';
import './db/kysely/client'
import { auth } from '../utils/auth';
import {toNodeHandler} from 'better-auth/node'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))



async function main() {
    app.all('/api/auth/{*any}', toNodeHandler(auth));
    app.use(express.json())
    app.use(
    '/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext
        })
    )}
    
main()
    .catch(err => console.log("at index server",err))


app.listen(3000, ()=>{
        console.log("Server running on http://localhost:3000")
    })
export type AppRouter = typeof appRouter
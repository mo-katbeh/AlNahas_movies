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

// Middleware to inspect the social login request
app.use("/api/auth/{*any}", (req, res, next) => {
  if (req.url.includes("sign-in/social") && req.query.provider === "google") {
    console.log("Incoming social login request for Google:", req.url);
  }
  next();
});
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json())


async function main() {
    app.use(
    '/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext
        })
    )
    
}
main()
    .catch(err => console.log(err))

app.listen(3000, ()=>{
        console.log("Server running on http://localhost:3000")
    })
export type AppRouter = typeof appRouter
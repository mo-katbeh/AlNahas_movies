import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import db from "./db/kysely/client";
import { auth } from '../utils/auth'
import { fromNodeHeaders } from "better-auth/node";

export async function createContext({req, res}: CreateExpressContextOptions) {
  const authSession = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })
  // res = res.json(session)
  console.log("at context")
  return {
    auth,
    authSession,
    user: authSession?.user,
    db,
    isAdmin: true
  }; 
}
export type Context = Awaited<ReturnType<typeof createContext>>;

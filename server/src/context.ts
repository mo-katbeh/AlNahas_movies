import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import db from "./db/kysely/client";
import { auth } from '../utils/auth'
import { fromNodeHeaders } from "better-auth/node";

export async function createContext({req, res}: CreateExpressContextOptions) {
  const headers = fromNodeHeaders(req.headers)
  const authSession = await auth.api.getSession({
    headers: headers,
  })
  // res = res.json(session)
  console.log("at context")
  return {
    req,
    auth,
    authSession,
    user: authSession?.user,
    db,
    headers,
    isAdmin: true
  }; 
}
export type Context = Awaited<ReturnType<typeof createContext>>;

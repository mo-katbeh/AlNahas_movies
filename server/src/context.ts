import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import db from "./db/kysely/client";
import { auth } from '../utils/auth'
import { fromNodeHeaders } from "better-auth/node";

export async function createContext({req, res}: CreateExpressContextOptions) {
  const headers = fromNodeHeaders(req.headers)
  const session = await auth.api.getSession({
    headers: headers,
  })
  // res = res.json(session)
  // console.log("at context")
  // console.log("session", session)
  // console.log("user", session?.user)
  // console.log("header", headers)
  return {
    res,
    req,
    auth,
    session,
    db,
    headers,
  }; 
}
export type Context = Awaited<ReturnType<typeof createContext>>;

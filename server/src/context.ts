import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import db from "./db/kysely/client";
import { auth } from '../utils/auth'
import { fromNodeHeaders } from "better-auth/node";

export async function createContext({req, res}: CreateExpressContextOptions) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })
  res = res.json(session)
  return {
    auth,
    session,
    db,
    isAdmin: true
  }; 
}
export type Context = Awaited<ReturnType<typeof createContext>>;

import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import db from "./db/kysely/client";


export function createContext({}: CreateExpressContextOptions) {
  return {
    db,
    isAdmin: true
  }; 
}
export type Context = Awaited<ReturnType<typeof createContext>>;
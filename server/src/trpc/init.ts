import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "../context"
import { movieRouter } from "./routers/movieRouter";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAdminMiddleware = t.middleware(({ctx, next})=>{
    if (!ctx.isAdmin){
        throw new TRPCError({ code: "UNAUTHORIZED"})
    }
    return next({ ctx: {...ctx}})
})
export const adminPocedure = t.procedure.use(isAdminMiddleware)
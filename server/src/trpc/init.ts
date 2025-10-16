import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "../context"

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ctx, next})=>{
    if(!ctx.session || !ctx.session.user){
        throw new TRPCError({code: "UNAUTHORIZED", message: "You must logged in"})
    }
    return next({
        ctx: {
            ...ctx,
            user: ctx.session.user
        },
    })
})
export const protectedProcedure = t.procedure.use(isAuthed)

const isAdminMiddleware = t.middleware(({ctx, next})=>{
    if (ctx.session.user.role !== "admin"){
        throw new TRPCError({ code: "FORBIDDEN"})
    }
    return next({ ctx: {...ctx, user: ctx.session.user}})
})
export const adminProcedure = t.procedure.use(isAdminMiddleware)
import { auth } from "../../../utils/auth";
import { protectedProcedure, publicProcedure, router } from "../init";
import { loginSchema, signUpSchema } from "../../../../packages/shared/zod/authSchema";
import { TRPCError } from "@trpc/server";
import { error } from "console";

export const authRouter = router ({
    getSession: publicProcedure.query(async ({ ctx }) => {
    return await ctx.auth.api.getSession({
        headers: ctx.headers,
    });
}),
    signup: publicProcedure
        .input(signUpSchema)
        .mutation(async({ ctx ,input})=>{
            try{
             await ctx.auth.api.signUpEmail({
                body:{
                    name: input.userName,
                    email: input.email,
                    password: input.password,
                }
                
             })
    
            }
            catch(err){
               console.log(err);
               throw err
            }
            
        }),
    login: publicProcedure
        .input(loginSchema)
        .mutation(async({ctx, input})=>{
                await ctx.auth.api.signInEmail({
                body:{
                    email: input.email,
                    password: input.password
                }
            })
            console.log("login is working")
        }),
      logout: protectedProcedure
        .mutation(async ({ctx})=>{
            try{
                console.log("I'm in logout")
            const {success}= await ctx.auth.api.signOut({
                headers: ctx.headers
            })
            console.log("logout success", success)
        }
            catch(err){
                console.error("Logout error:", err)
                throw err;
            }
        })
        // getSession: publicProcedure
        //     .query(async ({ctx})=>{
        //         return await ctx.session
        //     })
        
 })
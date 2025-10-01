import { auth } from "../../../utils/auth";
import { protectedProcedure, publicProcedure, router } from "../init";
import { loginSchema, signUpSchema } from "../../../../packages/shared/zod/authSchema";
import { TRPCError } from "@trpc/server";
import { error } from "console";
import tr from "zod/v4/locales/tr.cjs";
import { fromNodeHeaders } from "better-auth/node";

export const authRouter = router ({
    getUserSession: publicProcedure
        .query(async ({ctx})=> {
            const {session, user} =  await ctx.auth.api.getSession({
                headers: fromNodeHeaders(ctx.req.headers)
            })

            return {session, user}
        }),
    signup: publicProcedure
        .input(signUpSchema)
        .mutation(async({ ctx ,input})=>{
            try{
             const response = await ctx.auth.api.signUpEmail({
                body:{
                    name: input.userName,
                    email: input.email,
                    password: input.password,
                }
            })

            //     asResponse: true
                
            //  })
            //  ctx.session
            //  ctx.res.statusCode = response.status;
            //  response.headers.forEach((value, key)=>{
            //     ctx.res.setHeader(key, value)
            //  })
            //  const text = await response.text()
            //  ctx.res.end(text)
            //  return
        }
            catch(err){
               console.log(err);
               throw err
            }
            
        }),
    login: publicProcedure
        .input(loginSchema)
        .mutation(async({ctx, input})=>{
               const{}= await ctx.auth.api.signInEmail({
                body:{
                    email: input.email,
                    password: input.password
                },

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
        }),
        // getSession: publicProcedure
        //     .query(async ({ctx})=>{
        //         return await ctx.session
        //     })
        
 })
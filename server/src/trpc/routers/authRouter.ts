import { auth } from "../../../utils/auth";
import { publicProcedure, router } from "../init";
import { loginSchema, signUpSchema } from "../../../../packages/shared/zod/authSchema";
import { TRPCError } from "@trpc/server";
import { error } from "console";

export const authRouter = router ({
    signup: publicProcedure
        .input(signUpSchema)
        .mutation(async({ ctx ,input})=>{
            try{
            const{user } = await ctx.auth.api.signUpEmail({
                body:{
                    name: input.userName,
                    email: input.email,
                    password: input.password,
                }
                
             })
             return user
            }
            catch(err){
               console.log(err)
            }
            // try{
            //     console.log("authRouter")
            //     await ctx.auth.api.signUpEmail({
            //     body:{
            //         name: input.userName,
            //         email: input.email,
            //         password: input.password,
            //     }
                
            //  })
            //     console.log("authRouter2")

            // }
            // catch(err){
            //     throw new TRPCError
            // }
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
        getSession: publicProcedure
            .query(async ({ctx})=>{
                return await ctx.session
            })
        
 })
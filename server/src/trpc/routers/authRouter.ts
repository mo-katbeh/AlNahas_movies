import { auth } from "../../../utils/auth";
import { publicProcedure, router } from "../init";
import { loginSchema, signUpSchema } from "../../../../packages/shared/zod/authSchema";

export const authRouter = router ({
    signup: publicProcedure
        .input(signUpSchema)
        .mutation(async({ ctx ,input})=>{
            try{
                console.log("authRouter")
                await ctx.auth.api.signUpEmail({
                body:{
                    name: input.userName,
                    email: input.email,
                    password: input.password,
                }
                
             })
                console.log("authRouter2")

            }
            catch(err){
               console.error(err)
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
        })
        
 })
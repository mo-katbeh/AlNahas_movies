import { publicProcedure, router } from "../init";
import { createUserSchema, delelteUserSchema } from "../../db/zod/userType";

export const userRouter = router({
    createUser: publicProcedure
    .input( createUserSchema )
    .mutation(async({ctx, input})=>{
        try{
            const newUser =await ctx.db
                .insertInto('users')
                .values({  
                    email: input.email,
                })
                .execute()
            console.log("new user info",newUser)
            return newUser
        }
        catch(err){
            console.log("tRPC", err);
            throw new Error('Failed to fetch users');
        }
    }),
    deleteUserById: publicProcedure
    .input(delelteUserSchema)
    .mutation(async({ctx, input})=>{
        try{
            const result =await ctx.db
                .deleteFrom('users')
                .where('users.id', '=', input.id)
                .executeTakeFirst()

      console.log(result.numDeletedRows)
        }
        catch(err){
            console.log("Faild to delete user", err)
        }
    })
})
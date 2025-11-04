import {  router } from "../init";


export const userRouter = router({
    // createUser: publicProcedure
    // .input( createUserSchema )
    // .mutation(async({ctx, input})=>{
    //     const trx = await ctx.db.startTransaction().execute()
    //     try{
    //         const newUser =await 
    //             trx
    //             .insertInto('users')
    //             .values({  
    //                 email: input.email,
    //                 name: input.name,
    //             })
    //             .returningAll()
    //             .execute()
    //         await trx.commit().execute()
    //         console.log("new user info",newUser)
    //         return newUser
    //     }
    //     catch(err){
    //         await trx.rollback().execute()
    //         console.log("tRPC", err);
    //         throw new Error('Failed to fetch users');
    //     }
    // }),
    // deleteUserById: publicProcedure
    // .input(delelteUserSchema)
    // .mutation(async({ctx, input})=>{
    //     try{
    //         const result =await ctx.db
    //             .deleteFrom('users')
    //             .where('users.id', '=', input.id)
    //             .executeTakeFirst()

    //   console.log(result.numDeletedRows)
    //     }
    //     catch(err){
    //         console.log("Faild to delete user", err)
    //     }
    // })
})
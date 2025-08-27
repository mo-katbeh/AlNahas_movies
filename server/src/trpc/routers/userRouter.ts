import { publicProcedure, router } from "../init";
import { createUser,  deleteUserById, updateUser } from "../../db/kysely/queries/userQueries"
import { createUserSchema, delelteUserSchema } from "../../db/zod/userType";
import { z } from "zod"
import { log } from "console";
export const userRouter = router({
    createUser: publicProcedure
    .input( createUserSchema )
    .mutation(async({input})=>{
        try{
            const newUser = await createUser(input.email)
            return newUser
        }
        catch(err){
            console.log("tRPC", err);
            throw new Error('Failed to fetch users');
        }
    }),
    selectAll: publicProcedure
    .query(async()=>{
        const users = await updateUser()
        console.log(users)
        return users

    }),
    deleteUserById: publicProcedure
    .input(delelteUserSchema)
    .mutation(async({input})=>{
        try{
            await deleteUserById(input.id)
        }
        catch(err){
            console.log("Faild to delete user", err)
        }
    })
})
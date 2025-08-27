import { publicProcedure, router } from "../init";
import { createUser, updateUser } from "../../db/kysely/queries/userQueries"
import { createUserSchema } from "../../db/zod/userType";
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

    })
})
import db from "../../db/kysely/client";
import { createUserProfileSchema, deleteUserProfileSchema } from "../../db/zod/userProfileType";
import { publicProcedure, router } from "../init";


export const userProfileRouter = router({
    createUserProfile: publicProcedure
        .input( createUserProfileSchema)
        .mutation(async({ input })=>{
            try{
            const userProfile = await  db
             .insertInto('user_profile')
             .values({
                user_id: input.userId,
                birth_date: input.birthDate,
                first_name: input.firstName,
                last_name: input.lastName,
                gender: input.gender,
                phone_number: input.phoneNumber

             })
             .execute()

             console.log("User Profile", userProfile)
            }
            catch(err){
                console.log("Failed creating user profile's")
            }

        }),
    deleteUserProfile: publicProcedure
        .input( deleteUserProfileSchema )
        .mutation( async({input})=>{
            try{
                const resultOfDelete = await db
                 .deleteFrom('user_profile')
                 .where('user_profile.id', '=', input.id)
                 .executeTakeFirst()
                console.log("nummber of rows deleted: ", resultOfDelete.numDeletedRows)

            }
            catch(err){
                console.log("Proccess of deleting failed", err)
            }
        })

    
})
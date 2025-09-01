import { createUserProfileSchema, deleteUserProfileSchema, updateUserProfileSchema } from "../../db/zod/userProfileType";
import { publicProcedure, router } from "../init";


export const userProfileRouter = router({
    createUserProfile: publicProcedure
        .input( createUserProfileSchema)
        .mutation(async({ ctx, input })=>{
            try{
             await  ctx.db
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
            const createUserProfileResult =  await ctx.db
              .selectFrom('user_profile')
              .selectAll()
              .where('user_profile.user_id', '=', input.userId)
              .execute()
             console.log("User Profile", createUserProfileResult)
             return createUserProfileResult;
            }
            catch(err){
                console.log("Failed creating user profile's")
            }

        }),
    updateUserProfile: 
        publicProcedure
        .input( updateUserProfileSchema)
        .mutation(async({ ctx, input })=>{
            try{
             await ctx.db
                .updateTable('user_profile')
                .set( { 
                    first_name: input.firstName,
                    last_name: input.lastName,
                    birth_date: input.birthDate,
                    phone_number: input.phoneNumber
                })
                .where("user_profile.id", "=", input.id)
                .execute()
            const updateUserProfileResult =  await ctx.db
                .selectFrom('user_profile')
                .selectAll()
                .where('user_profile.id', '=', input.id)
                .execute()
            console.log("New user profile info:", updateUserProfileResult)
            return updateUserProfileResult;
            }
            catch(err){
                console.log("Updating user profile failed", err)
            }
        })
       ,
    deleteUserProfile: publicProcedure
        .input( deleteUserProfileSchema )
        .mutation( async({ctx, input})=>{
            try{
                const resultOfDelete = await ctx.db
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
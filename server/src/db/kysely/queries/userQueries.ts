
import db from "../client";


export async function createUser( userEmail: string ) {
     await db
     .insertInto('users')
     .values({  
        email: userEmail,
        role: "user",
     })
     .execute()
}

export async function updateUser() {
   
   return await db
   .selectFrom('users')
   .selectAll()
   .execute()
}
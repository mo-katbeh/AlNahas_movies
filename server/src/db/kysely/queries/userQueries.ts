
import db from "../client";


export async function createUser( userEmail: string ) {
     await db
     .insertInto('users')
     .values({  
        email: userEmail,
     })
     .execute()
}
export async function deleteUserById( userId: string) {
     const result =await db
      .deleteFrom('users')
      .where('users.id', '=', userId)
      .executeTakeFirst()

      console.log(result.numDeletedRows)
}
export async function updateUser() {
    
}

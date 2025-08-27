import db from "../client";

async function createUser( userEmail: string ) {
    await db
     .insertInto('users')
     .values({
        email: userEmail,

     })
    
}
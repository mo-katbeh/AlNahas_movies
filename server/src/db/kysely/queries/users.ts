
import db from "../client"


export async function getAllUsers() {
  return await db
    .selectFrom('users')
    .selectAll()
    .limit(20)
    .execute();
}
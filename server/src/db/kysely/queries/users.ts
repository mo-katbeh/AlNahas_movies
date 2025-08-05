
import db from "../client"


export async function getAllUsers() {
  return await db
    .selectFrom('categories')
    .selectAll()
    .execute();
}
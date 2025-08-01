import db from "../client" 
import { config } from "dotenv"; 
config({ path: '.env'})
export async function getAllUsers() {
  console.log("this is env", process.env)
  return await db
    .selectFrom('users')
    .selectAll()
    .execute();
}
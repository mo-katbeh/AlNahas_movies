import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db  from "../src/db/kysely/client"
import { Pool } from "pg";
import { env } from "../src/validateEnv";
import * as schema from "../src/db/schemas/indexTables"
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema:{
            ...schema,
            user: schema.UserTable,
            account: schema.AccountTable,
            session: schema.SessionTable,
            verification: schema.VerificationTable
        }
    }),
    emailAndPassword:{
        enabled: true
    },
    modelName:{
        user: "users"
    }


})
import { betterAuth } from "better-auth";
import { multiSession, oAuthProxy } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import  { drizzleDb }  from "../src/db/kysely/client"
import * as authSchema from "../src/db/schemas/authTable"
export const auth = betterAuth({
    database: drizzleAdapter(drizzleDb,{
        provider: "pg",
        schema:{
            ...authSchema,
            user: authSchema.UserTable,
            account: authSchema.AccountTable,
            session: authSchema.SessionTable,
            verification: authSchema.VerificationTable,
        }
    }),
    plugins: [
        oAuthProxy(),
        multiSession({
            maximumSessions: 5
        })
    ],

    emailAndPassword:{
        enabled: true,

    },
})
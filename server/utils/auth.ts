import { betterAuth } from "better-auth";
import { multiSession, oAuthProxy } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import  { drizzleDb }  from "../src/db/kysely/client"
import * as authSchema from "../src/db/schemas/authTable"

// import { env } from "../src/validateEnv";
export const auth = betterAuth({
    database: drizzleAdapter(drizzleDb,{
        provider: "pg",
        schema:{
            user: authSchema.UserTable,
            account: authSchema.AccountTable,
            session: authSchema.SessionTable,
            verification: authSchema.VerificationTable,
        }
    }),
    
    plugins: [
        oAuthProxy(),
        multiSession()
    ],

    emailAndPassword:{
        enabled: true,

    },

    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    cookies:{
        secure: false,
        sameSite: "none"
    }
    
})

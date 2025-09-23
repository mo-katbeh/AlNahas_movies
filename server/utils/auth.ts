import { betterAuth } from "better-auth/*";
import { Pool } from "pg";
import { env } from "../src/validateEnv";

export const auth = betterAuth({
    database: new Pool({
        host: env.DB_HOST,
        port: Number(env.PORT),
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        
    }),
    emailAndPassword:{
        enabled: true
    },
    

})
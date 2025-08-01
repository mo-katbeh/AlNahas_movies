import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv";
dotenv.config({path: './env'});


export default defineConfig({
  dialect: "postgresql",
  schema: "./db/drizzle/schema",
  out: "./db/migrations", // make sure this path exists
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.SERVER_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: false,
  },
  verbose: true,
  strict: true,
});

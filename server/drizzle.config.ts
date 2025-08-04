import { defineConfig } from "drizzle-kit"
import { env } from "./src/validateEnv";

console.log(4444444444)

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/drizzle/schema",
  out: "./db/migrations", // make sure this path exists
  dbCredentials: {
    host: env.DB_HOST!,
    port: env.PORT!,
    user: env.DB_USER!,
    password: env.DB_PASSWORD!,
    database: env.DB_NAME!,
    ssl: false,
  },
  verbose: true,
  
  strict: true,
});

import { defineConfig } from "drizzle-kit"
import { env } from "./src/validateEnv";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/drizzle/schema",
  out: "./src/db/migrations", // make sure this path exists
  dbCredentials: {
    host: env.DB_HOST!,
    port: Number(env.PORT)!,
    user: env.DB_USER!,
    password: env.DB_PASSWORD!,
    database: env.DB_NAME!,
    ssl: false,
  },
  verbose: true,
  
  strict: true,
});

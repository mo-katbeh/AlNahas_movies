import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv";
dotenv.config();

console.log("Connecting to:", process.env.DATABASE_URL);

export default defineConfig({
  dialect: "postgresql",
 schema: "./db/drizzle/schema",
  out: "./db/migrations", // make sure this path exists
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: false,
  },
  verbose: true,
  strict: true,
});

// import { defineConfig } from "drizzle-kit";
// import * as dotenv from "../dotenv";
// dotenv.config();

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./packages/db/drizzle/schema",
//   out: "./packages/db/migrations",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
//   strict: true,
//   verbose: true,
// });
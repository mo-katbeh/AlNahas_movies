// packages/db/kysely.ts or db/client.ts
import 'dotenv/config';
// dotenv.config({path: '../../.env'});
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from './types'

console.log("this is env", process.env)
console.log("ENV values:", {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: "12345",
      database: process.env.DB_NAME,
      ssl: undefined,
    }),
  }),
})

export default db
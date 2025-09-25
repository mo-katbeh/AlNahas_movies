import { env } from "../../validateEnv"
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from './types'
import { drizzle } from "drizzle-orm/node-postgres"
import * as authSchema from "../schemas/authTable"
const pool =new Pool({
      host: env.DB_HOST,
      port: Number(env.PORT),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: undefined,
    })
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: pool
  }),
})
export const drizzleDb = drizzle(pool, {schema: authSchema})
export default db;
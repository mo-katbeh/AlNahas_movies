import { env } from "../../validateEnv"
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from './types'

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: env.DB_HOST,
      port: Number(env.PORT),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: undefined,
    }),
  }),
})

export default db
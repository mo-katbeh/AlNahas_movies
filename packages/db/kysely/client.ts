// packages/db/kysely.ts or db/client.ts
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from './types'

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
  }),
})

export default db
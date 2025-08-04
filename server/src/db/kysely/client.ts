import { env } from "../../validateEnv"
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from './types'


console.log(11111111111)

// console.log("this is env", env)
console.log("ENV values:", {
  host: env.DB_HOST,
  port: env.PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: env.DB_HOST,
      port: env.PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: undefined,
    }),
  }),
})

export default db
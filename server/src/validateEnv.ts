import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()


const envSchema = z.object({
    DB_HOST: z.string(),
    PORT: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DATABASE_URL: z.string()
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
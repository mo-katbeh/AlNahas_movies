import { Client } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

async function testConnection() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
  });

  try {
    await client.connect();
    console.log("✅ Connected to database successfully!");
  } catch (err) {
    console.error("❌ Failed to connect to database:", err);
  } finally {
    await client.end();
  }
}

testConnection();

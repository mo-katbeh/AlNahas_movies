import { pgTable, varchar, text, timestamp, bigint } from "drizzle-orm/pg-core";

export const verification = pgTable("verification", {
  id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
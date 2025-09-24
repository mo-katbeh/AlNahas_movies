import { pgTable, varchar, text, timestamp, bigint } from "drizzle-orm/pg-core";
import { UserTable } from "./users";
import { relations } from "drizzle-orm";

export const SessionTable = pgTable("session", {
  id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
  userId: bigint('user_id',{mode: 'bigint'}).references(()=>UserTable.id, {onDelete:'cascade'}),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const SessionTableRelation = relations(SessionTable, ({one})=>{
    return{
        userRelation: one(UserTable,{
            fields: [SessionTable.userId],
            references: [UserTable.id]
        })
    }
})
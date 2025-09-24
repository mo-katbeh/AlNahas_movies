import { pgTable, varchar, text, timestamp, primaryKey, uniqueIndex, bigint } from "drizzle-orm/pg-core";
import { UserTable } from "./users";
import { relations } from "drizzle-orm";

export const AccountTable = pgTable("account", {
  id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
  userId: bigint('user_id',{mode: 'bigint'}).references(()=>UserTable.id, {onDelete:'cascade'}),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
},table=>[
    uniqueIndex("account_provider_index").on(table.accountId, table.providerId)
]);
export const AccountTableRelation = relations(AccountTable, ({one})=>{
    return{
        userRelation: one(UserTable, {
            fields: [AccountTable.userId],
            references: [UserTable.id]
        })
    }
})
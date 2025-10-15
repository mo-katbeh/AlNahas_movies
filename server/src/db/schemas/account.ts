import { pgTable, varchar, text, timestamp, primaryKey, uniqueIndex, bigint, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const AccountTable = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
export const AccountTableRelation = relations(AccountTable, ({one})=>{
    return{
        userRelation: one(UserTable, {
            fields: [AccountTable.userId],
            references: [UserTable.id]
        })
    }
})
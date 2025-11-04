import { pgTable, text, timestamp} from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const SessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const SessionTableRelation = relations(SessionTable, ({one})=>{
    return{
        userRelation: one(UserTable,{
            fields: [SessionTable.userId],
            references: [UserTable.id]
        })
    }
})
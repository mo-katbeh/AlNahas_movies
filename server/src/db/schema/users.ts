import { date, integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users",{
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    birthDate: date('birthDate').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull()
},
table=>[
    uniqueIndex('emailIndex').on(table.email)
]);
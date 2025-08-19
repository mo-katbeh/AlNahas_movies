import { integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users",{
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    age: integer('age').notNull(),
    createtAt: timestamp('createdAt').defaultNow().notNull()
},
table=>[
    uniqueIndex('emailIndex').on(table.email)
]);
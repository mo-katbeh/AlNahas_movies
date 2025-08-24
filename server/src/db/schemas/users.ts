import { relations } from "drizzle-orm";
import { date, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { RatingsTable, WatchListItemTable } from "./indexTables";

export const userRoleEnum =pgEnum("role", ['user', 'admin'])
export const UserTable = pgTable("users",{
    id: uuid('id').primaryKey().defaultRandom(),
    role: userRoleEnum('role').default('user'),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    birthDate: date('birth_date').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(()=> new Date()),
    deletedAT: timestamp('deleted_at')
},
table=>[
    uniqueIndex('email_index').on(table.email)
]);

export const UserTableRelations = relations(UserTable, ({ many })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable)
    }
})
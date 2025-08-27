import { relations } from "drizzle-orm";
import { boolean, date, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { RatingsTable, WatchListItemTable, UserProfileTable } from "./indexTables";


export const UserTable = pgTable("users",{
    id: uuid('id').primaryKey().defaultRandom(),
    role: text('role').default('user'),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(()=> new Date()),
    isDeleted: boolean('is_deleted').default(false)
},
table=>[
    uniqueIndex('email_index').on(table.email)
]);

export const UserTableRelations = relations(UserTable, ({ many, one })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable),
        UserProfileRelation: one(UserProfileTable)
    }
})
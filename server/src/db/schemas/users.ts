import { relations } from "drizzle-orm";
import { bigint, boolean, date, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { RatingsTable, WatchListItemTable, UserProfileTable } from "./indexTables";


export const UserTable = pgTable("users",{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    role: text('role').default('user'),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').default(false),
    image: text('image'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(()=> new Date()),
    isDeleted: boolean('is_deleted').default(false)
});

export const UserTableRelations = relations(UserTable, ({ many, one })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable),
        UserProfileRelation: one(UserProfileTable)
    }
})
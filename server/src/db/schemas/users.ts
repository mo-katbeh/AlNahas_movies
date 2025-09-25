import { relations } from "drizzle-orm";
import { bigint, boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { RatingsTable, WatchListItemTable, UserProfileTable } from "./indexTables";
import { AccountTable} from "./account";
import { SessionTable } from "./session";


export const UserTable = pgTable("users",{
    id: text('id').primaryKey(),
    role: text('role').default('user'),
    name: text('name'),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    password: text('password'),
    image: text('image'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(()=> new Date()),
    isDeleted: boolean('is_deleted').default(false).notNull()
});

export const UserTableRelations = relations(UserTable, ({ many, one })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable),
        userProfileRelation: one(UserProfileTable),
        accountTableRelation: many(AccountTable),
        sessionTableRelation: many(SessionTable)
    }
})
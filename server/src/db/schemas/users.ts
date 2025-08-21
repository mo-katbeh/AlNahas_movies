import { relations } from "drizzle-orm";
import { date, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { RatingsTable, WatchListItemTable } from "./indexTables";

const userRoleEnum =pgEnum("userRole", ['user', 'admin'])
export const UserTable = pgTable("users",{
    id: uuid('id').primaryKey().defaultRandom(),
    role: userRoleEnum('role').default('user'),
    name: text('name').notNull(),
    email: text('email').notNull(),
    birthDate: date('birthDate').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow().$onUpdate(()=> new Date()),
    deletedAT: timestamp('deletedAt')
},
table=>[
    uniqueIndex('emailIndex').on(table.email)
]);

export const UserTableRelations = relations(UserTable, ({ many })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable)
    }
})
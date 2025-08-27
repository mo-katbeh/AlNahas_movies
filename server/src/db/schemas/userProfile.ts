import { date, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./indexTables";
import { relations } from "drizzle-orm";


export const UserProfileTable = pgTable("userProfile",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('userId').references(() => UserTable.id, {onDelete: "cascade"}),
    birthDate: date('birthDate'),
    firstName: text('firstName'),
    lastName: text('lastName'),
    gender: text('gender').notNull(),
    phoneNumber: text('phoneNumber'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow().$onUpdate(()=> new Date()),
})

export const UserProfileTableRelation = relations(UserProfileTable,({one})=>{
    return{
        userRelation: one(UserTable, {
            fields: [UserProfileTable.userId],
            references: [UserTable.id]
        })
    }
})
import { date, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./indexTables";
import { relations } from "drizzle-orm";


export const UserProfileTable = pgTable("user_profile",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => UserTable.id, {onDelete: "cascade"}),
    birthDate: date('birth_date'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    gender: text('gender').notNull(),
    phoneNumber: text('phone_number'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(()=> new Date()),
})

export const UserProfileTableRelation = relations(UserProfileTable,({one})=>{
    return{
        userRelation: one(UserTable, {
            fields: [UserProfileTable.userId],
            references: [UserTable.id]
        })
    }
})
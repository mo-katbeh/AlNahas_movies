import { bigint, date, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./indexTables";
import { relations } from "drizzle-orm";
import { table } from "console";


export const UserProfileTable = pgTable("user_profile",{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    userId: bigint('user_id', {mode: 'bigint'}).references(() => UserTable.id, {onDelete: "cascade"}).unique(),
    birthDate: date('birth_date'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    gender: text('gender'),
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
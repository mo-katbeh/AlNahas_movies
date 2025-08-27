import { Many, One, relations } from "drizzle-orm";
import { boolean, date, decimal, integer, numeric, pgTable, text,  timestamp,  uuid } from "drizzle-orm/pg-core";
import {  RatingsTable, WatchListItemTable } from "./indexTables";

export const MovieTable = pgTable("movies",{
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    genre: text('genre'),
    releaseYear: integer('releaseYear').notNull(),
    posterUrl: text('posterUrl'),
    description: text('description'),
    updatedAt: timestamp('updateAt').notNull().defaultNow().$onUpdate(() => new Date()),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    isDeleted: boolean('isDeleted').default(false)
})

export const MovieTableRelation = relations(MovieTable, ({ many })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable),

    }
})
import { relations } from "drizzle-orm";
import { bigint, boolean, integer,  pgTable, text,  timestamp} from "drizzle-orm/pg-core";
import {  RatingsTable, WatchListItemTable } from "./indexTables";

export const MovieTable = pgTable("movies",{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    title: text('title').notNull(),
    genre: text('genre'),
    releaseYear: integer('release_year').notNull(),
    posterUrl: text('poster_url'),
    description: text('description'),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    isDeleted: boolean('is_deleted').default(false)
})

export const MovieTableRelation = relations(MovieTable, ({ many })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable),

    }
})
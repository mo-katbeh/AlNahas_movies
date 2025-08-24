import { Many, One, relations } from "drizzle-orm";
import { date, decimal, integer, numeric, pgTable, text,  timestamp,  uuid } from "drizzle-orm/pg-core";
import { MoviesGenreTable, RatingsTable, WatchListItemTable } from "./indexTables";

export const MovieTable = pgTable("movies",{
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    releaseYear: integer('releaseYear').notNull(),
    posterUrl: text('poster_url'),
    description: text('description'),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    deletedAT: timestamp('deleted_at')
})

export const MovieTableRelation = relations(MovieTable, ({ many })=>{
    return{
        watchListsRelation: many(WatchListItemTable),
        ratingsRelation: many(RatingsTable),
        moviesGenresRelation: many(MoviesGenreTable)
    }
})
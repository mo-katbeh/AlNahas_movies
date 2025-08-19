import { pgTable, primaryKey, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { MovieTable, UserTable } from './indexTables';

export const WatchListItemTable = pgTable("watchlistItems",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('userId').references(()=> UserTable.id),
    movieId: uuid('movieId').references(()=> MovieTable.id),
    status: text('status'),
    review: text('review')
},table =>[
    uniqueIndex("userMovieIndex").on(table.movieId, table.userId)
])
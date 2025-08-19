import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { MovieTable, UserTable } from './indexTables';

export const WatchListItemsTable = pgTable("watchlistItems",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('userId').references(()=> UserTable.id),
    movieId: uuid('movieId').references(()=> MovieTable.id),
    status: text('status'),
    review: text('review')
}, table=>[
    primaryKey({columns: [table.movieId, table.userId]})
])
import { bigint, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { MovieTable, UserTable } from './indexTables';
import { relations } from "drizzle-orm";

export const WatchListItemTable = pgTable("watchlist_items",{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id').references(()=> UserTable.id, {onDelete: "cascade"}).notNull(),
    movieId: bigint('movie_id', {mode: 'bigint'}).references(()=> MovieTable.id, {onDelete: 'cascade'}).notNull(),
    status: text('status'),
    
},table =>[
    uniqueIndex("user_movie_index").on(table.movieId, table.userId)
])

export const WatchListItemTableRelations = relations(WatchListItemTable, ({ one })=>{
    return{
        userRelation: one(UserTable,{
            fields: [WatchListItemTable.userId],
            references: [UserTable.id]
        }),
        movieRelation: one(MovieTable, {
            fields: [WatchListItemTable.movieId],
            references: [MovieTable.id]
        })
    }
})
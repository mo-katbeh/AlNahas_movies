import { pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { MovieTable, UserTable } from './indexTables';
import { relations } from "drizzle-orm";

export const WatchListItemTable = pgTable("watchlist_items",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(()=> UserTable.id, {onDelete: "cascade"}).notNull(),
    movieId: uuid('movie_id').references(()=> MovieTable.id, {onDelete: 'cascade'}).notNull(),
    status: text('status'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
    deletedAT: timestamp('deleted_at')
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
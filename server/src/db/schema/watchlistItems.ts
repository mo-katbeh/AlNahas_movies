import { pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { MovieTable, UserTable } from './indexTables';
import { relations } from "drizzle-orm";

export const WatchListItemTable = pgTable("watchlistItems",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('userId').references(()=> UserTable.id, {onDelete: "cascade"}).notNull(),
    movieId: uuid('movieId').references(()=> MovieTable.id, {onDelete: 'cascade'}).notNull(),
    status: text('status'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow().$onUpdate(() => new Date()),
    deletedAT: timestamp('deletedAt')
},table =>[
    uniqueIndex("userMovieIndex").on(table.movieId, table.userId)
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
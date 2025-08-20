import { decimal, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { UserTable, MovieTable } from "./indexTables"
import { relations } from "drizzle-orm";



export const RatingsTable = pgTable("ratings",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('userId').references(()=> UserTable.id, {onDelete: "cascade", onUpdate:"cascade"}),
    movieId: uuid('movieId').references(()=> MovieTable.id, {onDelete: "cascade", onUpdate:"cascade"}),
    rating: decimal('rating'),
    review: text('review'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow().$onUpdate(() => new Date()),
    deletedAT: timestamp('deletedAt')
},table=>[
    uniqueIndex("uesrMovieIndex").on(table.movieId, table.userId)
])

export const RatingsTableRelation = relations(RatingsTable, ({one})=>{
    return{
        userRelation: one(UserTable, {
            fields: [RatingsTable.userId],
            references: [UserTable.id]
        }),
        movieRelation: one(MovieTable, {
            fields: [RatingsTable.movieId],
            references: [MovieTable.id]
        })
    }
})
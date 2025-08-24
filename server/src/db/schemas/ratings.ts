import { decimal, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { UserTable, MovieTable } from "./indexTables"
import { relations } from "drizzle-orm";



export const RatingsTable = pgTable("ratings",{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(()=> UserTable.id, {onDelete: "cascade", onUpdate:"cascade"}),
    movieId: uuid('movie_id').references(()=> MovieTable.id, {onDelete: "cascade", onUpdate:"cascade"}),
    rating: decimal('rating'),
    review: text('review'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
    deletedAT: timestamp('deleted_at') //review
},table=>[
    uniqueIndex("uesr_movie_index").on(table.movieId, table.userId)
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
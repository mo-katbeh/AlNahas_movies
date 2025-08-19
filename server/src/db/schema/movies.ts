import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const MovieTable = pgTable("movies",{
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    releaseYear: timestamp('releaseYear').notNull(),
    posterUrl: text('posteUrl'),
    description: text('description')
})
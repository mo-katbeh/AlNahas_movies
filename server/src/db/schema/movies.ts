import { date, decimal, numeric, pgTable, text,  uuid } from "drizzle-orm/pg-core";

export const MovieTable = pgTable("movies",{
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    releaseYear: date('releaseYear').notNull(),
    posterUrl: text('posterUrl'),
    rating: decimal('rating'),
    description: text('description')
})
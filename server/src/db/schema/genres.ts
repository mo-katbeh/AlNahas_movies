import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const GenreTable =  pgTable("genres",{
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull()
})
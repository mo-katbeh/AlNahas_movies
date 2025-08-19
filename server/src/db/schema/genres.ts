import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const GenreTable =  pgTable("genres",{
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').unique().notNull()
},table=>[
    uniqueIndex("nameIndex").on(table.name)
])
import { relations } from "drizzle-orm";
import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { MoviesGenreTable } from "./moviesGenre";

export const GenreTable =  pgTable("genres",{
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').unique().notNull(),
    
},table=>[
    uniqueIndex("nameIndex").on(table.name)
])
export const GenreTableRelations = relations(GenreTable, ({many})=>{
    return {
        moviesGenresRelation: many(MoviesGenreTable)
    }
})
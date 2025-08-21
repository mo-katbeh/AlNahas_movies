import {  pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { MovieTable, GenreTable } from './indexTables';
import { relations } from "drizzle-orm";

export const MoviesGenreTable =  pgTable("moviesGenre",{
    movieId: uuid('movieId').references(()=> MovieTable.id, {onDelete: "cascade"}),
    genreId: uuid('genreId').references(()=> GenreTable.id, {onDelete: "cascade"})
},table => [
    primaryKey({columns: [table.movieId, table.genreId]})
])

export const MoviesGnereTableRelations = relations(MoviesGenreTable, ({ one })=>{
    return{
        movieRelation: one(MovieTable, {
            fields: [MoviesGenreTable.movieId],
            references: [MovieTable.id]
        }),
        gnereRelation: one(GenreTable, {
            fields: [MoviesGenreTable.genreId],
            references: [GenreTable.id]
        })
    }
})
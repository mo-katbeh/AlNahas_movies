import {  pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { MovieTable, GenreTable } from './indexTables';
import { relations } from "drizzle-orm";

export const MoviesGenreTable =  pgTable("movies_genre",{
    movieId: uuid('movie_id').references(()=> MovieTable.id, {onDelete: "cascade"}),
    genreId: uuid('genre_id').references(()=> GenreTable.id, {onDelete: "cascade"})
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
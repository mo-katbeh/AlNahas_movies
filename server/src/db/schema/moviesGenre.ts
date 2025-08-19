import {  pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { MovieTable, GenreTable } from './indexTables';

export const MoviesGnereTable =  pgTable("moviesGenre",{
    movieId: uuid('movieId').references(()=> MovieTable.id, {onDelete: "cascade"}),
    genreId: uuid('genreId').references(()=> GenreTable.id, {onDelete: "cascade"})
},table => [
    primaryKey({columns: [table.movieId, table.genreId]})
])
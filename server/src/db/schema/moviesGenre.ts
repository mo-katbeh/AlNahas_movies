import {  pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { MovieTable, GenreTable } from './indexTables';

export const MoviesGnereTable =  pgTable("moviesGenre",{
    movieId: uuid('movieId').references(()=> MovieTable.id),
    genreId: uuid('genreId').references(()=> GenreTable.id)
},table => [
    primaryKey({columns: [table.movieId, table.genreId]})
])
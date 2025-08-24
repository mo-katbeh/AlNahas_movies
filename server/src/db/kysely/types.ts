
import { InferSelectModel } from "drizzle-orm";
import { RatingsTable, MovieTable, GenreTable, UserTable, WatchListItemTable } from "../schemas/indexTables";


export interface Database{
  watchListItems: WatchListItemTable,
  ratings: RatingTable
  movies: MovieTable,
  genres: GenreTable,
  users: UserTable,
}

export type WatchListItemTable = InferSelectModel<typeof WatchListItemTable>
export type RatingTable = InferSelectModel< typeof RatingsTable>
export type MovieTable = InferSelectModel<typeof MovieTable>
export type GenreTable = InferSelectModel<typeof GenreTable>
export type UserTable = InferSelectModel<typeof UserTable>




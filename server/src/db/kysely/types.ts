
import { ColumnType, Generated, Selectable} from "kysely";

export interface Database{
  watchListItems: WatchListItemTable,
  ratings: RatingTable
  movies: MovieTable,
  genres: GenreTable,
  users: UserTable,
}

export interface WatchListItemTable{
  id: Generated<string>,
  userId: string,
  movieId: string,
  status?: string | null,
  createdAt: ColumnType<Date, string | undefined, never>,
  updatedAt: ColumnType<Date, string | undefined, Date>,
  deletedAt: ColumnType<Date| null, null, Date | null>
}
export interface RatingTable{
  id: Generated<string>,
  userId: string,
  movieId: string,
  rating: number,
  review?: string,
  createdAt: ColumnType<Date, string | undefined, never>,
  updatedAt: ColumnType<Date, string | undefined, Date>,
  deletedAt: ColumnType<Date| null, null, Date | null>
}
export interface MovieTable{
  id: Generated<string>,
  title: string,
  releaseYear: number,
  posterUrl: string,
  description?: string | null; 
  createdAt: ColumnType<Date, string | undefined, never>,
  updatedAt: ColumnType<Date, string | undefined, Date>,
  deletedAt: ColumnType<Date| null, null, Date | null>
}
export interface GenreTable{
  id: Generated<string>,
  name: string 
}
export interface UserTable{
  id: Generated<string>,
  role: 'user' | 'admin',
  name: string,
  email: string,
  birthDate: Date,
  createdAt: ColumnType<Date, string | undefined, never>,
  updatedAt: ColumnType<Date | null, string | undefined, Date>,
  deletedAt: ColumnType<Date | null, null, Date | null>
}

export type WatchListItem = Selectable<WatchListItemTable>
export type Rating = Selectable<RatingTable>
export type Movie = Selectable<MovieTable>
export type Genre = Selectable<GenreTable>
export type User = Selectable<UserTable>
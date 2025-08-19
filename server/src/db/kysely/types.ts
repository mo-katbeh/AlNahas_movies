
import { ColumnType, Generated, Selectable} from "kysely";

export interface Database{
  genre: GenreTable,
  movie: MovieTable,
  user: UserTable,
  watchListItems: WatchListItemTable
}

export interface GenreTable{
  id: Generated<string>,
  name: string 
}
export interface MovieTable{
  id: Generated<string>,
  title: string,
  releaseYear?: Date | null,
  posterUrl: string,
  rating?: string | null,
  description?: string | null; 
}
export interface UserTable{
  id: Generated<string>,
  name: string,
  email: string,
  birthDate: Date,
  createdAt: ColumnType<Date, string | undefined, never>
}
export interface WatchListItemTable{
  id: Generated<string>,
  status?: string | null,
  review?: string | null
}

export type User = Selectable<UserTable>
export type Movie = Selectable<MovieTable>
export type Genre = Selectable<GenreTable>
export type WatchListItem = Selectable<WatchListItemTable>

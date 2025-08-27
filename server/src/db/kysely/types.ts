
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { RatingsTable, MovieTable,  UserTable, WatchListItemTable, UserProfileTable } from "../schemas/indexTables";
import { ColumnType } from "kysely";


export interface Database{
  watchListItems: WatchListItemType
  ratings: RatingType
  movies: MovieType
  userProfile: UserProfileType
  users: UserType
}

export type WatchListItemType = Partial<InferSelectModel<typeof WatchListItemTable>>
export type InsertWatchListItemType = Partial<InferInsertModel<typeof WatchListItemTable>>
export type RatingType = InferSelectModel< typeof RatingsTable>
export type MovieType = InferSelectModel<typeof MovieTable>
export type UserProfileType =InferSelectModel<typeof UserProfileTable>
export type UserType = Partial<InferSelectModel<typeof UserTable>>

export interface WatchListItemTable {
  id?: string
  userId: string
  movieId: string
  status: "planned" | "watching" | "completed" | null
  createdAt?: Date
  updatedAt?: Date
}


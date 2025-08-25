
import { InferSelectModel } from "drizzle-orm";
import { RatingsTable, MovieTable,  UserTable, WatchListItemTable, UserProfileTable } from "../schemas/indexTables";


export interface Database{
  watchListItems: WatchListItemType
  ratings: RatingType
  movies: MovieType
  userProfile: UserProfileType
  users: UserType
}

export type WatchListItemType = InferSelectModel<typeof WatchListItemTable>
export type RatingType = InferSelectModel< typeof RatingsTable>
export type MovieType = InferSelectModel<typeof MovieTable>
export type UserProfileType =InferSelectModel<typeof UserProfileTable>
export type UserType = InferSelectModel<typeof UserTable>




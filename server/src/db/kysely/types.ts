
import { RatingsTable, MovieTable,  UserTable, WatchListItemTable, UserProfileTable, AccountTable, SessionTable, VerificationTable } from "../schemas/indexTables";
import { Kyselify } from "drizzle-orm/kysely";



export interface Database{
  watchlist_items: WatchListItemType
  ratings: RatingType
  movies: MovieType
  user_profile: UserProfileType
  user: UserType
  account: AccountType
  session: SessionType
  verification: VerificationType
}

export type WatchListItemType = Kyselify<typeof WatchListItemTable>
export type RatingType = Kyselify<typeof RatingsTable>
export type MovieType = Kyselify<typeof MovieTable>
export type UserProfileType =Kyselify<typeof UserProfileTable>
export type UserType = Kyselify<typeof UserTable>
export type AccountType =  Kyselify<typeof AccountTable>
export type SessionType =  Kyselify<typeof SessionTable>
export type VerificationType =  Kyselify<typeof VerificationTable>


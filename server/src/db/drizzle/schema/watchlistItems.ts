import { pgTable, uuid, varchar, integer, text, pgEnum } from 'drizzle-orm/pg-core';
import { Users, Movies } from './index';

export const MovieStatus = pgEnum("movieStatus", ["WATCHED", "TO_WATCH"]);
export const WatchListItems = pgTable('watchlist_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => Users.id),
  movieId: uuid('movie_id').references(() => Movies.id),
  status: MovieStatus("movieStatus").default("TO_WATCH").notNull(),
  rating: integer('rating'), // optional
  review: text('review'), // optional
});

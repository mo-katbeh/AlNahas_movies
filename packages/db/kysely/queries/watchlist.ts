// src/db/queries/watchlist.ts
import db from "../client" 

export async function getWatchlistByUser() {
  return await db
    .selectFrom('users')
    .selectAll()
    // .selectAll()
    // .where('user_id', '=', userId)
    .execute();
}

export async function getMoviesWithCategories() {
  return await db
    .selectFrom('moviecategories')
    .innerJoin('categories', 'categories.id', 'moviecategories.categoryId')
    .innerJoin('movies', 'movies.id', 'moviecategories.movieId')
    .select([
      'movies.title',
      'categories.name as categoryName',
    ])
    .execute();
}

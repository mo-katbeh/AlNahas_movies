// src/db/queries/watchlist.ts
import db from "../client" 



export async function getWatchlistForUser(userId: string) {
  const rows = await db
    .selectFrom('watchlist_items')
    .innerJoin('movies', 'movies.id', 'watchlist_items.movie_id')
    .select([
      'movies.id as movieId',
      'movies.title',
      'movies.year',
      'movies.posterUrl',
      'movies.genres',
      'movies.director',
      'movies.rating as movieRating',
      'movies.description',
      'watchlist_items.status as watchlistStatus',
      'watchlist_items.rating as userRating',
      'watchlist_items.review as userReview'
    ])
    .where('watchlist_items.user_id', '=', userId)
    .execute();

  return rows.map(row => ({
    movieId: row.movieId,
    title: row.title,
    year: row.year,
    posterUrl: row.posterUrl,
    genres: row.genres,
    director: row.director,
    movieRating: row.movieRating,
    description: row.description,
    watchlistStatus: row.watchlistStatus,
    userRating: row.userRating,
    userReview: row.userReview
  }));
}



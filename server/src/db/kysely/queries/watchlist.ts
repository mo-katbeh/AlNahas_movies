// src/db/queries/watchlist.ts
import db from "../client" 



export async function getMoviesWithCategories(userId: string) {
  

  const rows = await db
    .selectFrom('watchlist_items')
    .innerJoin('movies', 'movies.id', 'watchlist_items.movie_id')
    .leftJoin('moviecategories', 'moviecategories.movieId', 'movies.id')
    .leftJoin('categories', 'categories.id', 'moviecategories.categoryId')
    // .leftJoin('watchlist_items', 'watchlist_items.id', 'watchlist_items.user_id')
    .select([
      'movies.id as movieId',
      'movies.title',
      'movies.year',
      'categories.id as categoryId',
      'categories.name as categoryName',
      // 'watchlist_items.rating as rating',
      // 'watchlist_items.review as review',
      // 'watchlist_items.status as status'

    ])
    .where('watchlist_items.user_id', '=', userId)
    .execute();
    
  const movieMap = new Map<string, {
    movieId: string;
    title: string;
    year: number | null;
    categories: { id: string; name: string }[];
    // rating: number ;
    // review: string ;
    // status: string ;

  }>();

  for (const row of rows) {
    if (!movieMap.has(row.movieId)) {
      movieMap.set(row.movieId, {
        movieId: row.movieId,
        title: row.title!,
        year: row.year,
        categories: [],
        // rating: row.rating!,
        // review: row.review!,
        // status: row.status!
      });
    }

    if (row.categoryId && row.categoryName) {
      const movie = movieMap.get(row.movieId)!;
      movie.categories.push({ id: row.categoryId, name: row.categoryName });
    }
  }

  return [...movieMap.values()];
}


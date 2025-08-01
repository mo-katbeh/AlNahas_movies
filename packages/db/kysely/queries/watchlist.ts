// src/db/queries/watchlist.ts
import db from "../client" 


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

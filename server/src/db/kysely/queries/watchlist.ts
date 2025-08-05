// src/db/queries/watchlist.ts
import db from "../client" 

export async function getMovies() {
  return await db
    .selectFrom('movies')
    .selectAll()
    .execute();
}

export async function getMoviesWithCategories() {
  const rows = await db
    .selectFrom('movies')
    .leftJoin('moviecategories', 'moviecategories.movieId', 'movies.id')
    .leftJoin('categories', 'categories.id', 'moviecategories.categoryId')
    .select([
      'movies.id as movieId',
      'movies.title',
      'movies.year',
      'categories.id as categoryId',
      'categories.name as categoryName'
    ])
    .execute();

  const movieMap = new Map<string, {
    movieId: string;
    title: string;
    year: number | null;
    categories: { id: string; name: string }[];
  }>();

  for (const row of rows) {
    if (!movieMap.has(row.movieId)) {
      movieMap.set(row.movieId, {
        movieId: row.movieId,
        title: row.title!,
        year: row.year,
        categories: []
      });
    }

    if (row.categoryId && row.categoryName) {
      const movie = movieMap.get(row.movieId)!;
      movie.categories.push({ id: row.categoryId, name: row.categoryName });
    }
  }

  return [...movieMap.values()];
}

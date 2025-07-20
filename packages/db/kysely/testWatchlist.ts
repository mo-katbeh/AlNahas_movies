// src/testWatchlist.ts
import 'dotenv/config'; // to load DATABASE_URL from .env
import { getWatchlistByUser, getMoviesWithCategories } from './queries/watchlist';

async function main() {
  try {
    const userId = 'ba71812c-33be-4dd9-abe6-4e7481917566'; // replace with real UUID from DB
    const watchlist = await getWatchlistByUser();
    console.log('User Watchlist:', watchlist);
    const moviecategories = await getMoviesWithCategories()
    console.log('Movie Categories:', moviecategories)
  } catch (error) {
    console.error('Error running watchlist query:', error);
  } finally {
    process.exit(0);
  }
}

main();

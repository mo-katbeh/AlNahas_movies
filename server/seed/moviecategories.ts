import { eq } from "drizzle-orm";
import  db  from "../src/db/kysely/client"
import { sql } from 'kysely'

// async function seedMovieCategories() {
//   const movies = await db.selectFrom('movies').select(['id']).execute();
//   const categories = await db.selectFrom('categories').select(['id']).execute();

//   if (!movies.length || !categories.length) {
//     console.log("❌ Movies or categories table is empty");
//     process.exit(1);
//   }

//   const inserts = [];

//   for (const movie of movies) {
   

//     const selectedCategories = [...categories]
//       .sort(() => 0.5 - Math.random()) // Shuffle
//       .slice(0, 1);
//     for (const category of selectedCategories) {
//       inserts.push(
//         db.insertInto('moviecategories').values({
//           movieId: movie.id,
//           categoryId: category.id,
//         }).execute()
//       );
//     }
//   }

//   await Promise.all(inserts);
//   console.log(`✅ Seeded ${inserts.length} movie-category links`);
// }

// seedMovieCategories()
//   .catch((err) => {
//     console.error("❌ Seeding failed:", err);
//     process.exit(1);
//   });


// Helper function to get a random item from an array

// async function seedWatchlistItems() {
//   const users = await db.selectFrom("users").select(["id"]).execute();
//   const movies = await db.selectFrom("movies").select(["id"]).execute();

//   if (!users.length || !movies.length) {
//     console.error("❌ Users or Movies table is empty. Seed them first.");
//     process.exit(1);
//   }

//   const sampleReviews = [
//     "Amazing movie!",
//     "Not bad.",
//     "Loved the visuals.",
//     "Great acting.",
//     "Could've been better.",
//     "Boring plot.",
//     "Highly recommended!",
//     "Would not watch again.",
//   ];

//   const inserts = [];

//   for (let i = 0; i < 1000; i++) {
//     const user = users[Math.floor(Math.random() * users.length)];
//     const movie = movies[Math.floor(Math.random() * movies.length)];
//     const status = Math.random() < 0.5 ? "WATCHED" : "TO_WATCH";

//     const rating = status === "WATCHED" ? Math.floor(Math.random() * 6) : null;
//     const review =
//       status === "WATCHED"
//         ? sampleReviews[Math.floor(Math.random() * sampleReviews.length)]
//         : null;

//     inserts.push(
//       db.insertInto("watchlist_items").values({
//         user_id: user.id,
//         movie_id: movie.id,
//         rating,
//         review,
//       }).execute()
//     );
//   }

//   await Promise.all(inserts);

//   console.log(`✅ Seeded ${inserts.length} watchlist items.`);
// }

// seedWatchlistItems().catch((err) => {
//   console.error("❌ Seeding failed:", err);
//   process.exit(1);
// });


// const TMDB_KEY = "dc936e880bf6db6c7cf751021d426b0d";
// const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";

// async function fetchTmdbPoster(title: string, year?: number) {
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(title)}${year ? `&year=${year}` : ""}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   if (data.results && data.results.length > 0) {
//     const posterPath = data.results[0].poster_path;
//     return posterPath ? `${TMDB_IMG_BASE}${posterPath}` : null;
//   }

//   return null;
// }

// async function seedPosterUrls() {
//   const movies = await db
//     .selectFrom('movies')
//     .select(['id', 'title', 'year'])
//     .execute();

//   for (const movie of movies) {
//     try {
//       let poster = await fetchTmdbPoster(movie.title, movie.year);
//       if (!poster) {
//         // Try without year if no match
//         poster = await fetchTmdbPoster(movie.title);
//       }

//       if (poster) {
//         await db
//           .updateTable('movies')
//           .set({ posterUrl: poster })
//           .where('movies.id', '=', movie.id)
//           .execute();

//         console.log(`✅ Updated: ${movie.title}`);
//       } else {
//         console.warn(`⚠ No poster found for: ${movie.title}`);
//       }
//     } catch (err) {
//       console.error(`❌ Error updating ${movie.title}:`, err);
//     }
//   }

//   console.log("🎉 Poster URLs seeding complete!");
// }

// seedPosterUrls()
//   .then(() => process.exit(0))
//   .catch((err) => {
//     console.error("❌ Seeding failed:", err);
//     process.exit(1);
//   });

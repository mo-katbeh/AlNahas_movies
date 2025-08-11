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
//     // Pick 1–3 random categories per movie
//     const numberOfCategories = Math.floor(Math.random() * 3) + 1;
//     const selectedCategories = [...categories]
//       .sort(() => 0.5 - Math.random()) // Shuffle
//       .slice(0, numberOfCategories);

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

async function seedWatchlistItems() {
  const users = await db.selectFrom("users").select(["id"]).execute();
  const movies = await db.selectFrom("movies").select(["id"]).execute();

  if (!users.length || !movies.length) {
    console.error("❌ Users or Movies table is empty. Seed them first.");
    process.exit(1);
  }

  const sampleReviews = [
    "Amazing movie!",
    "Not bad.",
    "Loved the visuals.",
    "Great acting.",
    "Could've been better.",
    "Boring plot.",
    "Highly recommended!",
    "Would not watch again.",
  ];

  const inserts: Promise<any>[] = [];

  for (const user of users) {
    // Decide how many movies to assign (0–10)
    const movieCount = Math.floor(Math.random() * 11); // 0 to 10

    // Pick random movies without duplicates
    const shuffledMovies = [...movies].sort(() => Math.random() - 0.5);
    const selectedMovies = shuffledMovies.slice(0, movieCount);

    for (const movie of selectedMovies) {
      const status = Math.random() < 0.5 ? "WATCHED" : "TO_WATCH";
      const rating = status === "WATCHED" ? Math.floor(Math.random() * 6) : null;
      const review =
        status === "WATCHED"
          ? sampleReviews[Math.floor(Math.random() * sampleReviews.length)]
          : null;

      inserts.push(
        db
          .insertInto("watchlist_items")
          .values({
            user_id: user.id,
            movie_id: movie.id,
            rating,
            review,
            // status,
          })
          .execute()
      );
    }
  }

  await Promise.all(inserts);

  console.log(`✅ Seeded ${inserts.length} watchlist items.`);
}

seedWatchlistItems().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

import  db  from "../src/db/kysely/client"
import { sql } from 'kysely'

async function seedMovieCategories() {
  const movies = await db.selectFrom('movies').select(['id']).execute();
  const categories = await db.selectFrom('categories').select(['id']).execute();

  if (!movies.length || !categories.length) {
    console.log("❌ Movies or categories table is empty");
    process.exit(1);
  }

  const inserts = [];

  for (const movie of movies) {
    // Pick 1–3 random categories per movie
    const numberOfCategories = Math.floor(Math.random() * 3) + 1;
    const selectedCategories = [...categories]
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, numberOfCategories);

    for (const category of selectedCategories) {
      inserts.push(
        db.insertInto('moviecategories').values({
          movieId: movie.id,
          categoryId: category.id,
        }).execute()
      );
    }
  }

  await Promise.all(inserts);
  console.log(`✅ Seeded ${inserts.length} movie-category links`);
}

seedMovieCategories()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
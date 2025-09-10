import  db  from "../src/db/kysely/client"
import { WatchListItemInput } from "../src/db/zod/watchListItemType";


// async function seedRaings() {
//   const movies = await db.selectFrom('movies').select('id').execute();
//   const users = await db.selectFrom('users').select('id').execute();
//   const inserts = [];
//   const reviews = [
//     'Amazing movie!',
//     'Not bad.',
//     'Boring plot.',
//     'Could have been better.',
//     'Loved the visuals.',
//     'Highly recommended!',
//     'Great acting.',
//     'Would not watch again.'
//   ];

//   if(!movies.length || !users.length) console.error("Movies or users table empty")
//   for( const user of users){
//     const numberOfMovies = Math.floor(Math.random() * 15) +  1

//     const selectedMovies = [...movies]
//     .sort(()=> Math.random() - 5)
//     .slice(0, numberOfMovies)
//     for( const movie of selectedMovies){
//       const rating = parseFloat((Math.random() * 5).toFixed(1));
//       const review = rating!== null ? reviews[Math.floor(Math.random() * reviews.length)] : null
//       inserts.push({
//         user_id: user.id,
//         movie_id: movie.id,
//         rating,
//         review
//       })
//     }
// }
// console.log("insert", inserts)
//   if(inserts.length > 0){
//       await db
//       .insertInto('ratings')
//       .values(inserts)
//       .execute();
    
//      console.log(`Inserted ${inserts.length} ratings.`);
//   }
// }
// seedRaings()
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
// async function seedUserProfile() {
  
//   const users = await db.selectFrom('users').select('id').execute();
//   console.log(users)
//   if( !users.length) console.error(" users table empty")
//     const profiles = await db
//     .selectFrom('user_profile')
//     .select(['id', 'user_id'])
//     .where('user_id', 'is', null)   // only empty ones
//     .execute();
//     if (!profiles.length) {
//     console.log("ℹ️ No user profiles to update");
//     return;
//   }

//   const num = 1
//   for (let i = 0; i < profiles.length && i < users.length; i++) {
//     const profile = profiles[i];
//     const user = users[i]; // match 1-to-1

//     await db
//       .updateTable('user_profile')
//       .set({ user_id: user.id })   // ✅ set user_id, not null
//       .where('id', '=', profile.id)
//       .execute();

//     console.log(`✅ Linked profile ${profile.id} → user ${user.id}`);
//   }
//  }
// seedUserProfile()
//  .then(() => process.exit(0))
//  .catch(err=>{
//   console.log("❌ Seeding failed:", err

//   );
//   process.exit(1)
//  })

// async function seedWatcList() {
  
//   const users = await db.selectFrom('users').select('id').execute();
//   const movies = await db.selectFrom('movies').select('id').execute();
//   const statusesMovie = ["planned", "watching", "completed"] as const
//   const inserts = [];

//   if(!users.length || !movies.length){
//     console.log("users or movies table emptys")
//   }
//   for(const user of users){
//     const numberOfMovies = Math.floor(Math.random() * 30) + 1

//     const selectedMovies = [...movies]
//     .sort(()=> Math.random() -0.5)
//     .slice(0, numberOfMovies)
//     for( const movie of selectedMovies){
//     const status = statusesMovie[Math.floor(Math.random() * statusesMovie.length) ]
//     inserts.push({
//       user_id: user.id,
//       movie_id: movie.id,
//       status
//       })
//       }
//     }
//     console.log(`Prepared ${inserts.length} watchlist items for insertion`);
//     console.log("data inserted", inserts)
//   if(inserts.length > 0){
//     await db
//     .insertInto('watchlist_items')
//     .values(inserts)
//     .execute();
//     // console.log(`✅ Inserted ${inserts.length} watchlist items`);
// }
// }
// seedWatcList()
//   .then(()=> process.exit(0))
//   .catch(err =>{
//     console.log("seeding filed" ,err)
//     process.exit(1)
//   })


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
//     .select(['id', 'title', 'release_year'])
//     .execute();

//   for (const movie of movies) {
//     try {
//       let poster = await fetchTmdbPoster(movie.title, movie.release_year);
//       if (!poster) {
//         // Try without year if no match
//         poster = await fetchTmdbPoster(movie.title);
//       }

//       if (poster) {
//         await db
//           .updateTable('movies')
//           .set({ poster_url: poster })
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


// async function seedWatchlistItems() {
//   // Fetch existing users and movies
//   const users = await db.selectFrom('users').select(['id']).execute();
//   const movies = await db.selectFrom('movies').select(['id']).execute();

//   if (!users.length || !movies.length) {
//     console.error('No users or movies found!');
//     return;
//   }

//   const statuses = ['WATCHED', 'TO_WATCH'];
//   const reviews = [
//     'Amazing movie!',
//     'Not bad.',
//     'Boring plot.',
//     'Could have been better.',
//     'Loved the visuals.',
//     'Highly recommended!',
//     'Great acting.',
//     'Would not watch again.'
//   ];

//   const inserts = [];

//   for (const user of users) {
//     // Give each user a few random movies
//     const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 10);

//     for (const movie of randomMovies) {
//       const status = statuses[Math.floor(Math.random() * statuses.length)];
//       const rating = status === 'WATCHED' ? Math.floor(Math.random() * 6) : null;
//       const review = rating !== null ? reviews[Math.floor(Math.random() * reviews.length)] : null;

//       inserts.push({
//         user_id: user.id,   // snake_case for DB
//         movie_id: movie.id, // snake_case for DB
//         rating,
//         review
//       });
//     }
//   }

//   await db
//     .insertInto('watchlist_items')
//     .values(inserts)
//     .execute();

//   console.log(`Inserted ${inserts.length} watchlist items.`);
// }

// seedWatchlistItems()
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
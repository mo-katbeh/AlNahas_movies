ALTER TABLE "watchlist_items" RENAME TO "watchlistItems";--> statement-breakpoint
ALTER TABLE "watchlistItems" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "watchlistItems" RENAME COLUMN "movie_id" TO "movieId";--> statement-breakpoint
ALTER TABLE "watchlistItems" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "watchlistItems" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "watchlistItems" DROP CONSTRAINT "watchlist_items_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "watchlistItems" DROP CONSTRAINT "watchlist_items_movie_id_movies_id_fk";
--> statement-breakpoint
DROP INDEX "user_movie_index";--> statement-breakpoint
ALTER TABLE "watchlistItems" ADD CONSTRAINT "watchlistItems_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlistItems" ADD CONSTRAINT "watchlistItems_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "userMovieIndex" ON "watchlistItems" USING btree ("movieId","userId");
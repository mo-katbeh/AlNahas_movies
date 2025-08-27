ALTER TABLE "watchlistItems" RENAME TO "watchlist_items";--> statement-breakpoint
ALTER TABLE "watchlist_items" DROP CONSTRAINT "watchlistItems_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "watchlist_items" DROP CONSTRAINT "watchlistItems_movieId_movies_id_fk";
--> statement-breakpoint
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
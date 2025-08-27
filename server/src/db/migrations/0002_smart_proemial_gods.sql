ALTER TABLE "ratings" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "ratings" RENAME COLUMN "movieId" TO "movie_id";--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_movieId_movies_id_fk";
--> statement-breakpoint
DROP INDEX "uesrMovieIndex";--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "uesr_movie_index" ON "ratings" USING btree ("movie_id","user_id");
ALTER TABLE "ratings" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "ratings" RENAME COLUMN "movie_id" TO "movieId";--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_movie_id_movies_id_fk";
--> statement-breakpoint
DROP INDEX "uesr_movie_index";--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "uesrMovieIndex" ON "ratings" USING btree ("movieId","userId");
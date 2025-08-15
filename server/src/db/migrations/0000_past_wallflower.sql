CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"year" integer,
	"posterUrl" text,
	"genres" varchar(255),
	"director" varchar(255),
	"rating" integer,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "watchlist_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"movie_id" uuid,
	"status" varchar(255),
	"rating" integer,
	"review" text
);
--> statement-breakpoint
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;
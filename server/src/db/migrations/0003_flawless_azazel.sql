ALTER TABLE "user_profile" RENAME TO "userProfile";--> statement-breakpoint
ALTER TABLE "userProfile" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "userProfile" RENAME COLUMN "birth_date" TO "birthDate";--> statement-breakpoint
ALTER TABLE "userProfile" RENAME COLUMN "first_name" TO "firstName";--> statement-breakpoint
ALTER TABLE "userProfile" RENAME COLUMN "last_name" TO "lastName";--> statement-breakpoint
ALTER TABLE "userProfile" RENAME COLUMN "phone_number" TO "phoneNumber";--> statement-breakpoint
ALTER TABLE "userProfile" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "userProfile" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "userProfile" DROP CONSTRAINT "user_profile_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
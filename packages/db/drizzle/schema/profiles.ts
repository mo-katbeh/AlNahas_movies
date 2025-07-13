import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { Users } from './index';

export const Profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').unique().references(() => Users.id),
  bio: text('bio'),
});
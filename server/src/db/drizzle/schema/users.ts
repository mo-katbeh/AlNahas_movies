import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255}),
  email: varchar('email', { length: 255 }).unique(),
});

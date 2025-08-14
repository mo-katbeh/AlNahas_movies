import { pgTable, uuid, varchar, integer, text } from 'drizzle-orm/pg-core';

export const Movies = pgTable('movies', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  year: integer('year'),
  posterUrl: text("posterUrl")
});

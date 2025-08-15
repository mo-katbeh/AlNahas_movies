import { pgTable, uuid, varchar, integer, text } from 'drizzle-orm/pg-core';

export const Movies = pgTable('movies', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  year: integer('year'),
  posterUrl: text('posterUrl'),
  genres: varchar('genres', { length: 255 }),
  director: varchar('director', {length: 255}),
  rating: integer('rating'),
  description: text('description')
});

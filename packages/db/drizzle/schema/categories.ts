import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const Categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }),
  
});

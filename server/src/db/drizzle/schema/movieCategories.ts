
import { pgTable, primaryKey, uuid} from "drizzle-orm/pg-core"
import { Movies, Categories  } from "./index"

export const MovieCategories = pgTable("moviecategories",{
    movieId: uuid('movieId').references(()=> Movies.id).notNull(),
    categoryId: uuid('categoryId').references(()=> Categories.id).notNull(),

}, (table) => ({
    pk: primaryKey({ columns:[table.movieId, table.categoryId] })
}))
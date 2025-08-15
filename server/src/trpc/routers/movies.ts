import { publicProcedure, router } from "../init";
import { getMovies} from "../../db/kysely/queries/movies"

export const movieRouter = router({
    getAll: publicProcedure
      .query(async() =>{
        const movies = await getMovies();
        // console.log("movies is", movies)
        return movies;
      })
})
import { trpc } from "../../utils/trpc";

const Movie = () => {
  const { data: movies } = trpc.movie.fetchMovies.useQuery();

  return (
    <div>
      {movies?.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </div>
  );
};

export default Movie;

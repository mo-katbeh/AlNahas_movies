import React from "react";
import { trpc } from "utils/trpc";

const Movie = () => {
  const { data: movies, isLodaing, error } = trpc.movie.fetchMovies.useQuery();

  return <div>Movie</div>;
};

export default Movie;

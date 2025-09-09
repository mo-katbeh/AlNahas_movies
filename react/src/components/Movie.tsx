import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useQuery } from "@tanstack/react-query";

interface movieQuery {
  page: number;
  pageSize: number;
}
const Movie = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const {
    data: movies,
    error,
    isLoading,
  } = trpc.movie.fetchMovies.useQuery({
    page,
    pageSize,
  });
  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p> Loading... </p>;
  return (
    <div className="flex flex-row gap-7 p-0.5 overflow-x-scroll overflow-hidden">
      {movies?.map((movie) => (
        //<li key={movie.id}>
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-[200px] h-[300px] object-cover"
        />
        //</li>
      ))}
      <button onClick={() => setPage(page - 1)}>Privous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Movie;

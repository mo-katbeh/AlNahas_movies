import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { FaChevronRight } from "react-icons/fa6";
import { type MovieType } from "../../../server/src/db/zod/movieType";
import { BiSolidTagAlt } from "react-icons/bi";
const Movie = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | undefined>();
  const {
    data: movies,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.movie.infiniteMovies.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  // const {data: ratings} = trpc.movie.fetchRatingsOfMovies.useQuery()
  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p> Loading... </p>;
  return (
    <>
      <ScrollArea>
        <div className="flex w-max space-x-6 p-14">
          {movies?.pages.map((page) =>
            page.movies.map((movie) => (
              <div key={movie.id} className="shrink-0">
                <div
                  className="w-[250px] h-[300px] overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-130 p-2"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={movie.poster_url ?? "../assets/main.jpg"}
                    alt={movie.title}
                    className="w-full h-full rounded-2xl"
                  />
                </div>
              </div>
            ))
          )}

          <div />
          <div className="flex justify-center mt-4"></div>
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className=" w-[40px] h-[300px] rounded-xl mask-l-from-red-800 hover:bg-black "
          >
            {isFetchingNextPage ? (
              "Loading more..."
            ) : hasNextPage ? (
              <FaChevronRight />
            ) : (
              "No more movies"
            )}
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {selectedMovie && (
        <div className="m-2 ml-20 w-dvh">
          <h2 className="mb-3 text-4xl font-semibold text-white">
            {selectedMovie.title}
          </h2>

          {selectedMovie &&
            movies?.pages
              .flatMap((page) => page.ratingsOfMovie)
              .find((movie) => (movie.id = selectedMovie.id))?.ratings_avg &&
            movies.pages
              .flatMap((page) => page?.ratingsOfMovie)
              .find((movie) => movie?.id === selectedMovie.id)?.ratings_avg}

          <p className="mb-3 text-white font-semibold text-xl">
            {selectedMovie.genre}
          </p>
          <p className="text-white font-semibold text-xl">
            Relese Year:{" "}
            <span className="text-muted-foreground text-xl">
              {selectedMovie.release_year}{" "}
            </span>
          </p>
          <p className="text-white text-xl">
            Description:{" "}
            <span className="text-muted-foreground text-xl">
              {selectedMovie.description}{" "}
            </span>
          </p>
          <BiSolidTagAlt color="white" fill="blue" size="30" />
        </div>
      )}
    </>
  );
};

export default Movie;

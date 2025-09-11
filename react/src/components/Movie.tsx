import { trpc } from "../../utils/trpc";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { FaChevronRight } from "react-icons/fa6";
const Movie = () => {
  // const{data: movies, } = trpc.movie.infinitMovies.useInfiniteQuery(
  //   {limit: 10},
  //   {getNextPageParam: (lastPage)=> lastPage.nextCursor }
  // )
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
  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p> Loading... </p>;
  return (
    <ScrollArea>
      <div className="flex w-max space-x-6 p-14">
        {movies?.pages.map((page) =>
          page.movies.map((movie) => (
            <figure key={movie.id} className="shrink-0">
              <div className="w-[250px] h-[300px] overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-130 p-2">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full rounded-2xl"
                />
              </div>
            </figure>
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
      <div></div>
    </ScrollArea>
  );
};

export default Movie;

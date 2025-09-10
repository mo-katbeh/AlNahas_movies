import { trpc } from "../../utils/trpc";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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
    { limit: 15 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p> Loading... </p>;
  return (
    <ScrollArea className=" rounded-md ">
      <div className="flex w-max space-x-8 p-4">
        {movies?.pages.map((page) =>
          page.movies.map((movie) => (
            <figure key={movie.id} className="shrink-0">
              <div className="w-[250px] h-[300px] overflow-hidden rounded-2xl">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full "
                />
              </div>
            </figure>
          ))
        )}
        <div />
        <div className="flex justify-center mt-4"></div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No more movies"}
        </button>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
  // return (
  //   <div className="flex flex-row gap-7 p-0.5 overflow-x-scroll overflow-hidden">
  //     {movies?.map((movie) => (
  //       //<li key={movie.id}>
  //       <img
  //         src={movie.poster_url}
  //         alt={movie.title}
  //         className="w-[200px] h-[300px] object-cover"
  //       />
  //       //</li>
  //     ))}
  //     <button onClick={() => setPage(page - 1)}>Privous</button>
  //     <button onClick={() => setPage(page + 1)}>Next</button>
  //   </div>
  // );
};

export default Movie;

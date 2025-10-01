import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { FaChevronRight } from "react-icons/fa6";
import { type MovieType } from "../../../packages/shared/zod/movieType";
import { BiSolidTagAlt } from "react-icons/bi";
import { RatingGroupAdvanced } from "./toggle/rating";
import Loader from "./loader/styled-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface movieQuery {
  page: number;
  pageSize: number;
}
// import { useSession } from "@/hooks/useSession";
const Movie = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const { data: movies, error, isLoading } = trpc.movie.getMovies.useQuery();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | undefined>();
  // const {
  //   data: movies,
  //   error,
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = trpc.movie.infiniteMovies.useInfiniteQuery(
  //   { limit: 10 },
  //   {
  //     getNextPageParam: (lastPage) => lastPage?.nextCursor,
  //   }
  // );
  // trpc.movie.fetchMovies.useQuery({
  //   page,
  //   pageSize
  // })
  // const { session } = useSession();
  const { mutate: createmovie } = trpc.movie.createmovie.useMutation();
  if (error) return <p> {error.message} </p>;
  return (
    <>
      {/* {isLoading ? <Loader /> : null} */}
      {/* <div className="flex flex-col items-center justify-center w-full h-50 px-4 text-center"></div> */}
      <div className="flex w-full items-center justify-center space-x-6 p-8 p-14">
        <Carousel className="w-full ">
          <CarouselPrevious />
          <CarouselContent className="flex items-center justify-center w-full">
            {movies?.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="w-full items-center justify-center md:basis-1/2 lg:basis-1/6"
              >
                {/* <div className="p-1"> */}
                {/* <Card> */}
                {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                <div
                  className="w-full  overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-110 p-2"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={movie.poster_url ?? "../assets/main.jpg"}
                    alt={movie.title}
                    className="w-full h-full rounded-2xl"
                  />
                </div>
                {/* </CardContent> */}
                {/* </Card> */}
                {/* </div> */}
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext />
        </Carousel>
      </div>

      {/* <ScrollArea className="no-scrollbar">
        <Button
          onClick={() =>
            createmovie({
              title: "fire",
              genre: "action",
              releaseYear: 2020,
            })
          }
        >
          Add Movie
        </Button>
        {!movies || movies.pages.every((page) => page?.movies.length === 0) ? (
          <div className="flex flex-col items-center justify-center w-full h-50 px-4 text-center">
            {isLoading ? (
              <Loader />
            ) : (
              <p className="text-2xl md:text-2xl font-semibold text-white line-clamp-6">
                Nothing here yet, stay tuned 👀
              </p>
            )}
          </div>
        ) : (
          <div className="flex w-max space-x-6 p-14">
            {movies?.pages.map((page) =>
              page?.movies.map((movie) => (
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
        )}
        <ScrollBar orientation="horizontal" className="no-scrollbar" />
      </ScrollArea> */}

      {selectedMovie && (
        <div className="m-2 ml-20 w-dvh">
          <h2 className="mb-3 text-4xl font-semibold text-white">
            {selectedMovie.title}
          </h2>

          {/* <p className="text-white font-semibold text-xl">
            Rating:{" "}
            {Number(
              movies?.pages
                .flatMap((page) => page?.moviesWithRatings ?? [])
                .find((movie) => movie.id === selectedMovie.id)?.avg_ratings
            ).toFixed(1)}
          </p> */}
          <RatingGroupAdvanced />

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

import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { type MovieType } from "../../../packages/shared/zod/movieType";
import { BiSolidTagAlt } from "react-icons/bi";
import { RatingGroupAdvanced } from "./toggle/rating";
import Loader from "./loader/styled-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TfiMoreAlt } from "react-icons/tfi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { authClient } from "../../utils/auth-client";
import { useQuery } from "@tanstack/react-query";
const getSession = async () => {
  const { data: session, error } = await authClient.getSession();
  if (!error) return session;
  throw new Error(error.message);
};
const Movie = () => {
  const { data, error, isLoading } = trpc.movie.getMovies.useQuery();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | undefined>();
  const { mutate, error: watchlistError } =
    trpc.watchlist.addToWatchlist.useMutation({
      onSuccess: () => {
        console.log("movie added");
      },
    });
  const { data: session } = useQuery({
    queryKey: ["auth", "get-session"],
    queryFn: getSession,
  });
  // const { mutate: createmovie } = trpc.movie.createmovie.useMutation();
  if (error) console.log("Error in movie page", error);
  if (watchlistError) console.log("Error in movie page", watchlistError);
  return (
    <>
      {/* <Button
        type="submit"
        className="mb-10"
        onClick={() =>
          createmovie({ title: "dragon", releaseYear: 2020, genre: "Action" })
        }
      >
        Add Movie
      </Button> */}
      <div className="flex w-full items-center justify-center space-x-6 p-14">
        <Carousel className="w-full ">
          <CarouselPrevious />
          {!data?.movies ? (
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
            <CarouselContent className="flex items-center justify-center w-full">
              {data?.movies?.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className=" relative w-full items-center justify-center md:basis-1/3 lg:basis-1/6"
                >
                  <div
                    className="relative w-full  overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-105 p-2"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className="fixed m-2 p-0.5 bg-white/70 rounded-md hover:bg-white "
                          // className="absolute top-2 right-2 p-1 bg-white/70 rounded-md hover:bg-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <TfiMoreAlt className="text-gray-700" size={16} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="fixed" align="start">
                        <DropdownMenuItem
                          onClick={() => {
                            if (session?.user) {
                              mutate({
                                userId: session.user.id,
                                movieId: selectedMovie?.id,
                              });
                            }
                          }}
                        >
                          Add to Watchlist
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        // onClick={() => console.log("Details", movie.title)}
                        >
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <img
                      src={movie.poster_url ?? undefined}
                      alt={movie.title}
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
          <CarouselNext />
        </Carousel>
      </div>

      {selectedMovie && (
        <div className="m-2 ml-20 w-dvh">
          <h2 className="mb-3 text-4xl font-semibold text-white">
            {selectedMovie.title}
          </h2>
          <p className="text-white font-semibold text-xl">
            Rating:
            {Number(
              (data?.moviesWithRatings ?? []).find(
                (movie) => movie.id === selectedMovie.id
              )?.avg_ratings
            ).toFixed(1)}
          </p>

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

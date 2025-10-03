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
import { Button } from "./ui/button";

const Movie = () => {
  const { data, error, isLoading } = trpc.movie.getMovies.useQuery();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | undefined>();

  const { mutate: createmovie } = trpc.movie.createmovie.useMutation();
  if (error) console.log("Error in movie page", error);
  return (
    <>
      <Button
        type="submit"
        className="mb-10"
        onClick={() =>
          createmovie({ title: "dragon", releaseYear: 2020, genre: "Action" })
        }
      >
        Add Movie
      </Button>
      <div className="flex w-full items-center justify-center space-x-6 p-8 p-14">
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
                  className="w-full items-center justify-center md:basis-1/2 lg:basis-1/6"
                >
                  <div
                    className="w-full  overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-105 p-2"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <img
                      src={movie.poster_url ?? "../assets/main.jpg"}
                      alt={movie.title}
                      className="w-full h-full rounded-2xl"
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

import { VideoPlayer, VideoPlayerContent } from "./ui/shadcn-io/video-player";
import thriller from "../assets/videos/thriller.mp4";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { trpc } from "../../utils/trpc";
import Loader from "./loader/styled-wrapper";
import { Link, useNavigate } from "@tanstack/react-router";

export const Home = () => {
  const navigate = useNavigate();
  const { data: movies, error, isLoading } = trpc.movie.getAllMovies.useQuery();
  if (error) console.log("Error in home page", error);
  return (
    <>
      <div className="relative  w-full h-[90vh] overflow-hidden ">
        <VideoPlayer className="w-full h-full">
          <VideoPlayerContent
            muted
            loop
            preload="auto"
            autoPlay
            playsInline
            slot="media"
            src={thriller}
            className="w-full h-full rounded-2xl object-cover"
          />
        </VideoPlayer>
        <div className="absolute h-full inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center drop-shadow-xl leading-tight">
            Unlimited Movies, TV Shows, and More
          </h1>
          <p className="mt-4 text-gray-200 text-lg md:text-2xl text-center max-w-2xl">
            Watch anywhere. Cancel anytime. Your entertainment, your way.
          </p>
          <button className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition-transform hover:scale-105">
            <Link to="/movies">Get Started</Link>
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-center space-y-6 py-14 px-10">
        <Carousel className="w-full ">
          <p className="text-2xl ml-2 mb-1 font-bold text-white ">Top Rating</p>
          <CarouselPrevious className="ml-3" />
          {!movies?.moviesByRating ? (
            <div className="flex flex-col items-center justify-center w-full h-50 px-4 text-center">
              {isLoading ? (
                <Loader />
              ) : (
                <p className="text-xl md:text-2xl font-semibold text-white ">
                  Nothing here yet, stay tuned 👀
                </p>
              )}
            </div>
          ) : (
            <CarouselContent className="flex items-center justify-center w-full">
              {movies?.moviesByRating.map((movie) => (
                <CarouselItem
                  onClick={() => {
                    navigate({
                      to: "/movies/$movieId",
                      params: { movieId: String(movie.id) },
                    });
                    console.log("Navigation work");
                  }}
                  key={movie.id}
                  className="w-full items-center justify-center basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
                >
                  <div className="w-full  overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-105 p-2">
                    <img
                      src={movie.poster_url ?? undefined}
                      alt={movie.title}
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}

          <CarouselNext className="mr-3" />
        </Carousel>
      </div>

      <div className="flex flex-col w-full items-start justify-center space-y-6   py-14 px-10">
        <Carousel className="w-full ">
          <p className="text-2xl font-bold ml-2 mb-1 text-white ">Latest</p>
          <CarouselPrevious className="ml-3" />
          {!movies?.movieByYear ? (
            <div className="flex flex-col items-center justify-center w-full h-50 px-4 text-center">
              {isLoading ? (
                <Loader />
              ) : (
                <p className="text-xl md:text-2xl font-semibold text-white ">
                  Nothing here yet, stay tuned 👀
                </p>
              )}
            </div>
          ) : (
            <CarouselContent className="flex items-center justify-center w-full">
              {movies.movieByYear.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="w-full items-center justify-center basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
                >
                  <div className="w-full  overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-105 p-2">
                    <img
                      src={movie.poster_url ?? undefined}
                      alt={movie.title}
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}

          <CarouselNext className="mr-3" />
        </Carousel>
      </div>
    </>
  );
};

export default Home;

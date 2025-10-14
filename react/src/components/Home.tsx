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

export const Home = () => {
  const { data, error, isLoading } = trpc.movie.getMovies.useQuery();
  if (error) console.log("Error in home page", error);
  return (
    <>
      <div className="relative   w-full h-[90vh] overflow-hidden rounded-xl">
        <VideoPlayer className="w-full h-full rounded-2xl">
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
            Get Started
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-center space-y-6  p-14">
        <Carousel className="w-full ">
          <p className="text-3xl font-bold text-white ">Top Rating</p>
          <CarouselPrevious />
          {!data?.movies ? (
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
              {data?.movies?.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="w-full items-center justify-center md:basis-1/3 lg:basis-1/6"
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

          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Home;

import { VideoPlayer, VideoPlayerContent } from "./ui/shadcn-io/video-player";
import thriller from "../assets/videos/thriller.mp4";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { trpc } from "../../utils/trpc";
import { type MovieType } from "../../../packages/shared/zod/movieType";

export const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async () => {
      try {
        await videoRef.current?.play();
      } catch (err) {
        console.log("Autoplay blocked:", err);
      }
    };
    playVideo();
  }, []);
  const { data: movies, error, isLoading } = trpc.movie.getMovies.useQuery();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | undefined>();

  return (
    // <div className="m-4 border borrder-solid  w-full h-[250px]">
    <>
      <div className="relative m-12 overflow-hidden rounded-xl border">
        <VideoPlayer className="w-full h-full">
          <VideoPlayerContent
            ref={videoRef}
            crossOrigin=""
            muted
            preload="auto"
            autoPlay
            playsInline
            slot="media"
            src={thriller}
            className="w-full h-full object-cover"
          />
        </VideoPlayer>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold text-center drop-shadow-xl">
            Unlimited Movies, TV Shows, and More
          </h1>
          <p className="mt-4 text-white/90 text-lg md:text-2xl text-center max-w-2xl">
            Watch anywhere. Cancel anytime. Your entertainment, your way.
          </p>
          <button className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition">
            Get Started
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-center space-x-6 p-8 p-14">
        <Carousel className="w-full ">
          <p className="text-2xl font-bold ">Latest</p>
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
    </>
  );
};

export default Home;

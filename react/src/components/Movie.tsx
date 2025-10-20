import { trpc } from "../../utils/trpc";
// import { BiSolidTagAlt } from "react-icons/bi";
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
import { toast } from "sonner";
import useSelectedMovieStore from "@/state-management/useSelectedMovieStore";
import { Button } from "./ui/button";

interface Props {
  searchQuery: string;
  genre?: string;
  year?: string;
}

const getSession = async () => {
  const { data: session, error } = await authClient.getSession();
  if (!error) return session;
  throw new Error(error.message);
};
const Movie = ({ searchQuery, genre, year }: Props) => {
  const { data, error, isLoading } = trpc.movie.getMovies.useQuery({
    search: searchQuery,
    genre,
    year,
  });
  // const [selectedMovie, setSelectedMovie] = useState<MovieType | undefined>();
  const { selectedMovie, setSelectedMovie } = useSelectedMovieStore();
  const { mutate } = trpc.watchlist.addToWatchlist.useMutation({
    onError: (err) => {
      toast.warning(err.message);
      // console.log("feild add movie to watchlist", err.message);
    },
    onSuccess: (response) => {
      toast.success(`${response[0].title} added successfully`);

      console.log("movie added", response);
    },
  });
  const { data: session, error: sessionError } = useQuery({
    queryKey: ["auth", "get-session"],
    queryFn: getSession,
  });
  const {
    mutate: createmovie,
    isSuccess,
    data: movieAdded,
  } = trpc.movie.createmovie.useMutation({
    onError: (err) => {
      console.log("Field to create movie", err);
    },
  });
  if (error) console.log("Error in movie page", error);
  if (sessionError) console.log("Error in Session", sessionError);
  if (isSuccess) toast.success(`${movieAdded?.title} Successfully added`);
  console.log("user role:", session?.user.role);
  return (
    <>
      {session?.user.role === "admin" ? (
        <div className="p-10">
          <Button
            type="submit"
            className="mb-10"
            onClick={() =>
              createmovie({
                title: "PostMan",
                releaseYear: 2020,
                genre: "Action",
              })
            }
          >
            Add Movie
          </Button>
        </div>
      ) : null}
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
                  className=" relative w-full items-center justify-center basis-1/2  md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/7"
                >
                  <div
                    className="relative w-full  overflow-x-hidden transition duration-300 delay-150 ease-in-out hover:scale-105 p-2"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <DropdownMenu onOpenChange={() => setSelectedMovie(movie)}>
                      <DropdownMenuTrigger asChild>
                        <div
                          className="fixed m-2 p-0.5 bg-white/70 rounded-md hover:bg-cyan-400 "
                          // className="absolute top-2 right-2 p-1 bg-white/70 rounded-md hover:bg-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <TfiMoreAlt className="text-gray-700" size={16} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="fixed" align="start">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedMovie(movie);
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
                      // loading="lazy"
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
        <div className="flex flex-col w-[75vw] font-semibold text-lg sm:text-xl text-gray-100 px-14 pb-30 ">
          <h2 className="mb-3 text-2xl w-fit sm:text-3xl drop-shadow-md hover:text-red-400 transition-all duration-300">
            {selectedMovie.title}
          </h2>
          <div className="flex flex-row items-center">
            <p className="text-gray-200 pr-2">
              Rating:{" "}
              <span className="font-bold text-yellow-400">
                {Number(
                  (data?.moviesWithRatings ?? []).find(
                    (movie) => movie.id === selectedMovie.id
                  )?.avg_ratings
                ).toFixed(1)}
              </span>
            </p>
            <RatingGroupAdvanced />
          </div>

          <p className="mb-3 text-gray-300  ">• {selectedMovie.genre}</p>
          <p className="text-gray-200  ">
            Relese Year:{" "}
            <span className="font-sans text-gray-300/90">
              {selectedMovie.release_year}
            </span>
          </p>
          <p className="text-gray-200 ">
            Description:{" "}
            <span className="font-sans text-gray-300/90 leading-relaxed ">
              {selectedMovie.description}{" "}
            </span>
          </p>
          {/* <BiSolidTagAlt color="white" fill="blue" size="30" /> */}
        </div>
      )}
    </>
  );
};

export default Movie;

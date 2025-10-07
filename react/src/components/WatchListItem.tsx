import { trpc } from "../../utils/trpc";
import Loader from "./loader/styled-wrapper";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { BackgroundGradient } from "./ui/shadcn-io/background-gradient";

const WatchListItem = () => {
  const { data, isLoading, error } = trpc.movie.getMovies.useQuery();
  if (error) console.log("error in Watchlist page", error);
  return (
    <div className="m-2 ">
      <p className="text-2xl m-2 mb-4 font-bold">My Watchlist:</p>
      {!data?.movies ? (
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <p className="text-2xl md:text-2xl font-semibold text-white line-clamp-6">
              Nothing here yet, stay tuned 👀
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {data?.movies.map((movie) => (
            <BackgroundGradient className="rounded-xl bg-white dark:bg-zinc-900">
              <Card className="relative h-[400px] py-0 gap-0">
                <CardContent className=" px-0 w-full ">
                  {/* <div className=""> */}
                  <img
                    className="rounded-xl rounded-bl-none rounded-br-none h-[250px] w-full bg-gray-100"
                    src={movie.poster_url}
                    alt={movie.title}
                  />
                  {/* </div> */}
                  <div className="p-3">
                    <CardTitle className="text-sm pb-5">
                      {movie.title}
                    </CardTitle>
                    <CardDescription>
                      <p>{movie.release_year}</p>
                      <p>{movie.genre}</p>
                    </CardDescription>
                  </div>

                  <div className="absolute m-2 mb-5 mr-5 right-0 bottom-0">
                    {/* <span className="text-sm font-bold">$199</span> */}
                    <Button
                      size="sm"
                      type="button"
                      variant="destructive"
                      className="bg-red-600/90 text-xs px-2 py-1 h-7"
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </BackgroundGradient>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchListItem;

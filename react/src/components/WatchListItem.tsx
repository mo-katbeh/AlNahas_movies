import { trpc } from "../../utils/trpc";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { BackgroundGradient } from "./ui/shadcn-io/background-gradient";

const WatchListItem = () => {
  const { data } = trpc.movie.getMovies.useQuery();
  return (
    <div className="m-2 ">
      <p className="text-2xl m-2 mb-4 font-bold">My Watchlist:</p>
      <div className="relative grid grid-cols-4 gap-8">
        {data?.movies.map((movie) => (
          <BackgroundGradient className="rounded-[22px]  bg-white dark:bg-zinc-900">
            <Card className="h-[400px]">
              <CardContent>
                <div className="pb-4">
                  <img
                    className="aspect-square rounded-md bg-gray-100"
                    src={movie.poster_url}
                    alt={movie.title}
                  />
                </div>
                <CardTitle className="text-md">{movie.title}</CardTitle>
                <CardDescription className="text-sm">
                  <p>{movie.release_year}</p>

                  <p>{movie.genre}</p>
                </CardDescription>

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
    </div>
  );
};

export default WatchListItem;

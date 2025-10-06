import { trpc } from "../../utils/trpc";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { BackgroundGradient } from "./ui/shadcn-io/background-gradient";

const WatchListItem = () => {
  const { data } = trpc.movie.getMovies.useQuery();
  return (
    <div className="m-2">
      <div className="mb-2">
        <p className="text-2xl">My Watchlist</p>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {data?.movies.map((movie) => (
          <BackgroundGradient className="rounded-[22px] max-w-sm  bg-white dark:bg-zinc-900">
            <Card className="h-[500px]">
              <CardContent>
                <div className="pb-4">
                  <img
                    className="aspect-square rounded-md bg-gray-100"
                    src={movie.poster_url}
                    alt={movie.title}
                  />
                </div>
                <CardTitle className="text-sm">{movie.title}</CardTitle>
                <CardDescription className="text-sm">
                  <p>{movie.release_year}</p>

                  <p>{movie.genre}</p>
                </CardDescription>

                <div className="flex flex-end items-center justify-between">
                  <span className="text-sm font-bold">$199</span>
                  <Button size="sm" className="text-xs px-2 py-1 h-7">
                    Add
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

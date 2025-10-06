import { trpc } from "../../utils/trpc";
import { Card } from "./ui/card";

const WatchListItem = () => {
  const { data } = trpc.movie.getMovies.useQuery();
  return (
    <div className="m-2">
      <div className="mb-2">
        <p className="text-2xl">My Watchlist</p>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <Card>
          {data?.movies.map((movie) => (
            <img src={movie.poster_url} alt={movie.title} />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default WatchListItem;

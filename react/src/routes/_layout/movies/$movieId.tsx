import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../../../utils/trpc";
import Loader from "@/components/loader/styled-wrapper";
import { Button } from "@/components/ui/button";
import { RatingGroupAdvanced } from "@/components/toggle/rating";
import { z } from "zod";
const paramsSchema = z.object({
  movieId: z.coerce.number(),
});
export const Route = createFileRoute("/_layout/movies/$movieId")({
  params: paramsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  console.log("at movieId route");
  const {
    data: movie,
    isLoading,
    error,
  } = trpc.movie.getMovieById.useQuery({
    movieId,
  });
  console.log("Movie detiles", movie);
  if (isLoading) return <Loader />;
  if (error) {
    console.log("error in movieId route", error);
    return <p className="text-center text-red-500">Error loading movie</p>;
  }
  if (!movie) return <p className="text-center text-white">Movie not found</p>;

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 px-10 py-14 text-gray-100">
      <img
        src={movie.poster_url ?? "/placeholder.jpg"}
        alt={movie.title}
        className="w-full md:w-1/3 rounded-2xl shadow-lg object-cover"
      />
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-extrabold text-white">{movie.title}</h1>
        <div className="flex flex-row items-center gap-3">
          <p className="text-gray-300">Rating:</p>
          <span className="text-yellow-400 font-bold text-lg">
            {/* {movie.avg_rating?.toFixed(1) ?? "N/A"} */}
          </span>
          <RatingGroupAdvanced />
        </div>
        <p className="text-gray-400">
          Genre: <span className="font-semibold text-white">{movie.genre}</span>
        </p>
        <p className="text-gray-400">
          Year:{" "}
          <span className="font-semibold text-white">{movie.release_year}</span>
        </p>
        <p className="text-gray-300 leading-relaxed max-w-2xl">
          {movie.description ?? "No description available."}
        </p>
        <Button className="w-fit bg-red-600 hover:bg-red-700">
          Add to Watchlist
        </Button>
      </div>
    </div>
  );
}

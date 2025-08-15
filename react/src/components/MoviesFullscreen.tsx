import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenuContent } from "./ui/navigation-menu";
import { trpc } from "../../utils/trpc";
import main from "../assets/main.jpg";
// import { Movie } from "../../../server/src/db/kysely/types";

interface Movie {
  id: string;
  title: string;
  year: number;
  posterUrl?: string | null | undefined;
  genres?: string;
  director?: string;
  rating: number;
  description?: string;
}
export function MoviesFullscreen() {
  const { data: movies } = trpc.movie.getAll.useQuery();
  // console.log("THIS IS THE DATA", movies);
  // type Movie = typeof movies[];
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();

  useEffect(() => {
    if (movies?.length && !selectedMovie) {
      setSelectedMovie(movies[0]); // ✅ full movie object
    }
  }, [movies, selectedMovie]);

  return (
    <NavigationMenuContent className="!w-screen !h-screen p-1 bg-black text-white">
      <div className="w-full h-full flex flex-col">
        {/* Posters row */}
        <div className="flex-1 flex flex-col justify-center">
          <ScrollArea className="w-full">
            <div className="flex space-x-6 px-8">
              {movies?.map((movie) => (
                <div
                  key={movie.id}
                  className={`shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                    selectedMovie?.id === movie.id
                      ? "border-yellow-400"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={movie.posterUrl ?? main}
                    alt={movie.title}
                    className="w-[200px] h-[300px] object-cover"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Details */}
        {selectedMovie && (
          <div className="bg-black/80 p-6 border-t border-gray-700">
            <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">
                {selectedMovie.rating ?? "N/A"}
              </span>
              <span className="text-gray-400">/ 10</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedMovie.genres?.split(",").map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-300">
              <strong>Director:</strong> {selectedMovie.director ?? "Unknown"}
            </p>
            <p className="mt-3 text-gray-400">{selectedMovie.description}</p>
            <div className="flex gap-3 mt-4">
              <Button variant="secondary" className="bg-yellow-400 text-black">
                Watch Trailer
              </Button>
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400"
              >
                Add to Favourites
              </Button>
            </div>
          </div>
        )}
      </div>
    </NavigationMenuContent>
  );
}
export default MoviesFullscreen;

"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenuContent } from "./ui/navigation-menu";

interface Movie {
  title: string;
  poster: string;
  rating: number;
  genres: string[];
  director: string;
  actors: string[];
  country: string;
  description: string;
}

const movies: Movie[] = [
  {
    title: "A Mountain for Dreamers",
    poster:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    genres: ["Adventure", "Biography", "Drama"],
    director: "Emma Rose",
    actors: ["Eduardo Rodriguez", "Anna Clare", "John Williams"],
    country: "USA, 2027",
    description:
      "Created by the director of 'Infinite Game', this movie speaks to your soul and makes you realize that...",
  },
  {
    title: "A Mountain for Dreamers",
    poster:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    genres: ["Adventure", "Biography", "Drama"],
    director: "Emma Rose",
    actors: ["Eduardo Rodriguez", "Anna Clare", "John Williams"],
    country: "USA, 2027",
    description:
      "Created by the director of 'Infinite Game', this movie speaks to your soul and makes you realize that...",
  },
  {
    title: "A Mountain for Dreamers",
    poster:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    genres: ["Adventure", "Biography", "Drama"],
    director: "Emma Rose",
    actors: ["Eduardo Rodriguez", "Anna Clare", "John Williams"],
    country: "USA, 2027",
    description:
      "Created by the director of 'Infinite Game', this movie speaks to your soul and makes you realize that...",
  },
  {
    title: "A Mountain for Dreamers",
    poster:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    genres: ["Adventure", "Biography", "Drama"],
    director: "Emma Rose",
    actors: ["Eduardo Rodriguez", "Anna Clare", "John Williams"],
    country: "USA, 2027",
    description:
      "Created by the director of 'Infinite Game', this movie speaks to your soul and makes you realize that...",
  },
  {
    title: "Top of the World",
    poster:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=400&q=80",
    rating: 4.2,
    genres: ["Drama", "Romance"],
    director: "David Miller",
    actors: ["Sophia Turner", "Liam Gray"],
    country: "Canada, 2026",
    description:
      "A heartwarming tale of resilience and love in the face of adversity.",
  },
  {
    title: "The Lost Girl",
    poster:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    genres: ["Mystery", "Thriller"],
    director: "Mia Collins",
    actors: ["James Carter", "Ava Brooks"],
    country: "UK, 2025",
    description:
      "A suspenseful journey into the depths of a young woman's disappearance.",
  },
];
// const { data } = trpc.movie.getAll.useQuery();
export function MoviesFullscreen() {
  const [selected, setSelected] = React.useState<Movie>(movies[0]);

  return (
    <NavigationMenuContent className="!w-screen !h-screen p-0 bg-black text-white">
      <div className="w-full h-full flex flex-col">
        {/* Posters row */}
        <div className="flex-1 flex flex-col justify-center">
          <ScrollArea className="w-full">
            <div className="flex space-x-6 px-8">
              {movies.map((movie) => (
                <div
                  key={movie.title}
                  className={`shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                    selected.title === movie.title
                      ? "border-yellow-400"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelected(movie)}
                >
                  <img
                    src={movie.poster}
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
        <div className="bg-black/80 p-6 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{selected.rating}</span>
            <span className="text-gray-400">/ 5</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {selected.genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-gray-800 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-300">
            <strong>Director:</strong> {selected.director}
          </p>
          <p className="text-sm text-gray-300">
            <strong>Actors:</strong> {selected.actors.join(", ")}
          </p>
          <p className="text-sm text-gray-300">
            <strong>Country:</strong> {selected.country}
          </p>
          <p className="mt-3 text-gray-400">{selected.description}</p>
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
      </div>
    </NavigationMenuContent>
  );
}
export default MoviesFullscreen;

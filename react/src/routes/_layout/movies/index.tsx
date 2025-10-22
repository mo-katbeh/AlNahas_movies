import Movie from "@/components/Movie";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  // useState,
  type ChangeEvent,
} from "react";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().optional().default(""),
  genre: z.string().optional(),
  year: z.coerce.number().optional(),
});
export const Route = createFileRoute("/_layout/movies/")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  console.log("at movie route");

  const search = useSearch({ from: "/_layout/movies/" });
  const navigate = useNavigate();
  // const [genre, setGenre] = useState(search.genre ?? "");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      to: "/movies",
      search: {
        q: event.target.value,
        // genre: event.target.value,
      },
    });
  };
  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      to: "/movies",
      search: {
        year: event.target.value,
        // genre: event.target.value,
      },
    });
  };
  const handleGenreChange = (val: string | undefined) => {
    // setGenre(event.target.value);
    navigate({
      to: "/movies",
      search: {
        genre: val || undefined,
      },
    });
  };
  return (
    <div className="w-full">
      <div className="flex flex-row items-center pt-8 px-16 gap-2 mb-6">
        <div className="w-full relative">
          <Search
            className="absolute left-3 top-2.5 text-gray-400 "
            size={18}
          />
          <Input
            type="text"
            placeholder="Search movies..."
            className="pl-9 w-full border border-gray-700 bg-zinc-900 "
            onChange={handleSearchChange}
            value={search.q}
          />
        </div>
      </div>
      <div className="flex flex-row px-16 justify-between">
        <Select
          onValueChange={(v) => handleGenreChange(v || undefined)}
          value={search.genre}
        >
          <SelectTrigger className="w-1/2 mr-10">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Action">Action</SelectItem>
            <SelectItem value="Comedy">Comedy</SelectItem>
            <SelectItem value="Drama">Drama</SelectItem>
            <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
            <SelectItem value="Horror">Horror</SelectItem>
            {/* <SelectItem value="">Clear</SelectItem> */}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Year"
          value={search.year}
          onChange={handleYearChange}
          className="w-1/2 "
        />
      </div>
      <Movie searchQuery={search.q} genre={search.genre} year={search.year} />
    </div>
  );
}

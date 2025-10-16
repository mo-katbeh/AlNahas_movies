import Movie from "@/components/Movie";
import { Input } from "@/components/ui/input";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { ChangeEvent } from "react";
import { z } from "zod";
const searchSchema = z.object({
  q: z.string().optional().default(""),
});
export const Route = createFileRoute("/_layout/movies")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ from: "/_layout/movies" });
  const navigate = useNavigate();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      to: "/movies",
      search: { q: event.target.value },
    });
  };
  return (
    <div>
      <div className="flex items-center pt-8 px-10 gap-2 mb-6">
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
      <Movie searchQuery={search.q} />
    </div>
  );
}

// src/components/MoviesFilter.tsx
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function MoviesFilter() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: "/_layout/movies" });

  // Local state synced with search params
  const [search, setSearch] = useState(searchParams.q ?? "");
  const [genre, setGenre] = useState(searchParams.genre ?? "");
  const [year, setYear] = useState(searchParams.year?.toString() ?? "");

  // Whenever user types or selects, sync URL instantly
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({
        to: "/movies",
        search: (prev) => ({
          ...prev,
          search: search || undefined,
          genre: genre || undefined,
          year: year ? Number(year) : undefined,
        }),
        replace: true, // avoids page reload
      });
    }, 400); // debounce a bit for typing

    return () => clearTimeout(timeout);
  }, [search, genre, year]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full bg-muted/20 p-4 rounded-xl shadow-md">
      {/* 🔍 Search Bar */}
      <Input
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3"
      />

      {/* 🎭 Genre Filter */}
      <Select onValueChange={setGenre} value={genre}>
        <SelectTrigger className="w-full md:w-1/4">
          <SelectValue placeholder="Filter by genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Action">Action</SelectItem>
          <SelectItem value="Comedy">Comedy</SelectItem>
          <SelectItem value="Drama">Drama</SelectItem>
          <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
          <SelectItem value="Horror">Horror</SelectItem>
        </SelectContent>
      </Select>

      {/* 📅 Year Filter */}
      <Input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full md:w-1/4"
      />

      {/* ❌ Clear Button */}
      <Button
        variant="outline"
        onClick={() => {
          setSearch("");
          setGenre("");
          setYear("");
          //   navigate({ search: {} });
        }}
      >
        Clear
      </Button>
    </div>
  );
}

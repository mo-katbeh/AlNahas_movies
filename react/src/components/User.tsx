import { useState } from "react";
import { trpc } from "../../utils/trpc";
// import { skipToken } from '@trpc/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// const User = () => {
//   const { data, isLoading, error } = trpc.user.getAll.useQuery();
//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error.message} </p>;
//   if (!data || data.length === 0) return <p>No users found.</p>;
//   // console.log("Fetched users:", data);
//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {data?.map((item) => (
//           <li key={item.id}>{item.name} </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

const Movie = () => {
  const [userId, setUserId] = useState<string | undefined>("");
  const { data: users } = trpc.user.getAll.useQuery();

  const { data, isLoading, error } = trpc.watchlist.getAll.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Select value={userId} onValueChange={setUserId}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading movies...</span>
          </div>
        )}
        {/* Empty state */}
        {data && data.length === 0 && (
          <div className="text-gray-500 bg-gray-50 border border-gray-200 p-3 rounded-lg">
            No movies found for this user.
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-red-500 bg-red-50 border border-red-200 p-3 rounded-lg">
            {error.message}
          </div>
        )}

        {/* Movie list */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((movie) => (
            <Card
              key={movie.movieId}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {movie.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {movie.categories?.map((category) => (
                  <Badge
                    key={`${movie.movieId}-${category.id}`}
                    fontVariant="secondary"
                    className="capitalize"
                  >
                    {category.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movie;
{
  /* <div className="space-y-4">
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        {data && data.length === 0 && (
          <p className="text-gray-400">No movies found for this user.</p>
        )}
        {data?.map({data.map((movie) => (
        <div
          key={movie.movieId}
          className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800"
        >
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.categories?.map((category) => (
              <span
                key={`${movie.movieId}-${category.id}`}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-md"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
          ))}
      </div> */
}

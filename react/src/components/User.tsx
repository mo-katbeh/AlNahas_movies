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
import { Badge, Film, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { NavigationMenuContent } from "./ui/navigation-menu";

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
      <NavigationMenuContent className="!w-screen !h-screen p-0 bg-black text-white">
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 flex flex-col justify-center"></div>
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
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            Movies
          </h1>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading movies...</span>
            </div>
          )}

          {/* Empty State */}
          {data && data.length === 0 && (
            <div className="text-gray-500 bg-gray-50 border border-gray-200 p-3 rounded-lg">
              No movies found for this user.
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-red-500 bg-red-50 border border-red-200 p-3 rounded-lg">
              {error.message}
            </div>
          )}

          {/* Movies Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((movie) => (
              <Card
                key={movie.movieId}
                className="shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {movie.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {movie.categories?.map((category) => (
                      <Badge
                        key={`${movie.movieId}-${category.id}`}
                        fontVariant="secondary"
                        className="capitalize"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating */}
                  {/* {movie.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < movie.rating ? "fill-yellow-500" : "fill-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      ({movie.rating}/5)
                    </span>
                  </div>
                )} */}

                  {/* Status */}
                  {/* {movie.status && (
                  <Badge
                    fontVariant={
                      movie.status === "WATCHED"
                        ? "default"
                        : movie.status === "WATCHING"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {movie.status}
                  </Badge>
                )} */}

                  {/* Review */}
                  {/* {movie.review && (
                  <p className="text-sm text-gray-600 border-l-4 border-gray-200 pl-2 italic">
                    “{movie.review}”
                  </p>
                )} */}
                </CardContent>

                {/* Actions */}
                <CardFooter className="flex justify-between items-center border-t pt-3">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="default">
                    Add Review
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
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

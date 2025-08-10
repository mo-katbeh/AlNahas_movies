import { useState } from "react";
import { trpc } from "../../utils/trpc";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [userId, setUserId] = useState<string | undefined>();
  const { data: users } = trpc.user.getAll.useQuery();
  const { data, isLoading, error } = trpc.watchlist.getAll.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  // if (isLoading) return <span>Loading...</span>;
  // if (error) return <p>{error.message}</p>;
  // if (!data || data.length === 0) return <p>No Movies found.</p>;

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Select value={userId} onValueChange={setUserId}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">User1</SelectItem>
            <SelectItem value="2">User2</SelectItem>
            <SelectItem value="3">User3</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <h1>Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && data.length === 0 && <p>No movies found for this user.</p>}

      <ul className="list-group">
        {data?.map((movie) => (
          <li key={movie.movieId} className="list-group-item">
            {movie.title}
            <div>
              {movie.categories?.map((category) => (
                <span key={`${movie.movieId}-${category.id}`}>
                  {category.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
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

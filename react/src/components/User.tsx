import { trpc } from "../../utils/trpc";

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
  const { data, isLoading, error } = trpc.watchlist.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data || data.length === 0) return <p>No Movies found.</p>;

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {data.map((movie) => (
          <div key={movie.movieId}>
            <h2>{movie.title}</h2>
            <div>
              {movie.categories?.map((category) => (
                <span key={`${movie.movieId}-${category.id}`}>
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Movie;

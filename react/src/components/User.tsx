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

  if (isLoading) return <span>Loading...</span>;
  if (error) return <p>{error.message}</p>;
  if (!data || data.length === 0) return <p>No Movies found.</p>;

  return (
    <>
      <select className="form-select mb-3">
        <option value=""></option>
        <option value="1">User1</option>
        <option value="2">User2</option>
        <option value="3">User3</option>
      </select>
      <h1>Movies</h1>
      <ul className="list-group">
        {data.map((movie) => (
          <li key={movie.movieId} className="list-group-item">
            {movie.title}
            {/* <div>
              {movie.categories?.map((category) => (
                <span key={`${movie.movieId}-${category.id}`}>
                  {category.name}
                </span>
              ))}
            </div> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movie;

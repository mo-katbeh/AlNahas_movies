import { useState } from "react";
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
  const [userId, setUserId] = useState<string | undefined>();
  const { data, isLoading, error } = trpc.watchlist.getAll
    .useQuery
    // { userId: userId! },
    // { enabled: !!userId }
    ();

  if (isLoading) return <span>Loading...</span>;
  if (error) return <p>{error.message}</p>;
  if (!data || data.length === 0) return <p>No Movies found.</p>;

  return (
    <>
      <select
        onChange={(event) => setUserId(event.target.value)}
        value={userId}
        className="form-select mb-3"
      >
        <option value="">Select a User</option>
        <option value="1">User1</option>
        <option value="2">User2</option>
        <option value="3">User3</option>
      </select>
      <h1>Movies</h1>
      {data.map((item) => (
        <li key={item.id} className="list-group-item">
          {/* {item.movie_id} */}
          {item.rating}
          {item.review}
          {item.status}
          {/* {item.user_id} */}
        </li>
      ))}
      {/* <ul className="list-group">
        {data.map((movie) => (
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
      </ul> */}
    </>
  );
};

export default Movie;

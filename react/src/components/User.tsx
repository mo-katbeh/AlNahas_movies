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
//           <li key={item.id}>{item.email} </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

const Movie = () => {
  const { data, isLoading, error } = trpc.watchlist.getAll.useQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message} </p>;
  if (!data || data.length === 0) return <p>No Movies found.</p>;
  // console.log("Fetched users:", data);
  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            {item.title}
            {item.year}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;

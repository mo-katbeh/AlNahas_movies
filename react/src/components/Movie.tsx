/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
// import Database from "../../../server/src/db/kysely/types";

const Movie = () => {
  const fechMovies = () =>
    axios
      .get("http://localhost:3000/trpc/watchlist.getAll")
      .then((res) => res.data);

  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: fechMovies,
  });
  console.log(data);
  // if (error) return <p> {error} </p>
  //   return (
  //     <ul>
  //       {data?.map((movie) => (
  //         <li key={movie.} className="list-group-item">
  //           {movie.titel}
  //         </li>
  //       ))}
  //     </ul>
  //   );
};

export default Movie;

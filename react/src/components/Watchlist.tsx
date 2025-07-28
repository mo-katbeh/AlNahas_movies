import React from "react";
import { trpc } from "../../utils/trpc";

const Watchlist = () => {
  const { data, isLoading, error } = trpc.watchlist.getWatchlist.useQuery;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message} </p>;
  return (
    <div>
      <h1>Your Watchlist</h1>
      <ul>{data}</ul>
    </div>
  );
};

export default Watchlist;

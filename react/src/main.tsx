// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import { trpc } from "../utils/trpc";
import { httpBatchLink } from "@trpc/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import App from "./App.tsx";
// import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

// const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});
async function main() {
  // const userAddResult = await trpcClient.user.createUser.mutate({
  //   email: "mohammad.ka6@gmail.com",
  // });
  // console.log(userAddResult);
  // const userProfileResult =
  //   await trpcClient.userProfile.createUserProfile.mutate({
  //     userId: "cf01ae0e-0176-4a01-b3fa-b7503588fcc4",
  //     firstName: "mohammad",
  //     lastName: "katbeh",
  //     gender: "male",
  //   });
  // console.log(userProfileResult);
  // const updateUserProfileResult =
  //   await trpcClient.userProfile.updateUserProfile.mutate({
  //     id: "58e3b20b-a285-4137-9f18-0c1f0c9f4ee1",
  //     birthDate: "2001-05-23",
  //   });
  // console.log(updateUserProfileResult);
  // const result = await trpcClient.userProfile.deleteUserProfile.mutate({
  //   id: "cf01ae0e-0176-4a01-b3fa-b7503588fcc4",
  // });
  // console.log("result", result);

  // const createMovie = await trpcClient.movie.createmovie.mutate({
  //   title: "The Kingdom",
  //   genre: "Action",
  //   releaseYear: 2019,
  // });
  // console.log("Movie info", createMovie);
  const gitAllWatchList = trpcClient.watchlist.getWatcListItem.query();
  console.log(gitAllWatchList);
}
main();

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <trpc.Provider client={trpcClient} queryClient={queryClient}>
//         <ReactQueryDevtools />
//       </trpc.Provider>
//     </QueryClientProvider>
//   </StrictMode>
// );

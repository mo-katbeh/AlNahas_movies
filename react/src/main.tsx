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
  // const result = await trpcClient.user.createUser.mutate({
  //   email: "golde2n@ads.com",
  // });
  const result = await trpcClient.user.createUser.query({
    id: "bca16bc5-0df8-413d-aaa4-7af2f4313676",
  });
  console.log("result", result);
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

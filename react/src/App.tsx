import { trpc } from "../utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import User from "./components/User";
// import EmailForm from "./components/Form/EmailForm";

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc", // adjust to your backend
    }),
  ],
});

function App() {
  // const handleEmailSubmit = (email: string) => {
  //   console.log("Submitted email:", email);
  //   // TODO: call your API or handle logic here
  // };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          {/* Your App */}
          <User />
        </trpc.Provider>
      </QueryClientProvider>
    </>
  );
}
export default App;

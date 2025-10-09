import WatchListItem from "@/components/WatchListItem";
import { createFileRoute } from "@tanstack/react-router";
// import { authClient } from "../../../utils/auth-client";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { router } from "../../../../server/src/trpc/init";

// const getUserSession = async () => {
//   const { data, error } = await authClient.getSession();
//   if (!error) return data;
//   throw error;
// };
export const Route = createFileRoute("/_layout/watchlist")({
  component: RouteComponent,
  // beforeLoad: async () => {
  //   const session = await getUserSession();
  //   console.log(" in watchlist router", session);
  //   if (!session) {
  //     toast.error("you must login to see your watchlist");

  //   }
  // },
});
function RouteComponent() {
  return <WatchListItem />;
}

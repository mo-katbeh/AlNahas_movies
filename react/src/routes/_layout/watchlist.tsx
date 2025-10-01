import WatchListItem from "@/components/WatchListItem";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/watchlist")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <WatchListItem />;
}

import { createFileRoute } from "@tanstack/react-router";
import NavigationMenuMovies from "@/components/NavigationMenuMovies";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NavigationMenuMovies />;
}

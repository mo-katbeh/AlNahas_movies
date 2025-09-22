import NavigationMenuMovies from "@/components/NavigationMenuMovies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NavigationMenuMovies />;
}

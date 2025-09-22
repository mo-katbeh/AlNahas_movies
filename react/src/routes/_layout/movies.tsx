import Movie from "@/components/Movie";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/movies")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Movie />;
}

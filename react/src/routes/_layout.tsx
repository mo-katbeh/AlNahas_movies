import { createFileRoute } from "@tanstack/react-router";
import NavigationMenuMovies from "@/components/NavigationMenuMovies";
import { Toaster } from "sonner";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <NavigationMenuMovies />
      <Toaster />
    </>
  );
}

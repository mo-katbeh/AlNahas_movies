import { createFileRoute } from "@tanstack/react-router";
import NavigationMenuMovies from "@/components/NavigationMenuMovies";
// import { trpc } from "../../../utils/trpc";

export const Route = createFileRoute("/_layout")({
  // beforeLoad: async ({ctx}) =>{

  // },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <NavigationMenuMovies />
    </>
  );
}

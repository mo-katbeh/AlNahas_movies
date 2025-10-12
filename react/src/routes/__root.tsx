import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      {/* <Link activeProps={{ className: "text-blue font-bold" }} to="/">
        {/* Main Page */}

      {/* <div>Hello "__root"!</div> */}
      <Outlet />
    </>
  );
}

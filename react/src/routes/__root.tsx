import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Link activeProps={{ className: "text-blue font-bold" }} to="/">
        {/* Main Page */}
      </Link>
      <Link activeProps={{ className: "text-blue font-bold" }} to="/about">
        {/* About us */}
      </Link>
      {/* <div>Hello "__root"!</div> */}
      <Outlet />
    </React.Fragment>
  );
}

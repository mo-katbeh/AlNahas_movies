import * as React from "react";

import { Link } from "lucide-react";
import User from "../components/User";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import theaterImage from "../assets/theater.jpg";
import MoviesFullscreen from "./MoviesFullscreen";
// import User from "./User";
export function MovieGrid() {
  // const [selected, setSelected] = React.useState(movies[0]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex  "
      style={{ backgroundImage: `url(${theaterImage})` }}
    >
      <NavigationMenu className="border mx-auto max-h-fit max-w-fit">
        <NavigationMenuList>
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Components */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          </NavigationMenuItem>

          {/* Docs */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Movies - Fullscreen */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
            <MoviesFullscreen />
          </NavigationMenuItem>

          {/* Watchlist */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Watchlist</NavigationMenuTrigger>

            {/* Replace with your actual Watchlist component */}
            <User />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default MovieGrid;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

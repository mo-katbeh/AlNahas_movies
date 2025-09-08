import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import theaterImage from "../assets/theater.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
export function NavigationMenuMovies() {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center overflow-y-hidden"
        style={{ backgroundImage: `url(${theaterImage})` }}
      >
        <div className="flex flex-row-reverse m-4 gap-2">
          <TfiMoreAlt color="white" size="12" />
          <CgProfile color="white" size="12" />
          <MdOutlineNotificationsNone color="white" size="12" />
          <IoSearchOutline color="white" size="12" />
        </div>
        <div className="flex flex-row justify-center gap-2 font-medium bg-fixed">
          <Button variant="move_nav">Home</Button>
          <Button variant="move_nav">Series</Button>
          <Button variant="move_nav">Movies</Button>
          <Button variant="move_nav">Latest</Button>
          <Button variant="move_nav">WatchList</Button>
        </div>
      </div>
    </>
  );
}
export default NavigationMenuMovies;

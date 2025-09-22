import { Button } from "./ui/button";
import theaterImage from "../assets/theater.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import { Link, Outlet } from "@tanstack/react-router";
export function NavigationMenuMovies() {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center overflow-y-hidden"
        style={{ backgroundImage: `url(${theaterImage})` }}
      >
        <div className="flex flex-row-reverse  gap-4 mr-12 mt-6">
          <TfiMoreAlt color="white" size="30" />
          <Button>
            <CgProfile color="white" size="30" />
          </Button>
          <MdOutlineNotificationsNone color="white" size="30" />
          <IoSearchOutline color="white" size="30" />
        </div>
        <div className="flex flex-row justify-center gap-8  pt-4 pb-12 bg-fixed">
          <Button variant="move_nav">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="move_nav">Series</Button>
          <Button variant="move_nav">
            <Link to="/movies">Movies</Link>
          </Button>
          <Button variant="move_nav">Latest</Button>
          <Button variant="move_nav">WatchList</Button>
        </div>
        <Outlet />
      </div>
      <figure></figure>
    </>
  );
}
export default NavigationMenuMovies;

import { Button } from "./ui/button";
import theaterImage from "../assets/theater.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import Movie from "./Movie";
export function NavigationMenuMovies() {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center overflow-y-hidden"
        style={{ backgroundImage: `url(${theaterImage})` }}
      >
        <div className="flex flex-row-reverse  gap-4 mr-12 mt-6">
          <TfiMoreAlt color="white" size="30" />
          <CgProfile color="white" size="30" />
          <MdOutlineNotificationsNone color="white" size="30" />
          <IoSearchOutline color="white" size="30" />
        </div>
        <div className="flex flex-row justify-center gap-8  pt-4 pb-16 bg-fixed">
          <Button variant="move_nav">Home</Button>
          <Button variant="move_nav">Series</Button>
          <Button variant="move_nav">Movies</Button>
          <Button variant="move_nav">Latest</Button>
          <Button variant="move_nav">WatchList</Button>
        </div>
        <Movie />
      </div>
    </>
  );
}
export default NavigationMenuMovies;

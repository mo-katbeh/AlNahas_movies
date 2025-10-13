import { Button } from "./ui/button";
import theaterImage from "../assets/theater.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { ModeToggle } from "./toggle/mode-toggle";
import useSheetStore from "@/state-management/useSheetStore";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";

function NavigationMenuMovies() {
  const router = useRouter();
  const { open } = useSheetStore();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <AppSidebar />

        <main className="flex-1 overflow-x-hidden">
          <div
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${theaterImage})` }}
          >
            <SidebarTrigger className="bg-transparent" />
            <div className="w-full flex flex-row-reverse gap-4 mr-12">
              <TfiMoreAlt color="white" size="30" />
              <CgProfile
                color="white"
                size="30"
                onClick={() => {
                  open();
                  router.navigate({ to: "/userProfile" });
                }}
              />

              <MdOutlineNotificationsNone color="white" size="30" />
              <IoSearchOutline color="white" size="30" />
              <ModeToggle />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-8 pt-4 pb-8">
              <Button variant="move_nav">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="move_nav">Series</Button>
              <Button variant="move_nav">
                <Link to="/movies">Movies</Link>
              </Button>
              <Button variant="move_nav">Latest</Button>
              <Button variant="move_nav">
                <Link to="/watchlist">WatchList</Link>
              </Button>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
export default NavigationMenuMovies;

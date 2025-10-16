import { Button } from "./ui/button";
import theaterImage from "../assets/theater.jpg";
// import { IoSearchOutline } from "react-icons/io5";
// import { MdOutlineNotificationsNone } from "react-icons/md";
// import { TfiMoreAlt } from "react-icons/tfi";
import { Link, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";
import { AppLogo } from "./logo/Watchly";
import { Footer } from "./Footer";

function NavigationMenuMovies() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full overflow-hidden">
        <AppSidebar />

        <main className="flex-1 overflow-x-hidden">
          <div
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${theaterImage})` }}
          >
            <SidebarTrigger className="fixed z-10" />
            <div className="flex flex-row-reverse p-2 pt-3 pr-3">
              <AppLogo />
            </div>
            {/* <div className="w-full flex flex-row-reverse gap-4 mr-12"> */}
            {/* <TfiMoreAlt color="white" size="30" />
              <MdOutlineNotificationsNone color="white" size="30" />
              <IoSearchOutline color="white" size="30" /> */}
            {/* </div> */}

            <div className="flex flex-col sm:flex-row justify-center gap-8 pt-4 pb-6">
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
            <Footer />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
export default NavigationMenuMovies;

import { Button } from "./ui/button";
import theaterImage from "../assets/theater.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { ModeToggle } from "./toggle/mode-toggle";
import useSheetStore from "@/state-management/useSheetStore";
import { toast } from "sonner";
import { trpc } from "../../utils/trpc";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";
// const Logout = async () => {
//   const { error } = await authClient.signOut();
//   if (error) {
//     toast.error("You are not signed in");
//   }
// };
function NavigationMenuMovies() {
  const router = useRouter();
  const { open } = useSheetStore();
  // const { isSuccess, mutate, isPending } = useMutation({
  //   toast.success("Comeback soon");

  //   mutationKey: ["auth", "log-out"],
  //   mutationFn: Logout,
  // });
  const { mutate, isPending } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Comeback soon");

      router.navigate({ to: "/login" });
    },
    onError: (err) => {
      toast.error("You are not signed in");

      console.log("Logout failed", err.message);
    },
  });
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden">
          <div
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${theaterImage})` }}
          >
            {/* Top bar */}
            <SidebarTrigger className="bg-transparent" />
            <div className="w-full flex flex-row-reverse gap-4 mr-12">
              <TfiMoreAlt color="white" size="30" />
              <Button
                variant="outline"
                onClick={() => mutate()}
                disabled={isPending}
              >
                {isPending ? "Logging out" : "Logout"}
              </Button>

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

            {/* Navigation */}
            <div className="flex flex-row justify-center gap-8 pt-4 pb-8">
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

            {/* Nested routes */}
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
export default NavigationMenuMovies;

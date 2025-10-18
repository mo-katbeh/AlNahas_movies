import {
  Calendar as CalendarIcon,
  ChevronRight,
  Home as HomeIcon,
  // Inbox,
  Search as SearchIcon,
  // Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  // SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { getUserSession } from "../../../utils/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useRouter } from "@tanstack/react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ModeToggle } from "../toggle/mode-toggle";
import { useState } from "react";
import { Calendar } from "../ui/calendar";

// Menu items.
const getUserInfo = async () => {
  const data = await getUserSession();
  return data;
};

// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

function AppSidebar() {
  const router = useRouter();
  const { data: userInfo } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: getUserInfo,
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const user = {
    name: userInfo?.session?.user.name,
    email: userInfo?.session?.user.email,
    avatar: "/avatars/shadcn.jpg",
  };
  return (
    <Sidebar>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row justify-between py-2 ">
            Application
            <ModeToggle />
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.navigate({ to: "/" })}
                tooltip="Home"
              >
                <HomeIcon />
                <span> Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Collapsible key="Calendar" asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Calendar">
                    <CalendarIcon />
                    <span> Calendar </span>

                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="justify-items-center">
                  {/* <SidebarMenuSub> */}
                  {/* <SidebarMenuSubItem> */}
                  {/* <SidebarMenuSubButton asChild> */}

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectDate) => setDate(selectDate)}
                    className=" rounded-md border shadow-sm  "
                    captionLayout="dropdown"
                  />

                  {/* <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a> */}
                  {/* </SidebarMenuSubButton> */}
                  {/* </SidebarMenuSubItem> */}
                  {/* </SidebarMenuSub> */}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.navigate({ to: "/movies" })}
              >
                <SearchIcon />
                <span> Search</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {userInfo?.isAuthenticated ? (
          <NavUser user={user} />
        ) : (
          <div className=" w-full flex flex-col items-center text-center space-y-3">
            <p className=" font-semibold text-white">You’re missing out 🍿</p>
            <p className="text-sm text-gray-400 px-4">
              Sign in to unlock your personalized watchlist and favorite movies.
            </p>
            <Button
              onClick={() => router.navigate({ to: "/login" })}
              variant="secondary"
              className="mt-1 w-full  bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
            >
              Sign In Now
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
export default AppSidebar;

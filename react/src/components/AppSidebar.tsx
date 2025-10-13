import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { getUserSession } from "../../utils/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";

// Menu items.
const getUserInfo = async () => {
  const data = await getUserSession();
  return data;
};

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

function AppSidebar() {
  const router = useRouter();
  const { data: userInfo } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: getUserInfo,
  });

  const user = {
    name: userInfo?.session?.user.name,
    email: userInfo?.session?.user.email,
    avatar: "/avatars/shadcn.jpg",
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
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

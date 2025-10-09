import { createFileRoute, Outlet } from "@tanstack/react-router";
import NavigationMenuMovies from "@/components/NavigationMenuMovies";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <SidebarTrigger />
          <Outlet />
        </div>
      </div>
      <NavigationMenuMovies />
      <Toaster />
    </SidebarProvider>
  );
}

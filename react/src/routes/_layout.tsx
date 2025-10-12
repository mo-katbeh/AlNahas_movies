import { createFileRoute } from "@tanstack/react-router";
import NavigationMenuMovies from "@/components/NavigationMenuMovies";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
// import { trpc } from "../../../utils/trpc";

export const Route = createFileRoute("/_layout")({
  // beforeLoad: async ({ctx}) =>{

  // },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarTrigger />
        <NavigationMenuMovies />
        <Toaster />
      </SidebarProvider>
    </>
  );
}

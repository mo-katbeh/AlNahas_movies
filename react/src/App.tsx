import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";
// import UserProfileForm from "./components/form/UserProfileForm";
// import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
// import { AppSidebar } from "./components/AppSidebar";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors theme="system" position="top-center" />
        {/* <SidebarProvider>
          <AppSidebar />

          <SidebarTrigger /> */}
        <RouterProvider router={router} />
        {/* <UserProfileForm /> */}
        {/* </SidebarProvider> */}
      </ThemeProvider>
    </>
  );
}

export default App;

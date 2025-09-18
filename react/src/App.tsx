// import { createRouter, RouterProvider } from "@tanstack/react-router";
// import { routeTree } from "./routeTree.gen";
import NavigationMenuMovies from "./components/NavigationMenuMovies";

// const router = createRouter({ routeTree });
// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }

function App() {
  return <NavigationMenuMovies />;
}

export default App;

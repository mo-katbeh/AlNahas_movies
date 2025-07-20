import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:grid-rows-2 lg:grid-flow-row-dense">
      {/* <!-- NAV (spans two columns on large screens) --> */}
      <div className=" text-white p-4 lg:col-span-2">
        <h1 className="text-xl font-bold">
          <Nav />
        </h1>
      </div>

      {/* <!-- ASIDE (only visible on large screens) --> */}
      <aside className="bg-amber-600 p-4 hidden lg:block">
        <h2 className="text-lg font-semibold">Aside</h2>
        <p>This is the aside content.</p>
      </aside>

      {/* <!-- MAIN --> */}
      <main className="bg-amber-300 p-4 border border-gray-300">
        <h2 className="text-lg font-semibold">Main</h2>
        <p>This is the main content.</p>
      </main>
    </div>
  );
}

export default App;

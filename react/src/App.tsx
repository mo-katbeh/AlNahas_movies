import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">My Responsive App</h1>
      </header>

      {/* Main section: sidebar + content */}
      <div className="flex flex-1 flex-col md:flex-row w-full">
        {/* Sidebar (hidden on small screens) */}
        <aside className="bg-gray-200 w-full md:w-64 p-4 ">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
              <li>
                <a href="#">Logout</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 bg-white w-full">
          <h2 className="text-lg font-semibold mb-4">Welcome</h2>
          <p>This layout is responsive with Tailwind CSS.</p>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100  text-center p-4 text-sm">
        &copy; 2025 My App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

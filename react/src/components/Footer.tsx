import { Link } from "@tanstack/react-router";
import { Github, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-black via-zinc-950 to-red-950 text-gray-300 border-t border-red-900/40">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Left section */}
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Watchly
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover. Rate. Watch. The ultimate destination for movie lovers.
          </p>
        </div>

        <div className="flex flex-col space-y-2 sm:items-center">
          <h2 className="text-lg font-semibold text-red-500 uppercase mb-2">
            Quick Links
          </h2>
          <ul className="space-y-1 text-gray-400">
            <li>
              <Link
                to="/"
                className="hover:text-white hover:underline transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/watchlist"
                className="hover:text-white hover:underline transition-all"
              >
                Watchlist
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white hover:underline transition-all"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3 sm:items-end">
          <h2 className="text-lg font-semibold  text-red-500 uppercase mb-2">
            Follow Us
          </h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-400 transition-all">
              <Youtube size={22} />
            </a>
            <a href="#" className="hover:text-red-400 transition-all">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-red-400 transition-all">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-red-400 transition-all">
              <Github size={22} />
            </a>
          </div>
          <p className="text-xs text-gray-500 pt-4">
            © {new Date().getFullYear()} Watchly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

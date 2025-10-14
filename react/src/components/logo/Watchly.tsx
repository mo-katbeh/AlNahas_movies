import logo from "@/assets/logos/watchly-logo.png"; // ✅ import the image

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="App Logo"
        className="h-8 w-40 rounded-lg object-cover" // adjust size here
      />
      {/* <span className="text-xl font-bold text-white">MovieVerse</span> */}
    </div>
  );
}

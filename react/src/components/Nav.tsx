import logo from "../assets/logo.webp";
const Nav = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white px-2 py-4 shadow">
      <div className="flex items-center space-x-4">
        {/* Logo Image */}
        <img
          src={logo} // Replace with your image path
          alt="Logo"
          className="h-8 w-8 object-cover rounded-full"
        />

        {/* Navbar Text */}
        <span className="text-xl font-semibold">Nav Bar</span>
      </div>
    </nav>
  );
};

export default Nav;

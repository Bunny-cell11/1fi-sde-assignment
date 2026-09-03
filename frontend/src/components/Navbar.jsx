import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900"
        >
          1Fi EMI Store
        </Link>

        <span className="text-sm text-gray-500">
          Shop Now • Pay Later
        </span>
      </div>
    </nav>
  );
}

export default Navbar;


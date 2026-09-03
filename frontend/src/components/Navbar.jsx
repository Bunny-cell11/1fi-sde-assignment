import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl"
        >
          1Fi
          <span className="ml-1 text-gray-500">EMI Store</span>
        </Link>

        <div className="hidden text-sm text-gray-500 sm:block">
          Shop now • Pay later
        </div>

        <Link
          to="/"
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
        >
          Products
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

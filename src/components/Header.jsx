import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <nav
      className="absolute top-0 left-0 w-full z-50 bg-transparent"
      ref={menuRef}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">

        {/* LOGO */}
        <div className="relative w-20 h-24 md:w-32 md:h-36">
          {/* Shield Shape */}
          <div
            className="absolute inset-0 bg-yellow-500"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)",
            }}
          />

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-12 h-12 md:w-20 md:h-20 object-contain"
            />
          </div>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center font-medium text-white">
          <li>
            <Link
              to="/#home"
              className="hover:text-yellow-400 transition"
            >
              Home
            </Link>
          </li>

          <span className="mx-4 text-gray-400">|</span>

          <li>
            <Link
              to="/#ourstory"
              className="hover:text-yellow-400 transition"
            >
              Our Story
            </Link>
          </li>

          <span className="mx-4 text-gray-400">|</span>

          <li>
            <Link
              to="/#menu"
              className="hover:text-yellow-400 transition"
            >
              Menu
            </Link>
          </li>

          <span className="mx-4 text-gray-400">|</span>

          <li>
            <Link
              to="/#recipe"
              className="hover:text-yellow-400 transition"
            >
              Recipe
            </Link>
          </li>

          <span className="mx-4 text-gray-400">|</span>

          <li>
            <Link
              to="/#ourbranches"
              className="hover:text-yellow-400 transition"
            >
              Branches
            </Link>
          </li>

          <span className="mx-4 text-gray-400">|</span>

          <li>
            <Link
              to="/#contact"
              className="hover:text-yellow-400 transition"
            >
              Contact
            </Link>
          </li>

          <span className="mx-4 text-gray-400">|</span>

          <li>
            <Link
              to="/login"
              className="hover:text-yellow-400 transition"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="md:hidden text-3xl text-white mt-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="
            md:hidden
            bg-white
            shadow-2xl
            rounded-b-3xl
            px-6
            py-5
            space-y-4
          "
        >
          <Link
            to="/#home"
            className="block text-gray-700 hover:text-yellow-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/#ourstory"
            className="block text-gray-700 hover:text-yellow-600"
            onClick={() => setMenuOpen(false)}
          >
            Our Story
          </Link>

          <Link
            to="/#menu"
            className="block text-gray-700 hover:text-yellow-600"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </Link>

          <Link
            to="/#recipe"
            className="block text-gray-700 hover:text-yellow-600"
            onClick={() => setMenuOpen(false)}
          >
            Recipe
          </Link>

          <Link
            to="/#ourbranches"
            className="block text-gray-700 hover:text-yellow-600"
            onClick={() => setMenuOpen(false)}
          >
            Branches
          </Link>

          <Link
            to="/#contact"
            className="block text-gray-700 hover:text-yellow-600"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <Link
            to="/login"
            className="
              block
              text-center
              bg-yellow-500
              text-white
              py-2
              rounded-full
              font-medium
            "
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
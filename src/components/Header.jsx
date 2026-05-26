import { Link } from "react-router-dom";
import { useState, useEffect ,useRef } from "react";
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
    return <nav className="shadow-md fixed w-full top-0 z-50 bg-[#fbf4ef]"  ref={menuRef}>
                <div className="flex justify-between items-center px-6">
                    {/* LOGO */}
                    <div className="flex items-center">
                    <img
                        src="/assets/logo.png" // replace with your logo path
                        alt="Food Godava Logo"
                        className="w-16 h-16 object-contain"
                    />
                    </div>

                    {/* DESKTOP MENU */}
                    <ul className="hidden md:flex gap-8 font-medium">
                    <li>
                        <Link to="/#home">Home</Link>
                    </li>
                    <li>
                        <Link to="/#ourstory">Our Story</Link>
                    </li>
                    <li>
                        <Link to="/#menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/#recipe">Recipe</Link>
                    </li>
                    <li>
                        <Link to="/#ourbranches">Branches</Link>
                    </li>
                    <li>
                        <Link to="/#contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    </ul>

                    {/* MOBILE BUTTON */}
                    <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                </div>

                {/* MOBILE MENU */}
                {menuOpen && (
                            <div className="md:hidden bg-white px-6 pb-4 space-y-3">
                            <Link to="/#home" className="block" onClick={() => setMenuOpen(false)}>
                                Home
                            </Link>
                            <Link to="/#ourstory" className="block" onClick={() => setMenuOpen(false)}>
                                Our Story
                            </Link>
                            <Link to="/#menu" className="block" onClick={() => setMenuOpen(false)}>
                                Menu
                            </Link>
                            <Link to="/#recipe" className="block" onClick={() => setMenuOpen(false)}>
                                Recipe
                            </Link>
                            <Link to="/#ourbranches" className="block" onClick={() => setMenuOpen(false)}>
                                Branches
                            </Link>
                            <Link to="/#contact" className="block" onClick={() => setMenuOpen(false)}>
                                Contact
                            </Link>
                            <Link to="/login" className="block" onClick={() => setMenuOpen(false)}>
                                Contact
                            </Link>
                        </div>
                )}
            </nav>;
}




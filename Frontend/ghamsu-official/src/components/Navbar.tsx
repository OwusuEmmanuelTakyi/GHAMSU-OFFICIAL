import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ghamsulogo from "../assets/ghamsulogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Ministries", href: "/ministries" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-sky-950 to-sky-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🔰 Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src={ghamsulogo}
            alt="GHAMSU Logo"
            className="h-12 w-12 rounded-full bg-white p-1 shadow-md"
          />
          <span className="text-xl md:text-2xl font-bold tracking-wide">
            GHAMSU <span className="text-yellow-400">OFFICIAL</span>
          </span>
        </NavLink>

        {/* 💻 Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-200 font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end
                className={({ isActive }) =>
                  `pb-1 transition-all duration-200 ${
                    isActive
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📲 Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-sky-950/95 border-t border-sky-800 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-gray-200">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `transition-all duration-200 ${
                      isActive
                        ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                        : "hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

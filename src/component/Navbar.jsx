import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md bg-[black]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400 cursor-pointer">
          ReactFacts
        </h1>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <a href="#" className="hover:text-blue-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400 transition">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400 transition">
              Profile
            </a>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-white text-2xl">
            ☰
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
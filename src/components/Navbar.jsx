import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">LendPro</div>
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleNavbar} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        {/* Navbar Links */}
        <div
          className={`md:flex md:items-center space-x-4 ${isOpen ? "block" : "hidden"}`}
        >
          <Link to="/" className="text-white hover:text-primary">
            Home
          </Link>
          <Link to="/dashboard" className="text-white hover:text-primary">
            Dashboard
          </Link>
          <Link to="/join" className="text-white hover:text-primary">
            Join Cooperative
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
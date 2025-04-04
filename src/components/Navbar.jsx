import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import WalletConnection from "../components/WalletConnection";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route location

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Close the navbar when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]); // Triggered whenever the route changes

  return (
    <nav className="bg-black p-4 fixed w-full z-50">
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
          className={`fixed md:static md:flex md:items-center space-x-4 bg-gray-800 md:bg-transparent p-4 md:p-0 top-0 right-0 h-full w-64 md:w-auto transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 z-40`}
        >
          <button
            onClick={toggleNavbar}
            className="md:hidden text-white absolute top-4 right-4"
          >
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <Link to="/" className="block text-white hover:text-primary mt-8 md:mt-0">
            Home
          </Link>
          <Link to="/dashboard" className="block text-white hover:text-primary">
            Dashboard
          </Link>
          
          <WalletConnection />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
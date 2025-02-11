import React from "react";


const Navbar = () => {
  return (
    <nav className="p-4 bg-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">LendPro</div>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-primary">Home</a>
          <a href="/dashboard" className="hover:text-primary">Dashboard</a>
          <a href="/join" className="hover:text-primary">Join Cooperative</a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
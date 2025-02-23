import React from "react";
import { Link } from "react-router-dom";




const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-white p-4 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-dotted-pattern opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center font-poppins">
          Welcome to LendPro
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 text-center font-poppins">
          A decentralized lending protocol for cooperatives.
        </p>
        <div className="flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <Link to="/create-cooperative">
          <button className="bg-primary px-6 py-3 md:px-8 md:py-4 rounded-lg text-lg md:text-xl hover:bg-purple-700 transition duration-300 font-poppins">
            Create a Cooperative
          </button>
        </Link>
          <Link to="/cooperative">
            <button className="bg-primary px-6 py-3 md:px-8 md:py-4 rounded-lg text-lg md:text-xl hover:bg-purple-700 transition duration-300 font-poppins">
              View Cooperatives
            </button>
          </Link>

          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
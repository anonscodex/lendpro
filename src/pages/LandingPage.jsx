import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-white p-4 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-dotted-pattern opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-7xl font-bold text-primary mb-8 text-center font-geist">
          welcome to LendPro
        </h1>
        <p className="text-2xl text-gray-300 mb-12 text-center font-geist">
          A decentralized lending protocol for cooperatives.
        </p>
        <div className="flex space-x-6">
          <Link to="">
            <button className="bg-primary px-8 py-4 rounded-lg text-xl hover:bg-purple-700 transition duration-300">
              Create a Cooperative
            </button>
          </Link>
          <Link to="/cooperative">
            <button className="bg-primary px-8 py-4 rounded-lg text-xl hover:bg-purple-700 transition duration-300">
              View Cooperatives
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
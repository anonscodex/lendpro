import React from "react";
import { Link } from "react-router-dom";

const Cooperatives = () => {
  const cooperatives = [
    { id: 1, name: "Coop 1", members: 10, funds: 1000 },
    { id: 2, name: "Coop 2", members: 5, funds: 500 },
    { id: 3, name: "Coop 3", members: 8, funds: 800 },
    { id: 4, name: "Coop 4", members: 12, funds: 1200 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Cooperatives
      </h1>
      <div className="w-full max-w-4xl space-x-6 space-x-12">
        {cooperatives.map((coop) => (
          <Link to={`/cooperative/${coop.id}`} key={coop.id}>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-row items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary mb-2">{coop.name}</h2>
                <div className="flex space-x-4">
                  <p className="text-white text-lg">Members: {coop.members}</p>
                  <p className="text-white text-lg">Funds: ${coop.funds}</p>
                </div>
              </div>
              <div>
                <button className="bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cooperatives;
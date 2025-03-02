import React from "react";
import { Link } from "react-router-dom";

const JoinCooperative = () => {
  const cooperatives = [
    { id: 1, name: "Coop 1", purpose: "Decentralized Lending", members: 10, funds: 1000 },
    { id: 2, name: "Coop 2", purpose: "Community Funding", members: 5, funds: 500 },
    { id: 3, name: "Coop 3", purpose: "Community Funding", members: 5, funds: 500 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Join a Cooperative
      </h1>
      <div className="w-full max-w-4xl space-y-6">
        {cooperatives.map((coop) => (
          <div key={coop.id} className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">{coop.name}</h2>
            <p className="text-white text-lg">Purpose: {coop.purpose}</p>
            <p className="text-white text-lg">Members: {coop.members}</p>
            <p className="text-white text-lg mb-6">Funds: ${coop.funds}</p>
            <button className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
              Request to Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinCooperative;
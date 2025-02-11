import React from "react";

const JoinCooperative = () => {
  const cooperatives = [
    { id: 1, name: "Coop 1", purpose: "Decentralized Lending", members: 10, funds: 1000 },
    { id: 2, name: "Coop 2", purpose: "Community Funding", members: 5, funds: 500 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-6">Join a Cooperative</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {cooperatives.map((coop) => (
          <div key={coop.id} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between shadow-lg">
            
            {/* Left section */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary">{coop.name}</h2>
              <p className="text-gray-300">Purpose: {coop.purpose}</p>
              <p className="text-gray-300">Members: {coop.members}</p>
              <p className="text-gray-300">Funds: ${coop.funds}</p>
            </div>

            {/* Right section */}
            <button className="bg-primary px-4 py-2 rounded">
              Request to Join
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinCooperative;

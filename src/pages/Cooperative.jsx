import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const Cooperatives = () => {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const cooperatives = [
    { id: 1, name: "Ajor", members: 10, funds: 1000 },
    { id: 2, name: "Ajor2", members: 5, funds: 500 },
    { id: 3, name: "Ajor3", members: 8, funds: 800 },
    { id: 4, name: "Coop 4", members: 12, funds: 1200 },
  ];

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleViewDetails = async (cooperativeName) => {
    try {
      if (!window.keplr) {
        alert("Please install Keplr wallet to proceed.");
        return;
      }

      await window.keplr.enable(CHAIN_ID);
      const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
      const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025untrn") }
      );

      const query = { get_cooperative: { cooperative_name: cooperativeName } };
      const result = await client.queryContractSmart(CONTRACT_ADDRESS, query);

      // Navigate to details page and pass data
      navigate(`/cooperative-details`, { state: { details: result } });
    } catch (error) {
      console.error("Failed to get cooperative:", error);
      setNotification("Failed to fetch cooperative details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Cooperatives
      </h1>
      {notification && (
        <div className="mt-6 p-4 bg-red-800 rounded-lg">
          <p className="text-white text-lg">{notification}</p>
        </div>
      )}
      <div className="w-full max-w-4xl space-y-4">
        {cooperatives.map((coop) => (
          <div key={coop.id} className="bg-gray-700 p-6 mt-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-primary mb-2">{coop.name}</h2>
              <div className="flex space-x-4">
                <p className="text-white text-lg">Members: {coop.members}</p>
                <p className="text-white text-lg">Funds: ${coop.funds}</p>
              </div>
            </div>
            <div>
              <button
                className="bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300 w-full md:w-auto"
                onClick={() => handleViewDetails(coop.name)} // Pass the cooperative name to the function
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Cooperatives;

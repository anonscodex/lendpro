import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const ExecuteProposalPage = () => {
  const [cooperativeName, setCooperativeName] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleExecuteProposal = async () => {
    if (!cooperativeName || !proposalId) {
      alert("Please enter both cooperative name and proposal ID.");
      return;
    }

    try {
      if (!window.keplr) {
        alert("Please install Keplr wallet to proceed.");
        return;
      }

      await window.keplr.enable(CHAIN_ID);
      const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
      const accounts = await offlineSigner.getAccounts();
      if (!accounts.length) {
        alert("No accounts found. Make sure your wallet is connected.");
        return;
      }
      const userAddress = accounts[0].address;
      const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025untrn") }
      );

      const msg = {
        execute_proposal: {
          cooperative_name: cooperativeName,
          proposal_id: parseInt(proposalId),
        },
      };

      const result = await client.execute(
        userAddress,
        CONTRACT_ADDRESS,
        msg,
        "auto"
      );

      console.log("Proposal executed:", result);
      alert("Proposal executed successfully!");
    } catch (error) {
      console.error("Failed to execute proposal:", error);
      alert("Failed to execute proposal. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">
        Execute Proposal
      </h1>
      <div className="w-full max-w-4xl space-y-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="cooperativeName" className="block text-lg text-white font-medium text-primary mb-2">
              Cooperative Name
            </label>
            <input
              type="text"
              id="cooperativeName"
              value={cooperativeName}
              onChange={(e) => setCooperativeName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="proposalId" className="block text-lg text-white font-medium text-primary mb-2">
              Proposal ID
            </label>
            <input
              type="number"
              id="proposalId"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            onClick={handleExecuteProposal}
            className="w-full bg-green-600 px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
          >
            Execute Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecuteProposalPage;
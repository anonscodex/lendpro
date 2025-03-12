import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const GetProposalPage = () => {
  const [proposalId, setProposalId] = useState("");
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleFetchProposal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProposal(null);

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

      const query = { get_proposal: { proposal_id: parseInt(proposalId) } };
      const result = await client.queryContractSmart(CONTRACT_ADDRESS, query);
      setProposal(result);
    } catch (error) {
      console.error("Failed to fetch proposal:", error);
      setError("Failed to fetch proposal. Please check the Proposal ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">Get Proposal Information</h1>
      <form onSubmit={handleFetchProposal} className="w-full max-w-4xl space-y-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 mt-4 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Fetching..." : "Get Proposal"}
          </button>
        </div>
      </form>
      {error && <div className="mt-6 p-4 bg-red-800 rounded-lg"><p className="text-white text-lg">{error}</p></div>}
      {proposal && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Proposal Details</h2>
          <p><strong>ID:</strong> {proposal.proposal_id}</p>
          <p><strong>Title:</strong> {proposal.title}</p>
          <p><strong>Description:</strong> {proposal.description}</p>
          <p><strong>Status:</strong> {proposal.status}</p>
          <p><strong>Votes Aye:</strong> {proposal.votes_aye}</p>
          <p><strong>Votes Nay:</strong> {proposal.votes_nay}</p>
        </div>
      )}
    </div>
  );
};

export default GetProposalPage;

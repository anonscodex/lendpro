import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const WithdrawWeightPage = () => {
  const [cooperativeName, setCooperativeName] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleWithdrawWeight = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

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

      const address = (await offlineSigner.getAccounts())[0].address;

      const msg = {
        withdraw_weight: {
          cooperative_name: cooperativeName,
          proposal_id: parseInt(proposalId),
        },
      };

      const result = await client.execute(
        address,
        CONTRACT_ADDRESS,
        msg,
        "auto"
      );

      console.log("Weight withdrawn:", result);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to withdraw weight:", error);
      setError("Failed to withdraw weight. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">
        Withdraw Proposal Voting Weight
      </h1>
      <form onSubmit={handleWithdrawWeight} className="w-full max-w-4xl space-y-6">
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
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Processing..." : "Withdraw Weight"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-800 rounded-lg">
          <p className="text-white text-lg">{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-6 p-4 bg-green-800 rounded-lg">
          <p className="text-white text-lg">Weight successfully withdrawn!</p>
        </div>
      )}
    </div>
  );
};

export default WithdrawWeightPage;
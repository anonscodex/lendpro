import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const ApproveProposalPage = () => {
  const [cooperativeName, setCooperativeName] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [weight, setWeight] = useState("0");
  const [aye, setAye] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleVote = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

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

      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;

      const msg = {
        vote: {
          cooperative_name: cooperativeName,
          proposal_id: parseInt(proposalId, 10),
          weight,
          aye,
        },
      };

      let result;
      if (parseInt(weight, 10) > 0) {
        result = await client.execute(
          address,
          CONTRACT_ADDRESS,
          msg,
          "auto",
          "",
          [{ denom: "untrn", amount: weight }]
        );
      } else {
        result = await client.execute(address, CONTRACT_ADDRESS, msg, "auto");
      }

      console.log("Vote cast:", result);
      setNotification("Vote submitted successfully!");
      setCooperativeName("");
      setProposalId("");
      setWeight("0");
      setAye(true);
    } catch (error) {
      console.error("Failed to vote:", error);
      setNotification("Failed to submit vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">
        Approve Proposal
      </h1>
      <form onSubmit={handleVote} className="w-full max-w-4xl space-y-6">
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
            <label htmlFor="proposalId" className="block text-lg font-medium text-white text-primary mb-2">
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
          <div className="mb-4">
            <label htmlFor="weight" className="block text-lg font-medium text-white text-primary mb-2">
              Voting Weight (untrn)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="text-lg font-medium text-white text-primary mr-4">Vote</label>
            <select
              value={aye}
              onChange={(e) => setAye(e.target.value === "true")}
              className="p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="true">Approve</option>
              <option value="false">Reject</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Vote"}
          </button>
        </div>
      </form>
      {notification && (
        <div className="mt-6 p-4 bg-red-800 rounded-lg">
          <p className="text-white text-lg">{notification}</p>
        </div>
      )}
    </div>
  );
};

export default ApproveProposalPage;

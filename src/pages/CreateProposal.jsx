import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const CreateProposalPage = () => {
  const [cooperativeName, setCooperativeName] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      // Ensure Keplr is installed and connected
      if (!window.keplr) {
        alert("Please install Keplr wallet to proceed.");
        return;
      }

      // Request permission to access the wallet
      await window.keplr.enable(CHAIN_ID);

      // Get the offline signer
      const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);

      // Create a signing client
      const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025untrn") } // Neutron gas denom
      );

      // Get the wallet address
      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;

      // Prepare the proposal message
      const msg = {
        propose: {
          cooperative_name: cooperativeName,
          proposal: {
            id: 1, // Ensure this is handled by the contract if not needed
            description: proposal, // Assuming the input is a description
            data: {
              denom: "tNGN",
              is_native: false,
              token_addr: "neutron1he6zd5kk03cs5ywxk5tth9qfewxwnh7k9hjwekr7gs9gl9argadsqdc9rp",
              max_loan_ratio: "0.6",
            },
            votes: [],
            aye_count: 0,
            nay_count: 0,
            aye_weights: 0,
            nay_weights: 0,
            end_time: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            proposal_type: "WhitelistToken",
            executed: false,
          },
        },
      };
      

      // Execute the proposal creation
      const result = await client.execute(address, CONTRACT_ADDRESS, msg, "auto");
      console.log("Proposal created:", result);

      // Notify the user and reset the form
      setNotification("Proposal submitted successfully!");
      setCooperativeName("");
      setProposal("");
    } catch (error) {
      console.error("Failed to create proposal:", error);
      setNotification("Failed to submit proposal. Please check the cooperative name and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">
        Create Proposal
      </h1>
      <form onSubmit={handleSubmitProposal} className="w-full max-w-4xl space-y-6">
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
            <label htmlFor="proposal" className="block text-lg font-medium text-white text-primary mb-2">
              Proposal Details
            </label>
            <textarea
              id="proposal"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              rows="5"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>
        </div>
      </form>

      {/* Display notification */}
      {notification && (
        <div className="mt-6 p-4 bg-green-800 rounded-lg">
          <p className="text-white text-lg">{notification}</p>
        </div>
      )}
    </div>
  );
};

export default CreateProposalPage;
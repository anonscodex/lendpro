import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const WithdrawFunds = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cooperativeName: "",
    token: "",
  });
  const [notification, setNotification] = useState(null);

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m"; // Replace with your contract address

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.cooperativeName || !formData.token) {
      alert("Please fill out all fields.");
      return;
    }

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

      // Retrieve the user's address
      const accounts = await offlineSigner.getAccounts();
      const userAddress = accounts[0].address;

      // Create a signing client
      const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025untrn") } // Neutron gas denom
      );

      // Prepare the withdrawal message
      const msg = {
        withdraw_contribution_and_reward: {
          cooperative_name: formData.cooperativeName,
          token: formData.token,
        },
      };

      // Execute the withdrawal function
      const result = await client.execute(
        userAddress, // Use the user's address
        CONTRACT_ADDRESS,
        msg,
        "auto"
      );

      console.log("Contribution and reward withdrawn:", result);
      setNotification("Contribution and reward withdrawn successfully!");
    } catch (error) {
      console.error("Failed to withdraw contribution and reward:", error);
      setNotification("Failed to withdraw contribution and reward. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Withdraw Funds
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-700 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Cooperative Name</label>
          <input
            type="text"
            name="cooperativeName"
            value={formData.cooperativeName}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white"
            placeholder="Enter cooperative name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-lg mb-2">Token</label>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white"
            placeholder="Enter token denom (e.g., untrn)"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300"
        >
          Withdraw Funds
        </button>
      </form>

      {notification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-white text-lg mb-4">{notification}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-purple-700 transition duration-300"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/cooperative")}
                className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition duration-300"
              >
                View Cooperative
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawFunds;
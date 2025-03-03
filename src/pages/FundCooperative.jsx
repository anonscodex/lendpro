import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const FundCooperative = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cooperativeName: "",
    token: "",
    isNative: true, // Default to native token
    amount: "",
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

  const handleNativeToggle = () => {
    setFormData({
      ...formData,
      isNative: !formData.isNative, // Toggle between native and non-native tokens
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.cooperativeName || !formData.token || !formData.amount) {
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

      // Prepare funds (convert to the correct format)
      const funds = formData.isNative
        ? [
            {
              denom: formData.token, // Token denom (e.g., "untrn")
              amount: formData.amount, // Amount as a string (e.g., "1000000")
            },
          ]
        : []; // Non-native tokens don't require funds in the message

      // Execute the fundCooperative function
      const result = await client.execute(
        userAddress, // Use the user's address
        CONTRACT_ADDRESS,
        {
          fund_cooperative: {
            cooperative_name: formData.cooperativeName,
            token: formData.token,
            is_native: formData.isNative,
            amount: formData.amount,
          },
        },
        "auto",
        undefined,
        funds
      );

      console.log("Cooperative funded:", result);
      setNotification("Cooperative funded successfully!");
    } catch (error) {
      console.error("Failed to fund cooperative:", error);
      setNotification("Failed to fund cooperative. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Fund Cooperative
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Is Native Token?</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isNative"
              checked={formData.isNative}
              onChange={handleNativeToggle}
              className="mr-2"
            />
            <span className="text-white text-lg">{formData.isNative ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-white text-lg mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white"
            placeholder="Enter amount to fund"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300"
        >
          Fund Cooperative
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

export default FundCooperative;
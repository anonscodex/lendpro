import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const RepayLoan = () => {
  const [formData, setFormData] = useState({
    cooperativeName: "",
    token: "",
    funds: "",
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

  const queryMember = async (cooperativeName, userAddress) => {
    const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
    const queryMsg = {
      get_member: {
        cooperative_name: cooperativeName,
        address: userAddress,
      },
    };
    try {
      const result = await client.queryContractSmart(CONTRACT_ADDRESS, queryMsg);
      return result;
    } catch (error) {
      console.error("Member not found:", error);
      throw new Error("Member not found. Please check your address and cooperative name.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.cooperativeName || !formData.token || !formData.funds) {
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

      // Check if the user is a member of the cooperative
      try {
        const member = await queryMember(formData.cooperativeName, userAddress);
        if (!member) {
          throw new Error("You are not a member of this cooperative.");
        }
      } catch (error) {
        console.error("Membership check failed:", error);
        setNotification("You are not a member of this cooperative. Please check your address and cooperative name.");
        return;
      }

      // Create a signing client
      const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025untrn") } // Neutron gas denom
      );

      // Prepare funds (convert to the correct format)
      const funds = [
        {
          denom: formData.token, // Token denom (e.g., "untrn")
          amount: formData.funds, // Amount as a string (e.g., "1000000")
        },
      ];

      // Execute the repay function
      const result = await client.execute(
        userAddress, // Use the user's address
        CONTRACT_ADDRESS,
        {
          repay: {
            cooperative_name: formData.cooperativeName,
            token: formData.token,
          },
        },
        "auto",
        undefined,
        funds
      );

      console.log("Loan repaid:", result);
      setNotification("Loan repayment submitted successfully!");
    } catch (error) {
      console.error("Failed to repay loan:", error);
      setNotification("Failed to submit loan repayment. Please try again.");
    }
  };

  if (!window.keplr) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Keplr Wallet Required
        </h1>
        <p className="text-white text-lg mb-6">
          Please install the Keplr wallet to use this application.
        </p>
        <a
          href="https://www.keplr.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
        >
          Install Keplr
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Repay Loan
      </h1>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-primary mb-4">Loan Repayment</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
            <label className="block text-white text-lg mb-2">Amount</label>
            <input
              type="number"
              name="funds"
              value={formData.funds}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter amount to repay"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300"
          >
            Repay Loan
          </button>
        </form>

        {notification && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-white text-lg">{notification}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepayLoan;
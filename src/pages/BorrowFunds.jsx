import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const BorrowFunds = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: "",
    duration: "",
    cooperativeName: "",
    tokensIn: "",
    tokenOut: "",
    minAmountOut: "",
  });
  const [notification, setNotification] = useState(null);

  const userContribution = 500; // Example contribution
  const borrowingLimit = userContribution * 2; // Example limit

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron1hjle7jv48ejfsq54lt8x6g6d7n4s7vxaln5rkt5tl09ms3x0tsssyf4vft"; // Replace with your contract address

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
    if (
      !formData.loanAmount ||
      !formData.interestRate ||
      !formData.duration ||
      !formData.cooperativeName ||
      !formData.tokensIn ||
      !formData.tokenOut ||
      !formData.minAmountOut
    ) {
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

      // Execute the borrow function
      const funds = []; // Add funds if required by the contract
      const result = await client.execute(
        userAddress, // Use the user's address
        CONTRACT_ADDRESS,
        {
          borrow: {
            cooperative_name: formData.cooperativeName,
            tokens_in: formData.tokensIn,
            amount_in: formData.loanAmount,
            token_out: formData.tokenOut,
            min_amount_out: formData.minAmountOut,
          },
        },
        "auto",
        undefined,
        funds
      );

      console.log("Borrow executed:", result);
      setNotification("Borrow request submitted successfully!");
    } catch (error) {
      console.error("Failed to borrow:", error);
      setNotification("Failed to submit borrow request. Please try again.");
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
      <h1 className="text-4xl font-bold text-primary mt-16 text-center">
        Borrow Funds
      </h1>
      <div className="bg-gray-700 mt-16 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-primary mb-4">Eligibility</h2>
        <p className="text-white text-lg">Your Contribution: ${userContribution}</p>
        <p className="text-white text-lg mb-6">Borrowing Limit: ${borrowingLimit}</p>

        <h2 className="text-2xl font-bold text-primary mb-4">Loan Details</h2>
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
            <label className="block text-white text-lg mb-2">Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter interest rate"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Duration (Months)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter duration"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Tokens In</label>
            <input
              type="text"
              name="tokensIn"
              value={formData.tokensIn}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter tokens in"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Token Out</label>
            <input
              type="text"
              name="tokenOut"
              value={formData.tokenOut}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter token out"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-lg mb-2">Minimum Amount Out</label>
            <input
              type="number"
              name="minAmountOut"
              value={formData.minAmountOut}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter minimum amount out"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300"
          >
            Submit Request
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

export default BorrowFunds;
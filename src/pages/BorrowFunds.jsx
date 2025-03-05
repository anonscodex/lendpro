import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const BorrowFunds = () => {
  const [formData, setFormData] = useState({
    cooperativeName: "",
    tokensIn: "", 
    amountsIn: "", 
    tokenOut: "", 
    minAmountOut: "", 
  });
  const [notification, setNotification] = useState(null);

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m"; // Replace with your contract address


  const validTokens = [
    { denom: "untrn", isNative: true }, // Native token
    { denom: "tAtom", isNative: false }, // CW20 token 1
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateTokens = (tokens) => {
    const tokenList = tokens.split(",").map((token) => token.trim());
    for (const token of tokenList) {
      const isValid = validTokens.some((validToken) => validToken.denom === token);
      if (!isValid) {
        throw new Error(`Invalid token: ${token}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.cooperativeName ||
      !formData.tokensIn ||
      !formData.amountsIn ||
      !formData.tokenOut ||
      !formData.minAmountOut
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Validate tokens
      validateTokens(formData.tokensIn);
      validateTokens(formData.tokenOut);

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

      // Prepare the borrow message
      const tokensIn = formData.tokensIn.split(",").map((token) => token.trim()); // Convert to Vec<Addr>
      const amountsIn = formData.amountsIn.split(",").map((amount) => amount.trim()); // Convert to Vec<Uint128>

      const msg = {
        borrow: {
          cooperative_name: formData.cooperativeName,
          tokens_in: tokensIn,
          amount_in: amountsIn,
          token_out: formData.tokenOut,
          min_amount_out: formData.minAmountOut,
        },
      };

      // Execute the borrow function
      const result = await client.execute(
        userAddress, // Use the user's address
        CONTRACT_ADDRESS,
        msg,
        "auto"
      );

      console.log("Borrow executed:", result);
      setNotification("Borrow request submitted successfully!");
    } catch (error) {
      console.error("Failed to borrow:", error);
      setNotification(`Failed to submit borrow request`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Borrow Funds
      </h1>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-2xl">
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
            <label className="block text-white text-lg mb-2">Tokens In</label>
            <input
              type="text"
              name="tokensIn"
              value={formData.tokensIn}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter token here"
              required
            />
           
          </div>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Amounts In </label>
            <input
              type="text"
              name="amountsIn"
              value={formData.amountsIn}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter amounts here"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Token Out </label>
            <input
              type="text"
              name="tokenOut"
              value={formData.tokenOut}
              onChange={handleChange}
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter token out here"
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
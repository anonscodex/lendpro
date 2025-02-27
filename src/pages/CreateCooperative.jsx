import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const CreateCooperative = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    initialContribution: "",
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";

  const createCooperative = async () => {
    try {
      const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
      const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025untrn") }
      );

      const riskProfile = {
        interest_rate: "0.05",
        collateralization_ratio: "1.5",
      };

      const initialMembers = [
        {
          address: "neutron107nhk9pqhp446fr0fc83z0v82rg9guy8runkuz",
          contribution: [[0, "0"]],
          share: [[0, "0"]],
          joined_at: Math.floor(Date.now() / 1000),
          reputation_score: "1.0",
          active_loans: [],
        },
      ];

      const initialWhitelistedTokens = [
        {
          denom: "untrn",
          is_native: true,
          max_loan_ratio: "0.7",
        },
        {
          denom: "tATOM",
          contract_addr: "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj",
          is_native: false,
          max_loan_ratio: "0.65",
        },
      ];

      const msg = {
        create_cooperative: {
          name: formData.name,
          risk_profile: riskProfile,
          initial_members: initialMembers,
          initial_whitelisted_tokens: initialWhitelistedTokens,
        },
      };

      const result =  async() => await this.client.execute(
        this.address,
        CONTRACT_ADDRESS,
        msg,
        "auto"
      );

      console.log("Cooperative created:", result);
      setNotification("Cooperative created successfully!");
    } catch (error) {
      console.error("Failed to create cooperative:", error);
      setNotification("Failed to create cooperative. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.initialContribution) {
      alert("Please fill out all fields.");
      return;
    }

    createCooperative();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mt-24 text-center">
        Create a Cooperative
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-700 p-6 mt-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block text-white text-lg mb-2">
            Cooperative Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter cooperative name"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-white text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
            placeholder="Enter a brief description of the cooperative"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="initialContribution" className="block text-white text-lg mb-2">
            Initial Contribution
          </label>
          <input
            type="number"
            id="initialContribution"
            name="initialContribution"
            value={formData.initialContribution}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter initial contribution amount"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300"
        >
          Create Cooperative
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

export default CreateCooperative;



const result =  async() => await this.client.execute(
  this.address,
  CONTRACT_ADDRESS,
  msg,
  "auto"
);
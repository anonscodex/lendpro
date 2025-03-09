import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const IncreaseAllowancePage = () => {
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CW20_CONTRACT = "neutron1he6zd5kk03cs5ywxk5tth9qfewxwnh7k9hjwekr7gs9gl9argadsqdc9rp"; // Replace with actual contract

  const isValidBech32 = (address) => /^neutron1[a-z0-9]{38}$/.test(address);

  const handleIncreaseAllowance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    if (!isValidBech32(spender)) {
      setNotification("Invalid spender address format.");
      setLoading(false);
      return;
    }

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
        increase_allowance: {
          spender: spender,
          amount: amount.toString(),
        },
      };

      const result = await client.execute(
        address,
        CW20_CONTRACT,
        msg,
        "auto"
      );

      console.log("Allowance increased:", result);
      setNotification("Allowance increased successfully!");
      setSpender("");
      setAmount("");
    } catch (error) {
      console.error("Failed to increase allowance:", error);
      setNotification("Failed to increase allowance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">
        Increase Token Allowance
      </h1>
      <form onSubmit={handleIncreaseAllowance} className="w-full max-w-4xl space-y-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="spender" className="block text-lg text-white font-medium text-primary mb-2">
              Spender Address
            </label>
            <input
              type="text"
              id="spender"
              value={spender}
              onChange={(e) => setSpender(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-lg font-medium text-white text-primary mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Processing..." : "Increase Allowance"}
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

export default IncreaseAllowancePage;

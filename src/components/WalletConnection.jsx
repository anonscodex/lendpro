import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connectors";

const WalletConnection = () => {
  const { activate, deactivate, active, account } = useWeb3React();

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {active ? (
        <div className="flex items-center space-x-2">
          <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
          <button onClick={deactivate} className="bg-red-500 px-4 py-2 rounded">
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} className="bg-primary px-4 py-2 rounded">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnection;
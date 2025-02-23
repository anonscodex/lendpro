import React from "react";
import { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";


if (typeof window !== "undefined") {
  window.KeplrWindow = window.KeplrWindow || {};
}

const WalletConnection = () => {
  const [account, setAccount] = useState('');

  const CONTRACT_ADDRESS = "neutron1hjle7jv48ejfsq54lt8x6g6d7n4s7vxaln5rkt5tl09ms3x0tsssyf4vft";
  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";

  // Chain configuration for Keplr
  const chainConfig = {
    chainId: CHAIN_ID,
    chainName: 'Neutron Testnet',
    rpc: RPC_ENDPOINT,
    rest: 'https://rest-palvus.pion-1.ntrn.tech',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'neutron',
      bech32PrefixAccPub: 'neutronpub',
      bech32PrefixValAddr: 'neutronvaloper',
      bech32PrefixValPub: 'neutronvaloperpub',
      bech32PrefixConsAddr: 'neutronvalcons',
      bech32PrefixConsPub: 'neutronvalconspub',
    },
    currencies: [
      {
        coinDenom: 'NTRN',
        coinMinimalDenom: 'untrn',
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'NTRN',
        coinMinimalDenom: 'untrn',
        coinDecimals: 6,
      },
    ],
    stakeCurrency: {
      coinDenom: 'NTRN',
      coinMinimalDenom: 'untrn',
      coinDecimals: 6,
    },
    gasPrices: '0.025untrn',
    gasAdjustment: 1.3,
  };

  // Connect to Keplr wallet
  const connectWallet = async () => {
    try {
      if (!window.keplr) {
        throw new Error("Please install Keplr extension");
      }

      // Suggest chain to Keplr
      await window.keplr.experimentalSuggestChain(chainConfig);

      // Enable access to Keplr
      await window.keplr.enable(CHAIN_ID);

      const key = await window.keplr.getKey(CHAIN_ID);
      setAccount(key.bech32Address);
    } catch (error) {
      console.error(error);
      // setError(error.message); // Commented out this line
    }
  };


  return (
    <div>
      
      {!account ? (
            <button 
              onClick={connectWallet}
              className="bg-primary px-6 py-3 md:px-8 md:py-4 rounded-lg text-sm md:text-sm hover:bg-purple-700 transition duration-300 font-poppins"
            >
              Connect Keplr Wallet
            </button>
          ) : (
            <button className="bg-primary px-6 py-3 md:px-8 md:py-4 rounded-lg text-sm md:text-sm hover:bg-purple-700 transition duration-300 font-poppins">
              
                Connected: {account.slice(0, 8)}...{account.slice(-8)}
              
            </button>
          )}
      
    </div>
  );
};

export default WalletConnection;
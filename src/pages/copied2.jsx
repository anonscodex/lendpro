// Example usage
const runExample = async () => {
    try {
        const mnemonic = process.env.MNEMONIC
        const client = new CooperativeClient(mnemonic);
        await client.connect();
  
        // Example: Create a cooperative
        const riskProfile = {
            interest_rate: "0.05", // 5%
            collateralization_ratio: "1.5", // 150%
        };
        
        const initialMembers = [
            {
              address: "neutron107nhk9pqhp446fr0fc83z0v82rg9guy8runkuz",
              contribution: [[0, "0"]], 
              share: [[0, "0"]], 
              joined_at: Math.floor(Date.now() / 1000), // Current timestamp in seconds
              reputation_score: "1.0",
              active_loans: [],
            }
        ];
        
        const initialWhitelistedTokens = [
            {
              denom: "untrn",
              is_native: true,
              max_loan_ratio: "0.7", // 70%
            },
            {
              denom: "tATOM",
              contract_addr: "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj", // tATOM
              is_native: false,
              max_loan_ratio: "0.65", // 65%
            }
        ];
        
         await client.createCooperative(
             "My Cooperative",
             riskProfile,
             initialMembers,
             initialWhitelistedTokens
         );     
  
        // Example: Fund a cooperative with native token
        await client.fundCooperative(
            "My Cooperative",
            "untrn",
            true,
            "1", 
            [
              {
                  denom: "untrn",
                  amount: "1"
              }
            ]
        );
  
        // Example: Fund a cooperative with cw20 token
        // increase tATOM allowance 
        await client.increaseAllowance(
          "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj", 
          CONTRACT_ADDRESS, 
          "200"
        );
  
        await client.fundCooperative(
            "My Cooperative",
            "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj",
            false,
            "200",
            []
        );
        
        // Example: Create a proposal to whitelist a new token
        const proposal = {
            id: 1, // This will be assigned by the contract
            description: "Add NGN as a whitelisted token",
            data: {
              denom: "tNGN", 
              is_native: false,
              token_addr: "neutron1he6zd5kk03cs5ywxk5tth9qfewxwnh7k9hjwekr7gs9gl9argadsqdc9rp", // tNGN
              max_loan_ratio: "0.6", // 60%
            },
            votes: [],
            aye_count: 0,
            nay_count: 0,
            aye_weights: 0,
            nay_weights: 0,
            end_time: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 1 week from now
            proposal_type: "WhitelistToken",
            executed: false
        };
        
        await client.propose(
            "My Cooperative",
            proposal
        );
        
        // Example: Vote on proposal to whitelist a new token
        await client.vote(
          "My Cooperative",
          1,
          "0",
          true
        );
  
        // Example: Update token price
        await client.updateTokenPrice(
          "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj",
          4.5
        )
  
        // Example: Take a loan
        await client.borrow(
          "My Cooperative",
          ["neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj"],
          ["1"],
          "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj",
          "0"
        );
  
        // Example: Repay loan
        // increase tATOM allowance 
        await client.increaseAllowance(
          "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj", 
          CONTRACT_ADDRESS, 
          "2"
        );
  
        await client.repay(
          "My Cooperative",
          "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj"
        );
      
    } catch (error) {
        console.error("Error in example:", error);
    }
  };
  
  runExample().catch(console.error);





  //view cooperatie code 
  import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const CHAIN_ID = "pion-1";
const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

const Cooperatives = () => {
  const [cooperatives, setCooperatives] = useState([]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCooperatives = async () => {
      try {
        if (!window.keplr) {
          setNotification("Please install Keplr wallet to proceed.");
          return;
        }

        await window.keplr.enable(CHAIN_ID);
        const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
        const client = await SigningCosmWasmClient.connectWithSigner(
          RPC_ENDPOINT,
          offlineSigner,
          { gasPrice: GasPrice.fromString("0.025untrn") }
        );

        const query = { list_cooperatives: {} };
        const result = await client.queryContractSmart(CONTRACT_ADDRESS, query);
        setCooperatives(result.cooperatives || []);
      } catch (error) {
        console.error("Failed to fetch cooperatives:", error);
        setNotification("Failed to load cooperatives. Please try again.");
      }
    };

    fetchCooperatives();
  }, []);

  const handleViewDetails = async (cooperativeName) => {
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

      const query = { get_cooperative: { cooperative_name: cooperativeName } };
      const result = await client.queryContractSmart(CONTRACT_ADDRESS, query);

      navigate(`/cooperative-details`, { state: { details: result } });
    } catch (error) {
      console.error("Failed to get cooperative details:", error);
      setNotification("Failed to fetch cooperative details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">Cooperatives</h1>
      <div className="w-full max-w-4xl space-y-6">
        {cooperatives.length > 0 ? (
          cooperatives.map((coop, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary mb-2">{coop.name}</h2>
                <p className="text-lg">Members: {coop.members}</p>
                <p className="text-lg">Funds: ${coop.funds}</p>
              </div>
              <button
                className="bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition"
                onClick={() => handleViewDetails(coop.name)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg">No cooperatives found.</p>
        )}
      </div>

      {notification && (
        <div className="mt-6 p-4 bg-red-800 rounded-lg">
          <p className="text-white text-lg">{notification}</p>
        </div>
      )}
    </div>
  );
};

export default Cooperatives;

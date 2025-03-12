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







import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

const GetProposalPage = () => {
  const [proposalId, setProposalId] = useState("");
  const [proposalInfo, setProposalInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CHAIN_ID = "pion-1";
  const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleGetProposal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProposalInfo(null);

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

      const query = {
        get_proposal: {
          proposal_id: parseInt(proposalId),
        },
      };

      const result = await client.queryContractSmart(CONTRACT_ADDRESS, query);
      setProposalInfo(result);
    } catch (error) {
      console.error("Failed to get proposal:", error);
      setError("Failed to retrieve proposal. Please check the ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">
        Get Proposal Information
      </h1>
      <form onSubmit={handleGetProposal} className="w-full max-w-4xl space-y-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="proposalId" className="block text-lg text-white font-medium text-primary mb-2">
              Proposal ID
            </label>
            <input
              type="number"
              id="proposalId"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Fetching..." : "Get Proposal"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-800 rounded-lg">
          <p className="text-white text-lg">{error}</p>
        </div>
      )}

      {proposalInfo && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-white">
          <h2 className="text-xl font-bold text-primary">Proposal Details</h2>
          <pre className="whitespace-pre-wrap break-words mt-2">{JSON.stringify(proposalInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

//export default GetProposalPage;






import React, { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

//const GetProposalPage = () => {
  const [proposalId, setProposalId] = useState("");
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //const CHAIN_ID = "pion-1";
 // const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
  //const CONTRACT_ADDRESS = "neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m";

  const handleFetchProposal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProposal(null);

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

      const query = { get_proposal: { proposal_id: parseInt(proposalId) } };
      const result = await client.queryContractSmart(CONTRACT_ADDRESS, query);
      setProposal(result);
    } catch (error) {
      console.error("Failed to fetch proposal:", error);
      setError("Failed to fetch proposal. Please check the Proposal ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">Get Proposal Information</h1>
      <form onSubmit={handleFetchProposal} className="w-full max-w-4xl space-y-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <label htmlFor="proposalId" className="block text-lg text-white font-medium text-primary mb-2">
            Proposal ID
          </label>
          <input
            type="number"
            id="proposalId"
            value={proposalId}
            onChange={(e) => setProposalId(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 mt-4 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Fetching..." : "Get Proposal"}
          </button>
        </div>
      </form>
      {error && <div className="mt-6 p-4 bg-red-800 rounded-lg"><p className="text-white text-lg">{error}</p></div>}
      {proposal && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Proposal Details</h2>
          <p><strong>ID:</strong> {proposal.proposal_id}</p>
          <p><strong>Title:</strong> {proposal.title}</p>
          <p><strong>Description:</strong> {proposal.description}</p>
          <p><strong>Status:</strong> {proposal.status}</p>
          <p><strong>Votes Aye:</strong> {proposal.votes_aye}</p>
          <p><strong>Votes Nay:</strong> {proposal.votes_nay}</p>
        </div>
      )}
    </div>
  );
//};

//export default GetProposalPage;2

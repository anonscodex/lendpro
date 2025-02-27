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
import React from "react";
import { useParams, Link } from "react-router-dom";

const CooperativeDetails = () => {
  const { id } = useParams(); // Get the cooperative ID from the URL

  // Dummy data for cooperatives
  const cooperatives = [
    {
      id: 1,
      name: "Coop 1",
      description: "A cooperative focused on decentralized lending.",
      foundingMembers: ["Alice", "Bob"],
      members: [
        { id: 1, name: "Alice", contribution: 500, votingPower: 50 },
        { id: 2, name: "Bob", contribution: 300, votingPower: 30 },
      ],
      fundPool: {
        balance: 1000,
        recentContributions: [500, 300, 200],
        totalLoans: 700,
      },
      activity: [
        { type: "Contribution", amount: 500, user: "Alice", date: "2023-10-01" },
        { type: "Loan", amount: 200, user: "Bob", date: "2023-10-02" },
      ],
    },
    {
      id: 2,
      name: "Coop 2",
      description: "A cooperative for community funding.",
      foundingMembers: ["Charlie", "Dave"],
      members: [
        { id: 1, name: "Charlie", contribution: 400, votingPower: 40 },
        { id: 2, name: "Dave", contribution: 600, votingPower: 60 },
      ],
      fundPool: {
        balance: 800,
        recentContributions: [400, 600],
        totalLoans: 500,
      },
      activity: [
        { type: "Contribution", amount: 400, user: "Charlie", date: "2023-10-03" },
        { type: "Loan", amount: 300, user: "Dave", date: "2023-10-04" },
      ],
    },
  ];

  // Find the cooperative by ID
  const cooperative = cooperatives.find((coop) => coop.id === parseInt(id));

  if (!cooperative) {
    return <div className="text-white text-center">Cooperative not found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        {cooperative.name}
      </h1>
      {/* Bento-style grid layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-2xl font-bold text-primary mb-4">Overview</h2>
          <p className="text-white text-lg">{cooperative.description}</p>
          <p className="text-white text-lg mt-2">
            Founding Members: {cooperative.foundingMembers.join(", ")}
          </p>
        </div>

        {/* Members Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Members</h2>
          <ul>
            {cooperative.members.map((member) => (
              <li key={member.id} className="text-white text-lg">
                {member.name} - Contribution: ${member.contribution} - Voting Power: {member.votingPower}%
              </li>
            ))}
          </ul>
        </div>

        {/* Fund Pool Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Fund Pool</h2>
          <p className="text-white text-lg">Current Balance: ${cooperative.fundPool.balance}</p>
          <p className="text-white text-lg">Recent Contributions: ${cooperative.fundPool.recentContributions.join(", ")}</p>
          <p className="text-white text-lg">Total Loans: ${cooperative.fundPool.totalLoans}</p>
        </div>

        {/* Activity Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-2">
          <h2 className="text-2xl font-bold text-primary mb-4">Activity</h2>
          <ul>
            {cooperative.activity.map((activity, index) => (
              <li key={index} className="text-white text-lg">
                {activity.type} - ${activity.amount} by {activity.user} on {activity.date}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions Section at the Bottom */}
      <div className="w-full max-w-6xl mt-8">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Actions</h2>
          <div className="flex space-x-2">
            
            <button className="bg-primary px-2 py-2  rounded-lg text-sm hover:bg-purple-700 transition duration-300 ">
              Contribute Funds
            </button>
            <Link to="/borrowfunds">
            <button className="bg-primary px-2 py-2 rounded-lg text-sm hover:bg-purple-700 transition duration-300">
              Borrow Funds
            </button>
            </Link>
            <button className="bg-primary px-2 py-2 rounded-lg text-sm hover:bg-purple-700 transition duration-300">
              Vote on New Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CooperativeDetails;
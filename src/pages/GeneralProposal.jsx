import React from "react";
import { useNavigate } from "react-router-dom";

const GeneralProposalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl mt-16 font-bold text-primary mb-12 text-center">
        Proposal Management
      </h1>
      <div className="w-full max-w-4xl space-y-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
          <button
            onClick={() => navigate("/create-proposal")}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            Create Proposal
          </button>
          <button
            onClick={() => navigate("/approve-proposal")}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            Approve Proposal
          </button>
          <button
            onClick={() => navigate("/execute-proposal")}
            className="w-full bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300"
          >
            Execute Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralProposalPage;
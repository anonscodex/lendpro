import React from "react";

const CooperativeCard = ({ cooperative }) => {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-row items-center justify-between">
      {/* Left Section: Cooperative Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-primary mb-2">{cooperative.name}</h2>
        <div className="flex space-x-4">
          <p className="text-white text-lg">Members: {cooperative.members}</p>
          <p className="text-white text-lg">Funds: ${cooperative.funds}</p>
        </div>
      </div>

      {/* Right Section: Action Button */}
      <div>
        <button className="bg-primary px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CooperativeCard;
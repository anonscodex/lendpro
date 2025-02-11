import React from "react";

const CooperativeCard = ({ cooperative }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-primary mb-2">{cooperative.name}</h2>
      <div className="flex space-x-4">
        <p className="text-white text-lg">Members: {cooperative.members}</p>
        <p className="text-white text-lg">Funds: ${cooperative.funds}</p>
      </div>
      <button className="mt-4 bg-primary px-4 py-2 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
        View Details
      </button>
    </div>
  );
};

export default CooperativeCard;
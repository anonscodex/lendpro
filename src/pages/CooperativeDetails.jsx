import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CooperativeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cooperativeDetails = location.state?.details;

  if (!cooperativeDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="text-lg">No details available.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-primary rounded-lg">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-white p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Cooperative Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <p className="text-lg">
          <span className="font-bold">Name:</span> {cooperativeDetails.name}
        </p>
        <p className="text-lg">
          <span className="font-bold">Members:</span> {cooperativeDetails.members}
        </p>
        <p className="text-lg">
          <span className="font-bold">Funds:</span> ${cooperativeDetails.funds}
        </p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-2 bg-primary rounded-lg hover:bg-purple-700 transition"
      >
        Back
      </button>

      {/* Actions Section at the Bottom */}
 <div className="w-full max-w-6xl mt-8">
 <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
   <h2 className="text-2xl font-bold text-primary mb-4">Actions</h2>
   <div className="flex space-x-2">
     
     <button className="bg-primary px-2 py-2  rounded-lg text-sm hover:bg-purple-700 transition duration-300 ">
       Contribute Funds
     </button>
     <Link to="/borrow">
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



 
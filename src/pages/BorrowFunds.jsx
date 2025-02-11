import React from "react";

const BorrowFunds = () => {
  const userContribution = 500; // Example contribution
  const borrowingLimit = userContribution * 2; // Example limit

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">
        Borrow Funds
      </h1>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-primary mb-4">Eligibility</h2>
        <p className="text-white text-lg">Your Contribution: ${userContribution}</p>
        <p className="text-white text-lg mb-6">Borrowing Limit: ${borrowingLimit}</p>

        <h2 className="text-2xl font-bold text-primary mb-4">Loan Details</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Loan Amount</label>
            <input
              type="number"
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Interest Rate (%)</label>
            <input
              type="number"
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter interest rate"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-lg mb-2">Duration (Months)</label>
            <input
              type="number"
              className="w-full bg-gray-600 p-3 rounded-lg text-white"
              placeholder="Enter duration"
            />
          </div>
          <button className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowFunds;
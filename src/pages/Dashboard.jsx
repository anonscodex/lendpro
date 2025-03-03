import React from "react";
import CooperativeCard from "../components/CooperativeCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Dummy data for cooperatives the user is part of
  const cooperatives = [
    { id: 1, name: "Coop 1", members: 10, funds: 1000 },
    { id: 2, name: "Coop 2", members: 5, funds: 500 },
  ];

  // Dummy data for notifications
  const notifications = [
    { id: 1, message: "Pending vote for new member in Coop 1", date: "2023-10-01" },
    { id: 2, message: "Loan repayment received in Coop 2", date: "2023-10-02" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Dashboard
      </h1>

      {/* Bento-style grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cooperatives Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-2xl font-bold text-primary mb-6">Your Cooperatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {cooperatives.map((coop) => (
              <CooperativeCard key={coop.id} cooperative={coop} />
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/cooperative">
            <button className="bg-primary mb-4 px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
              View Cooperative Details
            </button>
            </Link>
            <Link to="/create-cooperative">
            <button className="bg-primary  px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
              Create a New Cooperative
            </button>
            </Link>
            <Link to="/fund">
            <button className="bg-primary mt-4 px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
              Contribute Funds
            </button>
            </Link>
            <Link to="/join">
            <button className="bg-primary mt-4 px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
              Request to Join a Cooperative
            </button>
            </Link>
            <Link to="/borrow">
            <button className="bg-primary mt-4 px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
              Borrow Funds
            </button>
            </Link>
            <Link to="/repay">
            <button className="bg-primary mt-4 px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300">
              Repay Funds
            </button>
            </Link>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-bold text-primary mb-6">Notifications</h2>
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="bg-gray-600 p-4 rounded-lg">
                <p className="text-white text-lg">{notification.message}</p>
                <p className="text-gray-400 text-sm">{notification.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
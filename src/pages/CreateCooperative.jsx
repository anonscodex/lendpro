import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCooperative = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    initialContribution: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.description || !formData.initialContribution) {
      alert("Please fill out all fields.");
      return;
    }

    // Log the form data (replace with API call in a real app)
    console.log("Form Data:", formData);

    // Redirect to the dashboard after creating the cooperative
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-4">
      <h1 className="text-4xl font-bold text-primary mt-24 text-center">
        Create a Cooperative
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-700 p-6 mt-6 rounded-lg shadow-lg">
        {/* Cooperative Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-white text-lg mb-2">
            Cooperative Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter cooperative name"
            required
          />
        </div>

        {/* Cooperative Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-white text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
            placeholder="Enter a brief description of the cooperative"
            required
          />
        </div>

        {/* Initial Contribution */}
        <div className="mb-6">
          <label htmlFor="initialContribution" className="block text-white text-lg mb-2">
            Initial Contribution
          </label>
          <input
            type="number"
            id="initialContribution"
            name="initialContribution"
            value={formData.initialContribution}
            onChange={handleChange}
            className="w-full bg-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter initial contribution amount"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary px-6 py-3 rounded-lg text-lg w-full hover:bg-purple-700 transition duration-300"
        >
          Create Cooperative
        </button>
      </form>
    </div>
  );
};

export default CreateCooperative;
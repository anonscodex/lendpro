import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CooperativeDetails from "./pages/CooperativeDetails";
import JoinCooperative from "./pages/JoinCooperative";
import Cooperative from "./pages/Cooperative";





import Navbar from "./components/Navbar";
import BorrowFunds from "./pages/BorrowFunds";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cooperative/:id" element={<CooperativeDetails />} />
          <Route path="/join" element={<JoinCooperative />} />
          <Route path="/cooperative" element={<Cooperative />} />
          <Route path="/borrowfunds" element={<BorrowFunds />} />
          
         
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
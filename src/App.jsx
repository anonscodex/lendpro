import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CooperativeDetails from "./pages/CooperativeDetails";
import JoinCooperative from "./pages/JoinCooperative";
//import LendingActivity from "./pages/LendingActivity";
import BorrowFunds from "./pages/BorrowFunds";
import Navbar from "./components/Navbar";
import Cooperative from "./pages/Cooperative";

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
          <Route path="/borrow" element={<BorrowFunds />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
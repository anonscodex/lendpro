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
import CreateCooperative from "./pages/CreateCooperative";
import RepayFund from "./pages/RepayFund";
import Fund from "./pages/FundCooperative";
import WithdrawFunds from "./pages/WithdrawFund";
import CreateProposalPage from "./pages/CreateProposal";
import ApproveProposalPage from "./pages/ApproveProposal";
import IncreaseAllowancePage from "./pages/IncreaseAllowance";
import ProposalInfo from "./pages/ProposalInfo";
import ExecuteProposalPage from "./pages/ExecuteProposal";
import WithdrawWeightPage from "./pages/WithdrawProposal";
import GeneralProposalPage from "./pages/GeneralProposal";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cooperative-details" element={<CooperativeDetails />} />
          <Route path="/join" element={<JoinCooperative />} />
         <Route path="/cooperative" element={<Cooperative />} />
          <Route path="/borrow" element={<BorrowFunds />} />
          <Route path="/create-cooperative" element={<CreateCooperative />} />
          <Route path="/repay" element={<RepayFund />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/withdraw" element={<WithdrawFunds />} />
          <Route path="/create-proposal" element={<CreateProposalPage />} />
          <Route path="/approve-proposal" element={<ApproveProposalPage />} />
          <Route path="/increase-allowance" element={<IncreaseAllowancePage />} />
          <Route path="/proposal-info" element={<ProposalInfo />} />
          <Route path="/execute-proposal" element={<ExecuteProposalPage />} />
          <Route path="/withdraw-weight" element={<WithdrawWeightPage />} />
          <Route path="/general-proposal" element={<GeneralProposalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
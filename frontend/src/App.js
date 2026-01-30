import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import UploadResumes from "./pages/UploadResumes";
import Results from "./pages/Results";
import CandidateDetail from "./pages/CandidateDetail";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Add JD */}
        <Route path="/jobs" element={<Jobs />} />

        {/* Upload Resumes */}
        <Route path="/resumes" element={<UploadResumes />} />

        {/* Results */}
        <Route path="/results" element={<Results />} />

        {/* Candidate Detail */}
        <Route path="/candidate/:id" element={<CandidateDetail />} />
      </Routes>
    </>
  );
}

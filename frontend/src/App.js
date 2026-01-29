import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import UploadResumes from "./pages/UploadResumes";
import Results from "./pages/Results";

import { ResultsProvider } from "./context/ResultsContext";

export default function App() {
  return (
    <ResultsProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Dashboard is now landing page */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/upload" element={<UploadResumes />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ResultsProvider>
  );
}

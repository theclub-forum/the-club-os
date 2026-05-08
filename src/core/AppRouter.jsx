import { BrowserRouter, Routes, Route } from "react-router-dom";

import IntroExperience from "../experience/IntroExperience";
import Dashboard from "../app/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroExperience />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticatedGuard from "./guards/AutheticatedGuard";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PublicGuard from "./guards/PublicGuard";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicGuard />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<AuthenticatedGuard />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

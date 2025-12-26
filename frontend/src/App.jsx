import React from "react";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AllBlog from "./components/Blog/AllBlog";
import Hackathon from "./components/Hackathon/Hackathon";
import HackathonDetail from "./components/Hackathon/HackathonDetail";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AdminDashboard from "./components/Dashboard/Dashboard";
import OAuthSuccess from "./components/Auth/OAuthSuccess";
import Footer from "./components/Footer";

import About from "./components/About";
// import Results from "./components/Results";


// 🔐 Protected Route (Requires Login)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// 🌐 Public Route (Redirect if Logged In)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-blog" element={<AllBlog />} />
        <Route path="/hackathons" element={<Hackathon />} />
        <Route path="/hackathons/:id" element={<HackathonDetail />} />
        <Route path="/dashboards" element={<AdminDashboard />} />
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Google OAuth Success */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-white text-center mt-20">
              404 - Not Found
            </h1>
          }
        />
      </Routes>
      
    </Router>
  );
}

export default App;

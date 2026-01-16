import React from "react";
import Navbar from "./components/Navbar";
import Privacy from "./components/privacy/Privacy";

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
import SlidingAuthPage from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import OAuthSuccess from "./components/Auth/OAuthSuccess";

import AdminDashboard from "./components/Dashboard/Dashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import Footer from "./components/Footer";
import PartnerPage from "./components/Partner/PartnerPage";

import About from "./components/About";
import Results from "./components/Results/Results";
import FAQ from "./components/FAQ";
import PastResults from "./components/Results/PastResults";
import Error404Page from "./components/404ErrorPage";
import BlogDetailsPage from "./components/Blog/BlogDetailsPage";
import Sponsor from "./components/Sponsor/Sponsor";
import Career from "./components/Career/Career";
import ContactUs from "./components/Contact/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ResetPasswordModal from "./components/Auth/ResetPasswordModal";
import CollegeLogin from "./components/Auth/CollegeLogin";
import CollegeStudents from "./components/Dashboard/components/CollegeDasboard";
import CollegeProtectedRoute from "./CollegeProtectedRoute";
import JudgeDashboard from "./components/Dashboard/JudgeDasboard";
import ForgotPassword from "./components/Auth/ForgotPasswordModal";
import ResetPassword from "./components/Auth/ResetPasswordModal";
import GeneralRule from "./components/Generalrules/GeneralRule";
import TermsCondition from "./components/TermsCondition/TermsCondition";


/* ================== ROUTE GUARDS ================== */

// 🔐 Requires login
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};
// 🔐 Judge only
const JudgeRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  return role === "judge" ? (
    children
  ) : (
    <Navigate to="/user/dashboard" replace />
  );
};

// 🔐 Admin only
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  return role === "admin" ? (
    children
  ) : (
    <Navigate to="/user/dashboard" replace />
  );
};

// 🌐 Public (login/signup)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return children;

  return role === "admin" ? (
  <Navigate to="/admin/dashboard" replace />
) : role === "judge" ? (
  <Navigate to="/judge/dashboard" replace />
) : (
  <Navigate to="/user/dashboard" replace />
);

};
function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/results" element={<Results />} />
        <Route path="/blog" element={<AllBlog />} />
        <Route path="/hackathons" element={<Hackathon />} />
        <Route path="/hackathons/:id" element={<HackathonDetail />} />
        <Route path="/dashboards" element={<AdminDashboard />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/result" element={<Results />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/sponsors" element={<Sponsor />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/terms&conditions" element={<TermsCondition />} />
        <Route path="/Rules" element={<GeneralRule />} />
        {/* Public Auth Routes */}
        {/* Auth */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <SlidingAuthPage />
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

        {/* OAuth */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Dashboards */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        
        
<Route path="/college-login" element={<CollegeLogin />} />

<Route
  path="/college/dashboard"
  element={
    <CollegeProtectedRoute>
      <CollegeStudents />
    </CollegeProtectedRoute>
  }
/>
<Route
  path="/judge/dashboard"
  element={
    <JudgeRoute>
      <JudgeDashboard />
    </JudgeRoute>
  }
/>



        {/* 404 */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;

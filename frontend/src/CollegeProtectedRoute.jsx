import { Navigate } from "react-router-dom";

const CollegeProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in or not college
  if (!token || role !== "college") {
    return <Navigate to="/college-login" replace />;
  }

  // ✅ College authenticated
  return children;
};

export default CollegeProtectedRoute;

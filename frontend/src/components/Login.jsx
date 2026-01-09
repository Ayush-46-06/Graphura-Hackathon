import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const token = localStorage.getItem("token");

  /* ================= LOGGED IN ================= */
  if (token) {
    return null; // 🔥 show nothing
  }

  /* ================= NOT LOGGED IN ================= */
  return (
    <Link to="/login">
      <button className="bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-semibold px-6 py-2 rounded-full">
        Login
      </button>
    </Link>
  );
};

export default Login;

import axios from "axios";

/* ==========================
   AXIOS INSTANCE
========================== */

// ✅ Use Vite proxy in development
// Proxy should point /api → http://localhost:5001
const API = axios.create({
  baseURL: "/api",
  withCredentials: true, // keep if backend uses cookies
});

// 🔐 Attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ==========================
   ADMIN ANALYTICS – OVERVIEW
========================== */

// Dashboard Overview Cards
export const getOverview = () =>
  API.get("/analytics/admin/overview");

/* ==========================
   ADMIN ANALYTICS – GRAPHS
========================== */

// Hackathon Graph (day / month / year)
export const getHackathonGraph = (filter = "month") =>
  API.get(`/analytics/admin/hackathons-graph?filter=${filter}`);

// Registration Growth Graph
export const getRegistrationGrowth = () =>
  API.get("/analytics/admin/registration-growth");

// Registration Completion %
export const getRegistrationCompletion = () =>
  API.get("/analytics/admin/registration-completion");

/* ==========================
   ADMIN ANALYTICS – HACKATHONS
========================== */

// Detailed hackathon table / stats
export const getHackathonDetailsAdmin = () =>
  API.get("/analytics/admin/hackathons/details");

/* ==========================
   ADMIN TRANSACTIONS
========================== */

// Transaction summary stats
export const getTransactionStats = () =>
  API.get("/analytics/admin/transactions/stats");

// Full transactions table
export const getAllTransactions = () =>
  API.get("/analytics/admin/transactions");

// Update transaction status
export const updateTransactionStatus = (id, status) =>
  API.put(`/analytics/admin/transactions/${id}`, { status });

export default API;

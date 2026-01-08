import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ==========================
   ADMIN DASHBOARD ENDPOINTS
========================== */

// OVERVIEW
export const getOverview = () => API.get("/analytics/admin/overview");

// GRAPH (day / month / year)
export const getHackathonGraph = (filter = "month") =>
  API.get(`/analytics/admin/hackathons-graph?filter=${filter}`);

// TRANSACTION STATS
export const getTransactionStats = () =>
  API.get("/analytics/admin/transactions/stats");

// (OPTIONAL) ALL TRANSACTIONS TABLE
export const getAllTransactions = () =>
  API.get("/analytics/admin/transactions");

// REGISTRATION GROWTH
export const getRegistrationGrowth = () =>
  API.get("/analytics/admin/registration-growth");

// REGISTRATION COMPLETION %
export const getRegistrationCompletion = () =>
  API.get("/analytics/admin/registration-completion");

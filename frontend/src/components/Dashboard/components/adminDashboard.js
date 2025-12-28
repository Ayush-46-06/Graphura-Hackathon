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

export const getOverview = () => API.get("/dashboard/overview");

export const getHackathonGraph = (filter = "month") =>
  API.get(`/analytics/hackathons?filter=${filter}`);

export const getTransactionStats = () =>
  API.get("/analytics/transactions");

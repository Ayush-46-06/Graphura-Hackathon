import { useEffect, useState, useMemo } from "react";
import {
  getOverview,
  getHackathonGraph,
  getTransactionStats,
} from "./adminDashboard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

export default function DashboardHome() {
  const [overview, setOverview] = useState(null);

  const [graphDay, setGraphDay] = useState([]);
  const [graphMonth, setGraphMonth] = useState([]);
  const [graphYear, setGraphYear] = useState([]);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [o, d, m, y, t] = await Promise.all([
          getOverview(),
          getHackathonGraph("day"),
          getHackathonGraph("month"),
          getHackathonGraph("year"),
          getTransactionStats(),
        ]);

        setOverview(o?.data?.data || null);
        setGraphDay(d?.data?.data || []);
        setGraphMonth(m?.data?.data || []);
        setGraphYear(y?.data?.data || []);
        setTransactions(t?.data?.data || []);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // -------- COMBINED VIEW FOR "ALL" --------
  const combinedData = useMemo(() => {
    const max = Math.max(graphDay.length, graphMonth.length, graphYear.length);

    const result = [];

    for (let i = 0; i < max; i++) {
      result.push({
        label: i + 1,
        day: graphDay[i]?.count ?? 0,
        month: graphMonth[i]?.count ?? 0,
        year: graphYear[i]?.count ?? 0,
      });
    }

    return result;
  }, [graphDay, graphMonth, graphYear]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading dashboard…</p>
    );

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  // -------- FILTER LOGIC --------
  const filteredData =
    filter === "all"
      ? combinedData
      : filter === "day"
      ? graphDay
      : filter === "month"
      ? graphMonth
      : graphYear;

  // -------- CORRECT COLORS PER FILTER --------
  const getStrokeColor = () => {
    if (filter === "day") return "#3b82f6"; // blue
    if (filter === "month") return "#22c55e"; // green
    if (filter === "year") return "#eab308"; // yellow
    return "#3b82f6";
  };

  return (
    <div className="space-y-6">
      {/* ===== TOP STATS ===== */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Hackathons"
            value={overview.totalHackathons ?? 0}
          />
          <StatCard
            title="Completed Hackathons"
            value={overview.completedHackathons ?? 0}
          />
          <StatCard
            title="Total Registrations"
            value={overview.totalRegistrations ?? 0}
          />
        </div>
      )}

      {/* ===== CHART SECTION ===== */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h3 className="font-semibold">Hackathon Registrations</h3>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("day")}
            className={`px-4 py-2 rounded-lg ${
              filter === "day"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Last 7 Days
          </button>

          <button
            onClick={() => setFilter("month")}
            className={`px-4 py-2 rounded-lg ${
              filter === "month"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            This Year
          </button>

          <button
            onClick={() => setFilter("year")}
            className={`px-4 py-2 rounded-lg ${
              filter === "year"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Last 5 Years
          </button>
        </div>

        {/* LINE CHART */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <Tooltip />

              {/* ---- ALL VIEW ---- */}
              {filter === "all" && (
                <>
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="day"
                    name="Last 7 Days"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="month"
                    name="This Year"
                    stroke="#22c55e"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="year"
                    name="Last 5 Years"
                    stroke="#eab308"
                    strokeWidth={3}
                  />
                </>
              )}

              {/* ---- SINGLE FILTER VIEW ---- */}
              {filter !== "all" && (
                <>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />

                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={getStrokeColor()}
                    strokeWidth={3}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== TRANSACTIONS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {transactions.map((t) => (
          <StatCard
            key={t.label}
            title={`${t.label?.toUpperCase()} Transactions`}
            value={t.count ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
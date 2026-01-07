import { useEffect, useState } from "react";
import {
  getOverview,
  getHackathonGraph,
  getTransactionStats,
} from "./adminDashboard";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#e11d48",
  "#0ea5e9",
  "#84cc16",
];

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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [o, d, m, y, t] = await Promise.all([
          getOverview(),
          getHackathonGraph("day"), // last 7 days
          getHackathonGraph("month"), // this year
          getHackathonGraph("year"), // last 5 years
          getTransactionStats(),
        ]);

        setOverview(o?.data?.data || null);
        setGraphDay(d?.data?.data || []);
        setGraphMonth(m?.data?.data || []);
        setGraphYear(y?.data?.data || []);
        setTransactions(t?.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading dashboard…</p>
    );

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

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

      {/* ===== HACKATHON REGISTRATIONS (ALL CHARTS) ===== */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h3 className="font-semibold">Hackathon Registrations</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 🔵 LINE — LAST 7 DAYS */}
          <div className="h-72">
            <p className="font-medium mb-2 text-sm text-gray-600">
              Last 7 Days
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🟢 BAR — THIS YEAR */}
          <div className="h-72">
            <p className="font-medium mb-2 text-sm text-gray-600">This Year</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🟡 PIE — LAST 5 YEARS */}
          <div className="h-72">
            <p className="font-medium mb-2 text-sm text-gray-600">
              Last 5 Years
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={graphYear}
                  dataKey="count"
                  nameKey="label"
                  outerRadius={100}
                  label
                >
                  {graphYear.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
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
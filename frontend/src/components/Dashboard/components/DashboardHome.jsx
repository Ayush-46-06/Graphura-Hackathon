import { useEffect, useState } from "react";
import {
  getOverview,
  getHackathonGraph,
  getTransactionStats
} from "./adminDashboard";

const DashboardHome = () => {
  const [overview, setOverview] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [filter, setFilter] = useState("month");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      const [o, g, t] = await Promise.all([
        getOverview(),
        getHackathonGraph(filter),
        getTransactionStats()
      ]);

      setOverview(o.data.data);
      setGraphData(g.data.data);
      setTransactions(t.data.data);
    } catch (err) {
      console.error("Dashboard error", err);
    }
  };

  return (
    <div className="space-y-6">

      {/* ===== TOP STATS ===== */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Hackathons" value={overview.totalHackathons} />
          <StatCard title="Completed Hackathons" value={overview.completedHackathons} />
          <StatCard title="Total Registrations" value={overview.totalRegistrations} />
        </div>
      )}

      {/* ===== GRAPH ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Hackathon Registrations</h3>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="day">Last 7 Days</option>
            <option value="month">This Year</option>
            <option value="year">Last 5 Years</option>
          </select>
        </div>

        <div className="space-y-2">
          {graphData.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-12 text-sm text-gray-500">{item.label}</span>
              <div className="flex-1 bg-gray-100 h-3 rounded">
                <div
                  className="bg-indigo-600 h-3 rounded"
                  style={{ width: `${item.count * 5}px` }}
                />
              </div>
              <span className="text-sm font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== TRANSACTIONS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {transactions.map((t) => (
          <StatCard
            key={t.label}
            title={`${t.label.toUpperCase()} Transactions`}
            value={t.count}
          />
        ))}
      </div>

    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

export default DashboardHome;

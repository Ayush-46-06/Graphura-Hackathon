import { useEffect, useState } from "react";
import { DollarSign, Filter, Search, Download, RefreshCw, CheckCircle, Clock, XCircle, User, Mail, AlertCircle } from "lucide-react";

const API_URL = "http://localhost:5001/api/transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);

  // Get token from localStorage (for your actual implementation)
  const getToken = () => {
    try {
      return localStorage.getItem("token");
    } catch (err) {
      console.error("Cannot access localStorage:", err);
      return "demo-token";
    }
  };

  const token = getToken();

  // ================= FETCH ALL TRANSACTIONS (ADMIN) =================
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Handle different possible response structures
      let transactionsData = [];
      if (Array.isArray(data)) {
        transactionsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        transactionsData = data.data;
      } else if (data.transactions && Array.isArray(data.transactions)) {
        transactionsData = data.transactions;
      }
      
      setTransactions(transactionsData);
      setFilteredTransactions(transactionsData);
      
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(err.message);
      
      // Mock data for demo/fallback
    //   const mockData = [
    //     { 
    //       _id: "1", 
    //       user: { name: "Alice Johnson", email: "alice@example.com" }, 
    //       amount: 5000, 
    //       status: "success", 
    //       createdAt: "2024-12-20T10:30:00Z" 
    //     },
    //     { 
    //       _id: "2", 
    //       user: { name: "Bob Smith", email: "bob@example.com" }, 
    //       amount: 7500, 
    //       status: "pending", 
    //       createdAt: "2024-12-21T14:20:00Z" 
    //     },
    //     { 
    //       _id: "3", 
    //       user: { name: "Carol Davis", email: "carol@example.com" }, 
    //       amount: 3000, 
    //       status: "rejected", 
    //       createdAt: "2024-12-22T09:15:00Z" 
    //     },
    //     { 
    //       _id: "4", 
    //       user: { name: "David Wilson", email: "david@example.com" }, 
    //       amount: 10000, 
    //       status: "success", 
    //       createdAt: "2024-12-23T16:45:00Z" 
    //     },
    //     { 
    //       _id: "5", 
    //       user: { name: "Emma Brown", email: "emma@example.com" }, 
    //       amount: 4500, 
    //       status: "pending", 
    //       createdAt: "2024-12-24T11:00:00Z" 
    //     },
    //   ];
      setTransactions(mockData);
      setFilteredTransactions(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ================= FILTER & SEARCH =================
  useEffect(() => {
    if (!Array.isArray(transactions)) {
      setFilteredTransactions([]);
      return;
    }

    let filtered = [...transactions];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, transactions]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Update UI immediately
      setTransactions((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status } : t
        )
      );

    } catch (err) {
      console.error("Update failed:", err);
      alert(`Failed to update transaction: ${err.message}`);
      
      // Still update UI for demo purposes
      setTransactions((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status } : t
        )
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= STATS =================
  const stats = {
    total: Array.isArray(transactions) ? transactions.length : 0,
    success: Array.isArray(transactions) ? transactions.filter(t => t.status === "success").length : 0,
    pending: Array.isArray(transactions) ? transactions.filter(t => t.status === "pending").length : 0,
    rejected: Array.isArray(transactions) ? transactions.filter(t => t.status === "rejected").length : 0,
    totalAmount: Array.isArray(transactions) ? transactions.reduce((sum, t) => sum + (t.amount || 0), 0) : 0,
  };

  // ================= STATUS HELPERS =================
  const getStatusIcon = (status) => {
    switch(status) {
      case "success": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "success": return "bg-green-50 text-green-700 border-green-200";
      case "pending": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "rejected": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "#F5F7F9" }}>
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: "#03594E" }} />
          <p className="text-gray-600 font-medium">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5F7F9" }}>
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#0C121D" }}>Transaction Management</h1>
        <p className="text-gray-600">Monitor and manage all platform transactions</p>
      </div>

      {/* ERROR BANNER */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 mb-1">Connection Error</h3>
            <p className="text-sm text-red-700">
              {error} - Showing demo data. Please check your backend connection.
            </p>
          </div>
          <button 
            onClick={fetchTransactions}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Transactions</span>
            <DollarSign className="w-5 h-5" style={{ color: "#03594E" }} />
          </div>
          <p className="text-2xl font-bold" style={{ color: "#0C121D" }}>{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Successful</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.success}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Pending</span>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Rejected</span>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100" style={{ backgroundColor: "#03594E" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">Total Amount</span>
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">₹{stats.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        
        {/* TOOLBAR */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* SEARCH */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": "#03594E" }}
              />
            </div>

            {/* FILTERS & ACTIONS */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ "--tw-ring-color": "#03594E" }}
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={fetchTransactions}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#03594E" }}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100" style={{ backgroundColor: "#F5F7F9" }}>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">User</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(filteredTransactions) && filteredTransactions.map((t) => (
                <tr key={t._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                  {/* USER */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: "#03594E" }}>
                        {t.user?.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: "#0C121D" }}>{t.user?.name || "N/A"}</p>
                        <p className="text-sm text-gray-500">ID: {t._id?.slice(-6) || "N/A"}</p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{t.user?.email || "N/A"}</span>
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="py-4 px-6">
                    <span className="font-semibold text-lg" style={{ color: "#03594E" }}>
                      ₹{(t.amount || 0).toLocaleString()}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(t.status)}`}>
                      {getStatusIcon(t.status)}
                      <span className="capitalize">{t.status || "unknown"}</span>
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-4 px-6">
                    <select
                      disabled={updatingId === t._id}
                      value={t.status}
                      onChange={(e) => updateStatus(t._id, e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ "--tw-ring-color": "#03594E" }}
                    >
                      <option value="pending">Pending</option>
                      <option value="success">Success</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {(!Array.isArray(filteredTransactions) || filteredTransactions.length === 0) && (
          <div className="text-center py-16">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg font-medium mb-2">No transactions found</p>
            <p className="text-gray-400 text-sm">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your filters" 
                : "Transactions will appear here once created"}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Transactions;
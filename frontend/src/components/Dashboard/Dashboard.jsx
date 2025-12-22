import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Trophy, Users, TrendingUp, Calendar, Download, Edit, Trash2, Plus, CheckCircle, Clock, XCircle, Award, FileText } from 'lucide-react';
import LogoutButton from '../Auth/LogoutButton';
const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [dashboardData, setDashboardData] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    fetchDashboardData();
    fetchGraphData();
    fetchTransactions();
    fetchUsers();
  }, []);

  
  useEffect(() => {
    fetchGraphData();
  }, [timeFilter]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchGraphData = async () => {
    try {
      const response = await fetch(`/api/admin/dashboard/graph?period=${timeFilter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setGraphData(data.data);
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/transactions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const exportToGoogleSheets = async () => {
    try {
      const response = await fetch('/api/admin/export/students', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        alert('Students data exported to Google Sheets successfully!');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'successful': 
      case 'completed': 
        return 'text-green-600 bg-green-50';
      case 'pending': 
      case 'ongoing': 
        return 'text-yellow-600 bg-yellow-50';
      case 'rejected': 
      case 'failed': 
        return 'text-red-600 bg-red-50';
      default: 
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'successful': 
      case 'completed': 
        return <CheckCircle className="w-4 h-4" />;
      case 'pending': 
      case 'ongoing': 
        return <Clock className="w-4 h-4" />;
      case 'rejected': 
      case 'failed': 
        return <XCircle className="w-4 h-4" />;
      default: 
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1AB69D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0C121D] font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F9]">
      {/* Navbar */}
      <nav className="bg-[#0C121D] border-b border-[#1AB69D]/20 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1AB69D] to-[#03594E] rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Hackathon Admin</h1>
              <p className="text-gray-400 text-xs">Dashboard Overview</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="mt-auto">
        <LogoutButton variant="default" />
      </div>
            <button 
              onClick={exportToGoogleSheets}
              className="px-4 py-2 bg-[#F8C62F] text-[#0C121D] rounded-lg font-semibold hover:bg-[#e0b429] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export to Sheets
            </button>
            <div className="w-10 h-10 bg-[#1AB69D] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#03594E] to-[#1AB69D] rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin!</h2>
              <p className="text-white/80">Here's what's happening with your hackathons today.</p>
            </div>
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Award className="w-16 h-16" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Registrations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#1AB69D]/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#1AB69D]" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                +{dashboardData?.growthRate || 0}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#0C121D] mb-1">
              {dashboardData?.totalRegistrations || 0}
            </h3>
            <p className="text-sm text-gray-500">Total Registrations</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Growth from previous period</span>
            </div>
          </div>

          {/* Current Registered */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#F8C62F]/10 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-[#F8C62F]" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Active
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#0C121D] mb-1">
              {dashboardData?.currentRegistered || 0}
            </h3>
            <p className="text-sm text-gray-500">Current Registered</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Active participants</span>
            </div>
          </div>

          {/* This Month Registrations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FE8235]/10 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#FE8235]" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                This Month
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#0C121D] mb-1">
              {dashboardData?.monthRegistrations || 0}
            </h3>
            <p className="text-sm text-gray-500">This Month Registrations</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-semibold text-[#0C121D]">{dashboardData?.completionRate || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#1AB69D] to-[#03594E] h-2 rounded-full transition-all"
                  style={{ width: `${dashboardData?.completionRate || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Graph */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0C121D]">Hackathon Registrations</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimeFilter('day')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === 'day' 
                      ? 'bg-[#1AB69D] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Day
                </button>
                <button 
                  onClick={() => setTimeFilter('week')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === 'week' 
                      ? 'bg-[#1AB69D] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimeFilter('month')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === 'month' 
                      ? 'bg-[#1AB69D] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6C757D" />
                <YAxis stroke="#6C757D" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0C121D', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="registrations" 
                  stroke="#1AB69D" 
                  strokeWidth={3}
                  dot={{ fill: '#1AB69D', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#F8C62F" 
                  strokeWidth={3}
                  dot={{ fill: '#F8C62F', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-[#0C121D] mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-[#1AB69D]/10 to-transparent rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <Users className="w-4 h-4 text-[#1AB69D]" />
                </div>
                <p className="text-2xl font-bold text-[#0C121D]">{users.length}</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#F8C62F]/10 to-transparent rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Active Hackathons</span>
                  <Trophy className="w-4 h-4 text-[#F8C62F]" />
                </div>
                <p className="text-2xl font-bold text-[#0C121D]">{dashboardData?.activeHackathons || 0}</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#FE8235]/10 to-transparent rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Completed</span>
                  <Award className="w-4 h-4 text-[#FE8235]" />
                </div>
                <p className="text-2xl font-bold text-[#0C121D]">{dashboardData?.completedHackathons || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0C121D]">Recent Transactions</h3>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id || txn.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-[#0C121D]">{txn.transactionId}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{txn.username || txn.user?.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{txn.email || txn.user?.email}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-[#0C121D]">{txn.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(txn.status)}`}>
                        {getStatusIcon(txn.status)}
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(txn.createdAt || txn.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0C121D]">All Students</h3>
            <div className="flex gap-2">
              <button 
                onClick={exportToGoogleSheets}
                className="px-4 py-2 bg-[#1AB69D] text-white rounded-lg text-sm font-medium hover:bg-[#03594E] transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">University</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-[#0C121D]">{user.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{user.university || 'N/A'}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-[#1AB69D] hover:text-[#03594E] transition-colors">
                        <FileText className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
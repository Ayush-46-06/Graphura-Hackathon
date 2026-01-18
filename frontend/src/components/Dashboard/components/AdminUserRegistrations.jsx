import { useEffect, useState, useMemo } from "react";
import { Search, Filter, Users, Download, X, Eye, Mail, Phone, GraduationCap, Calendar, Wallet, Shield } from "lucide-react";

const API_BASE = "/api";

/* ================= SMALL UI HELPER ================= */
const Info = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-3 rounded-lg border border-gray-100">
    <div className="flex items-center gap-2 mb-1">
      {Icon && <Icon size={14} className="text-gray-400" />}
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
    <p className="font-semibold text-gray-900">{value}</p>
  </div>
);

const AdminUserRegistrations = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        setUsers(result.data || []);
      } catch (err) {
        console.error("FETCH USERS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  /* ================= FILTERS ================= */
  const universities = useMemo(() => {
    return [...new Set(users.map(u => u.university).filter(Boolean))].sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        user.name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.university?.toLowerCase().includes(q);

      const matchesUniversity =
        !selectedUniversity || user.university === selectedUniversity;

      return matchesSearch && matchesUniversity;
    });
  }, [users, searchQuery, selectedUniversity]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedUniversity("");
  };

  /* ================= SAFE HACKATHON COUNT ================= */
  const getHackathonCount = (user) =>
    Array.isArray(user.hackathons)
      ? user.hackathons.filter(h => h.hackathon).length
      : 0;

  /* ================= CSV EXPORT ================= */
  const exportToCSV = () => {
  const headers = [
    "Name",
    "Email",
    "University",
    "College",
    "Course",
    "Year",
    "Hackathon Title",
    "Category",
    "Hackathon Status",
    "Participation Type",
    "Payment Status",
    "Registration Status",
    "Start Date",
    "End Date",
    "Team Members Count",
  ];

  const rows = [];

  filteredUsers.forEach(user => {
    // If user has no hackathons
    if (!Array.isArray(user.hackathons) || user.hackathons.length === 0) {
      rows.push([
        user.name,
        user.email,
        user.university || "",
        user.collegeName || "",
        user.courseName || "",
        user.yearOfStudy || "",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "",
        "",
        0,
      ]);
      return;
    }

    user.hackathons.forEach(h => {
      if (!h.hackathon) return;

      rows.push([
        user.name,
        user.email,
        user.university || "",
        user.collegeName || "",
        user.courseName || "",
        user.yearOfStudy || "",
        h.hackathon.title || "",
        h.hackathon.category || "",
        h.hackathon.status || "",
        h.participationType || "",
        h.paymentStatus || "",
        h.status || "",
        h.hackathon.startDate
          ? new Date(h.hackathon.startDate).toLocaleDateString("en-GB")
          : "",
        h.hackathon.endDate
          ? new Date(h.hackathon.endDate).toLocaleDateString("en-GB")
          : "",
        h.teamMembers?.length || 0,
      ]);
    });
  });

  const csv = [headers, ...rows]
    .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "user-hackathon-participation.csv";
  a.click();
};

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  User Registrations
                </h1>
                <p className="text-gray-600 mt-1">Manage and monitor all user data</p>
              </div>
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200 transition-all duration-200 font-medium"
            >
              <Download size={18} /> Export to CSV
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Filtered Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{filteredUsers.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Filter className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Universities</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{universities.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or university..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedUniversity}
                onChange={e => setSelectedUniversity(e.target.value)}
                className="pl-11 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer min-w-[200px]"
              >
                <option value="">All Universities</option>
                {universities.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            {(searchQuery || selectedUniversity) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium text-gray-700"
              >
                <X size={16} /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">University</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Hackathons</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map(user => (
                  <tr key={user._id} className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-gray-700">
                        <GraduationCap size={14} className="text-gray-400" />
                        {user.university || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full text-sm font-semibold">
                        {getHackathonCount(user)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 font-medium"
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gray-400" size={28} />
              </div>
              <p className="text-gray-500 font-medium">No users found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>

        <div className="text-center mt-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-green-600">{filteredUsers.length}</span> of <span className="font-semibold text-gray-900">{users.length}</span> users
          </p>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
                  <p className="text-green-100 text-sm mt-1">{selectedUser.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* USER INFO */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-green-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Info icon={Mail} label="Email" value={selectedUser.email} />
                  <Info icon={Phone} label="Contact" value={selectedUser.contactNumber || "N/A"} />
                  <Info icon={GraduationCap} label="University" value={selectedUser.university || "N/A"} />
                  <Info icon={GraduationCap} label="College" value={selectedUser.collegeName || "N/A"} />
                  <Info icon={GraduationCap} label="Course" value={selectedUser.courseName || "N/A"} />
                  <Info icon={GraduationCap} label="Year of Study" value={selectedUser.yearOfStudy || "N/A"} />
                  {/* <Info icon={Wallet} label="Wallet Balance" value={`₹${selectedUser.wallet || 0}`} /> */}
                  <Info icon={Shield} label="Role" value={selectedUser.role} />
                  <Info icon={Shield} label="Account Status" value={selectedUser.isActive ? "Active" : "Inactive"} />
                  <Info 
                    icon={Calendar} 
                    label="Registered On" 
                    value={new Date(selectedUser.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })} 
                  />
                </div>
              </div>

              {/* HACKATHONS */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-green-600" />
                  Hackathon Registrations ({selectedUser.hackathons?.length || 0})
                </h3>

                {(!selectedUser.hackathons || selectedUser.hackathons.length === 0) ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="text-gray-400" size={28} />
                    </div>
                    <p className="text-gray-600 font-medium">No hackathons registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedUser.hackathons.map((h, i) => {
                      if (!h.hackathon) {
                        return (
                          <div
                            key={i}
                            className="border-2 border-red-200 rounded-xl p-5 bg-red-50"
                          >
                            <div className="flex items-center gap-2 text-red-700">
                              <X size={20} />
                              <p className="font-semibold">Hackathon data missing (deleted or invalid)</p>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={i} className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-bold text-lg text-gray-900">{h.hackathon.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              h.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              h.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {h.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Info label="Category" value={h.hackathon.category} />
                            <Info label="Status" value={h.hackathon.status} />
                            <Info label="Participation" value={h.participationType} />
                            <Info label="Payment" value={h.paymentStatus} />
                            <Info label="Team Size" value={h.teamMembers?.length || 0} />
                            <Info
                              label="Start Date"
                              value={
                                h.hackathon.startDate
                                  ? new Date(h.hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                  : "N/A"
                              }
                            />
                            <Info
                              label="End Date"
                              value={
                                h.hackathon.endDate
                                  ? new Date(h.hackathon.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                  : "N/A"
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserRegistrations;
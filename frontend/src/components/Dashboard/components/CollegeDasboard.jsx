import { useEffect, useState } from "react";
import { Users, Download, Search, RefreshCw, CheckCircle2, AlertCircle, Loader2, Trophy, Mail, Phone, User } from "lucide-react";

const API_URL = "http://localhost:5001/api/college/dashboard/students";
const EXPORT_URL = "http://localhost:5001/api/college/dashboard/export";

const CollegeStudents = () => {
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.contactNumber.includes(searchQuery)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 4000);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch students");
      }

      setStudents(data.data || []);
      setFilteredStudents(data.data || []);
    } catch (err) {
      showNotification("error", err.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const exportStudents = async () => {
    setExporting(true);
    try {
      const res = await fetch(EXPORT_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      showNotification("success", "Students exported to Google Sheet successfully");
    } catch (err) {
      showNotification("error", "Failed to export students");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Notification */}
        {notification.show && (
          <div className={`mb-6 rounded-xl p-4 flex items-start gap-3 ${
            notification.type === "success" 
              ? "bg-green-50 border border-green-200" 
              : "bg-red-50 border border-red-200"
          }`}>
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className={`font-semibold ${
                notification.type === "success" ? "text-green-900" : "text-red-900"
              }`}>
                {notification.type === "success" ? "Success" : "Error"}
              </p>
              <p className={`text-sm mt-1 ${
                notification.type === "success" ? "text-green-700" : "text-red-700"
              }`}>
                {notification.message}
              </p>
            </div>
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  College Students
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredStudents.length} {filteredStudents.length === 1 ? "student" : "students"} 
                  {searchQuery && ` found for "${searchQuery}"`}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchStudents}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              

              <button
                onClick={exportStudents}
                disabled={exporting || students.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] text-white rounded-xl font-semibold hover:scale-3d transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export to Sheet</span>
                    <span className="sm:hidden">Export</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {students.length > 0 && (
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {students.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Students Yet
            </h3>
            <p className="text-gray-600">
              Students who register will appear here.
            </p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 " />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Contact
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Hackathons
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] rounded-full flex items-center justify-center text-white font-semibold shadow">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{student.email}</td>
                      <td className="px-6 py-4 text-gray-600">{student.contactNumber}</td>
                      <td className="px-6 py-4">
                        {student.hackathons.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {student.hackathons.map((hackathon, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700"
                              >
                                {hackathon}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No hackathons</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold shadow flex-shrink-0">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{student.name}</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{student.contactNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {student.hackathons.length > 0 && (
                    <div className="ml-15">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-gray-600" />
                        <span className="text-xs font-semibold text-gray-700 uppercase">Hackathons</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.hackathons.map((hackathon, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700"
                          >
                            {hackathon}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeStudents;
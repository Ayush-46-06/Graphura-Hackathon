import { useEffect, useState } from "react";
import api from "./api";
import { Calendar, Users, Download, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import SubmitProjectModal from "./SubmitProjectModal";

const MyHackathons = () => {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeHackathonId, setActiveHackathonId] = useState(null);

  /* ================= HELPERS ================= */

  const getHackathonStatus = (hackathon) => {
    const now = new Date();
    const start = new Date(hackathon.startDate);
    const end = new Date(hackathon.endDate);

    if (now < start) return "pending";
    if (now >= start && now <= end) return "ongoing";
    return "completed";
  };

  const hasUserSubmitted = (hackathon) => {
    return hackathon.participants?.some(
      (p) => p.user === undefined ? false : p.user.toString() === "self" || p.submittedAt
    );
  };

  /* ================= FETCH ================= */

  const fetchMyHackathons = async () => {
    try {
      const res = await api.get("/user/hackathons");
      setRegistrations(res.data.data || []);
    } catch (err) {
      console.error("Failed to load hackathons", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyHackathons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 font-medium">Loading your hackathons...</p>
        </div>
      </div>
    );
  }

  const downloadCertificate = async (hackathonId) => {
    try {
      const res = await api.get(`/user/certificate/${hackathonId}`, {
        responseType: "blob"
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "certificate.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Certificate not available yet");
    }
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case "ongoing":
        return {
          bg: "bg-gradient-to-r from-emerald-500 to-green-600",
          icon: <Clock className="w-3.5 h-3.5" />,
          text: "LIVE NOW"
        };
      case "completed":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          text: "COMPLETED"
        };
      default:
        return {
          bg: "bg-gradient-to-r from-slate-400 to-slate-500",
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          text: "UPCOMING"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            My Hackathons
          </h1>
          <p className="text-slate-600">Track your registered hackathons and submissions</p>
        </div>

        {registrations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No hackathons yet</h3>
            <p className="text-slate-500">Register for a hackathon to get started!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {registrations.map((item) => {
              const h = item.hackathon;
              const status = getHackathonStatus(h);
              const statusConfig = getStatusConfig(status);

              const submitted = h.participants?.some(
                (p) => p.user?.toString() === item.user?.toString() && p.submittedAt
              );

              return (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-slate-300"
                >
                  <div className="flex flex-col lg:flex-row">

                    {/* IMAGE */}
                    <div className="relative w-full lg:w-80 h-56 lg:h-auto overflow-hidden">
                      <img
                        src={h.image}
                        alt={h.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`${statusConfig.bg} text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-sm`}>
                          {statusConfig.icon}
                          {statusConfig.text}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-6 lg:p-8 space-y-5">

                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                          {h.title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed line-clamp-2">{h.description}</p>
                      </div>

                      {/* META */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-medium text-slate-500 uppercase mb-1">Start Date</div>
                            <div className="text-sm font-semibold text-slate-900">
                              {new Date(h.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-medium text-slate-500 uppercase mb-1">End Date</div>
                            <div className="text-sm font-semibold text-slate-900">
                              {new Date(h.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-medium text-slate-500 uppercase mb-1">Participants</div>
                            <div className="text-sm font-semibold text-slate-900">
                              {h.participants?.length || 0} Registered
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex gap-3 flex-wrap pt-2">

                        {/* SUBMIT */}
                        {status === "ongoing" && !submitted && (
                          <button
                            onClick={() => {
                              setActiveHackathonId(h._id);
                              setShowSubmitModal(true);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                          >
                            Submit Project
                          </button>
                        )}

                        {/* SUBMITTED */}
                        {status === "ongoing" && submitted && (
                          <span className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 rounded-xl text-sm font-semibold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Project Submitted
                          </span>
                        )}

                        {/* CERTIFICATE */}
                        {status === "completed" && (
                          <button
                            onClick={() => downloadCertificate(h._id)}
                            className="px-6 py-3 bg-gradient-to-r from-[#03594E] to-teal-700 hover:from-[#024239] hover:to-teal-800 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download Certificate
                          </button>
                        )}

                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SUBMIT MODAL */}
      <SubmitProjectModal
        open={showSubmitModal}
        hackathonId={activeHackathonId}
        onClose={() => setShowSubmitModal(false)}
        onSuccess={fetchMyHackathons}
      />

    </div>
  );
};

export default MyHackathons;
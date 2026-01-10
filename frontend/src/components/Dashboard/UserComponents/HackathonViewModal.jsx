import { useEffect, useState } from "react";
import {
  X,
  Trophy,
  CheckCircle,
  Calendar,
  Users,
  Award,
  ExternalLink,
  Clock,
  Tag,
  AlertCircle,
  Lightbulb,
  MapPin,
  Zap,
  Target
} from "lucide-react";
import openRazorpayPayment from "../../Payment";

const tabs = ["Overview", "Rules & Guidelines"];

const defaultRules = [
  "Only original code, content, and design are allowed.",
  "Teams must stick to the event timeline and checkpoints.",
  "Any prohibited tool, plagiarism, or misconduct results in immediate elimination.",
  "Final project submission must include a working demo and documentation.",
  "Respect mentors, organizers, other teams, and the spirit of competition.",
  "Follow all announcements on official communication channels.",
  "The decision of the judging panel is final.",
];

const HackathonViewModal = ({ hackathonId, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (!hackathonId) return;

    const fetchHackathon = async () => {
      try {
        const axios = (await import('axios')).default;
        const res = await axios.get(
          `http://localhost:5001/api/hackathon/${hackathonId}`
        );
        setHackathon(res.data.data);
      } catch (err) {
        console.error("Failed to fetch hackathon", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [hackathonId]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      const axios = (await import('axios')).default;
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/api/hackathon/register",
        { hackathonId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      openRazorpayPayment({
      hackathonId: hackathon._id,
      token,
      onSuccess: () => {
        alert("🎉 Payment successful & registered!");
      },
    });
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (!hackathonId) return null;

  const daysRemaining = hackathon?.lastEnrollmentDate 
    ? Math.ceil((new Date(hackathon.lastEnrollmentDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col animate-slideUp">

        {/* HEADER IMAGE SECTION */}
        <div className="relative h-80">
          <img
            src={
              hackathon?.image ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
            }
            className="w-full h-full object-cover"
            alt="hackathon"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-lg border border-white/20 group"
          >
            <X size={20} className="text-white group-hover:rotate-90 transition-transform" />
          </button>

          {/* Status Badge */}
          {hackathon && (
            <div className="absolute top-6 left-6">
              <div
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-xl backdrop-blur-md border ${
                  hackathon.status === "upcoming"
                    ? "bg-blue-500/90 border-blue-300/50 text-white"
                    : hackathon.status === "ongoing"
                    ? "bg-green-500/90 border-green-300/50 text-white"
                    : "bg-gray-500/90 border-gray-300/50 text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  {hackathon.status}
                </span>
              </div>
            </div>
          )}

          {/* Title Section */}
          {hackathon && (
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-4xl">
                <h1 className="text-3xl font-black mb-2 leading-tight">{hackathon.title}</h1>
                <p className="text-white/90 text-base mb-3 font-medium">{hackathon.description}</p>
                
                {/* Quick Stats Pills */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                    <Trophy className="w-4 h-4" />
                    <span className="font-bold text-sm">₹{hackathon.prizePool?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-sm">{hackathon.participants?.length || 0} Registered</span>
                  </div>
                  {hackathon.category && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                      <Tag className="w-4 h-4" />
                      <span className="font-semibold text-sm">{hackathon.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-8 pt-6 flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 pb-19 rounded-t-2xl font-bold text-sm transition-all whitespace-nowrap relative ${
                activeTab === tab
                  ? "bg-white text-teal-600 shadow-lg -mb-0.5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-cyan-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading && (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-gray-500 font-semibold text-sm">Loading hackathon details...</p>
            </div>
          )}

          {!loading && hackathon && (
            <>
              {/* OVERVIEW TAB */}
              {activeTab === "Overview" && (
                <div className="space-y-8">
                  {/* About Section */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900">About This Hackathon</h3>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      {hackathon.about
                        ?.split("\\n")
                        .map((p, i) => (
                          <p key={i} className="text-gray-700 leading-relaxed mb-3 text-sm">{p}</p>
                        ))}
                    </div>
                  </div>

                  {/* Key Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl border-2 border-blue-400 shadow-xl hover:scale-105 transition-transform">
                      <Calendar className="mx-auto mb-3 text-white" size={32} />
                      <p className="text-xs text-blue-100 font-semibold mb-2 text-center">Duration</p>
                      <p className="font-black text-2xl text-white text-center">
                        {Math.ceil((new Date(hackathon.endDate) - new Date(hackathon.startDate)) / (1000 * 60 * 60 * 24))} Days
                      </p>
                      <p className="text-xs text-blue-100 mt-2 text-center font-medium">
                        {new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(hackathon.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl border-2 border-green-400 shadow-xl hover:scale-105 transition-transform">
                      <Users className="mx-auto mb-3 text-white" size={32} />
                      <p className="text-xs text-green-100 font-semibold mb-2 text-center">Team Size</p>
                      <p className="font-black text-2xl text-white text-center">2-4 Members</p>
                      <p className="text-xs text-green-100 mt-2 text-center font-medium">Collaborate & innovate together</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl border-2 border-purple-400 shadow-xl hover:scale-105 transition-transform">
                      <Trophy className="mx-auto mb-3 text-white" size={32} />
                      <p className="text-xs text-purple-100 font-semibold mb-2 text-center">Total Prize Pool</p>
                      <p className="font-black text-2xl text-white text-center">
                        ₹{hackathon.prizePool?.toLocaleString() || "0"}
                      </p>
                      <p className="text-xs text-purple-100 mt-2 text-center font-medium">Win exciting rewards & recognition</p>
                    </div>
                  </div>

                  {/* Enrollment Deadline Alert */}
                  {daysRemaining !== null && (
                    <div className={`p-5 rounded-2xl border-l-4 shadow-lg ${
                      daysRemaining > 7 
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500" 
                        : daysRemaining > 3 
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500" 
                        : "bg-gradient-to-r from-red-50 to-rose-50 border-red-500"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          daysRemaining > 7 
                            ? "bg-green-500" 
                            : daysRemaining > 3 
                            ? "bg-yellow-500" 
                            : "bg-red-500"
                        }`}>
                          <Clock className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-base text-gray-900">
                            {daysRemaining > 0 
                              ? `${daysRemaining} day${daysRemaining > 1 ? "s" : ""} left to register!` 
                              : "Registration closed"}
                          </p>
                          <p className="text-xs text-gray-600 font-medium mt-1">
                            Last enrollment date: {new Date(hackathon.lastEnrollmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        {daysRemaining > 0 && (
                          <Zap className={`${
                            daysRemaining > 7 
                              ? "text-green-500" 
                              : daysRemaining > 3 
                              ? "text-yellow-500" 
                              : "text-red-500"
                          }`} size={28} />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tags Section */}
                  {hackathon.tags && hackathon.tags.length > 0 && (
                    <div>
                      <h4 className="font-black text-lg text-gray-900 mb-3 flex items-center gap-2">
                        <Tag className="text-teal-600" size={20} />
                        Tech Stack & Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 text-teal-700 rounded-full text-xs font-bold hover:from-teal-100 hover:to-cyan-100 hover:scale-105 transition-all cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* RULES & GUIDELINES TAB */}
              {activeTab === "Rules & Guidelines" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
                    <h3 className="text-2xl font-black mb-2 text-gray-900">
                      Play fair. Innovate bold.
                    </h3>
                    <p className="text-gray-700 text-sm font-medium">Follow these guidelines to ensure a smooth and fair competition for everyone.</p>
                  </div>

                  <div className="space-y-3">
                    {defaultRules.map((rule, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle className="text-white" size={16} />
                        </div>
                        <span className="text-gray-700 leading-relaxed text-sm font-medium flex-1">{rule}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tip Card */}
                  <div className="p-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl border-2 border-green-400">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="text-green-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-white text-base mb-1">💡 Pro Tip</p>
                        <p className="text-white/95 text-sm font-medium leading-relaxed">
                          Strategy matters as much as skill. Plan wisely, communicate effectively, and don't forget to test your solution thoroughly before submission.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="p-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-xl border-2 border-blue-400">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="text-blue-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-white text-base mb-1">⚠️ Important Notice</p>
                        <p className="text-white/95 text-sm font-medium leading-relaxed">
                          Violation of any rule may lead to immediate disqualification. When in doubt, reach out to the organizers for clarification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER - REGISTER BUTTON */}
        {!loading && hackathon && (
          <div className="p-6 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRegister}
                disabled={registering || hackathon.status === "completed" || (daysRemaining !== null && daysRemaining <= 0)}
                className={`flex-1 py-4 rounded-2xl font-black text-base flex justify-center items-center gap-2 transition-all shadow-xl ${
                  registering || hackathon.status === "completed" || (daysRemaining !== null && daysRemaining <= 0)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95"
                }`}
              >
                {registering ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Registering...
                  </>
                ) : hackathon.status === "completed" ? (
                  "Hackathon Completed"
                ) : (daysRemaining !== null && daysRemaining <= 0) ? (
                  "Registration Closed"
                ) : (
                  <>
                    Register Now <ExternalLink size={20} />
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-8 py-4 border-2 border-gray-300 rounded-2xl font-bold text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default HackathonViewModal;
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
  Lightbulb
} from "lucide-react";
import TeamRegistrationModal from "./TeamRegistrationModal"

const tabs = ["Overview", "Rules & Guidelines", "Prizes"];

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
  const [showTeamModal, setShowTeamModal] = useState(false);

  useEffect(() => {
    const fetchHackathon = async () => {
      const axios = (await import("axios")).default;
      const res = await axios.get(
        `http://localhost:5001/api/hackathon/${hackathonId}`
      );
      setHackathon(res.data.data);
      setLoading(false);
    };
    fetchHackathon();
  }, [hackathonId]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      const axios = (await import("axios")).default;
      const token = localStorage.getItem("token");

      // STEP 1: Register user
      await axios.post(
        "http://localhost:5001/api/hackathon/register",
        { hackathonId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // TEAM FLOW
      if (hackathon.participationType === "team") {
        setShowTeamModal(true);
        return;
      }

      // SOLO FLOW
      if (hackathon.isPaid) {
        const openRazorpayPayment = (await import("../../Payment")).default;
        openRazorpayPayment({
          hackathonId,
          token,
          onSuccess: () => {
            alert("🎉 Payment successful!");
            onClose();
          },
        });
      } else {
        alert("🎉 Registered successfully!");
        onClose();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (!hackathonId) return null;

  // Calculate days remaining
  const daysRemaining = hackathon?.lastEnrollmentDate 
    ? Math.ceil((new Date(hackathon.lastEnrollmentDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="relative h-72">
          <img
            src={
              hackathon?.image ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
            }
            className="w-full h-full object-cover"
            alt="hackathon"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
          >
            <X size={20} />
          </button>

          {/* Status Badge */}
          {hackathon && (
            <div className="absolute top-4 left-4">
              <span
                className="px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg backdrop-blur"
                style={{
                  backgroundColor:
                    hackathon.status === "upcoming"
                      ? "#E3F2FD"
                      : hackathon.status === "ongoing"
                      ? "#E8F5E9"
                      : "#F5F7F9",
                  color:
                    hackathon.status === "upcoming"
                      ? "#1976D2"
                      : hackathon.status === "ongoing"
                      ? "#1AB69D"
                      : "#6C757D",
                }}
              >
                {hackathon.status}
              </span>
            </div>
          )}

          {/* Title & Description */}
          {hackathon && (
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{hackathon.title}</h1>
              <p className="text-white/90 text-lg">{hackathon.description}</p>
              
              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                  <Award className="w-4 h-4" />
                  <span className="font-bold">₹{hackathon.prizePool?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{hackathon.participants?.length || 0} Registered</span>
                </div>
                {hackathon.category && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                    <Tag className="w-4 h-4" />
                    <span className="font-medium">{hackathon.category}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="bg-gradient-to-b from-gray-50 to-white border-b  pb-5 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-t-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? " text-[#03594E] shadow-lg transform -translate-y-0.5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#03594E] mx-auto" />
              <p className="mt-4 text-gray-500">Loading details...</p>
            </div>
          )}

          {!loading && hackathon && (
            <>
              {/* OVERVIEW */}
              {activeTab === "Overview" && (
                <div className="space-y-8">
                  {/* About Section */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">About This Hackathon</h3>
                    <div className="prose prose-gray max-w-none">
                      {hackathon.about
                        ?.split("\\n")
                        .map((p, i) => (
                          <p key={i} className="text-gray-700 leading-relaxed mb-3">{p}</p>
                        ))}
                    </div>
                  </div>

                  {/* Key Information Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <Calendar className="mx-auto mb-3 text-blue-600" size={32} />
                      <p className="text-sm text-blue-700 font-medium mb-1">Duration</p>
                      <p className="font-bold text-xl text-blue-900">
                        {Math.ceil((new Date(hackathon.endDate) - new Date(hackathon.startDate)) / (1000 * 60 * 60 * 24))} Days
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                      <Users className="mx-auto mb-3 text-green-600" size={32} />
                      <p className="text-sm text-green-700 font-medium mb-1">Team Size</p>
                      <p className="font-bold text-xl text-green-900">
                        {hackathon.participationType === "team" ? "2-4 Members" : "Solo"}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {hackathon.participationType === "team" ? "Collaborate & innovate" : "Individual participation"}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                      <Award className="mx-auto mb-3 text-purple-600" size={32} />
                      <p className="text-sm text-purple-700 font-medium mb-1">Total Prizes</p>
                      <p className="font-bold text-xl text-purple-900">
                        ₹{hackathon.prizePool?.toLocaleString() || "0"}
                      </p>
                      <p className="text-xs text-purple-600 mt-1">Win exciting rewards</p>
                    </div>
                  </div>

                  {/* Enrollment Deadline */}
                  {daysRemaining !== null && (
                    <div className={`p-4 rounded-xl border-l-4 ${
                      daysRemaining > 7 
                        ? "bg-green-50 border-green-500" 
                        : daysRemaining > 3 
                        ? "bg-yellow-50 border-yellow-500" 
                        : "bg-red-50 border-red-500"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Clock className={`${
                          daysRemaining > 7 
                            ? "text-green-600" 
                            : daysRemaining > 3 
                            ? "text-yellow-600" 
                            : "text-red-600"
                        }`} size={24} />
                        <div>
                          <p className="font-bold text-gray-900">
                            {daysRemaining > 0 
                              ? `${daysRemaining} day${daysRemaining > 1 ? "s" : ""} left to register` 
                              : "Registration closed"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Last enrollment: {new Date(hackathon.lastEnrollmentDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {hackathon.tags && hackathon.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* RULES & GUIDELINES */}
              {activeTab === "Rules & Guidelines" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-gray-900">
                      Play fair. Innovate bold.
                    </h3>
                    <p className="text-gray-600">Follow these guidelines to ensure a smooth and fair competition.</p>
                  </div>

                  <div className="space-y-3">
                    {defaultRules.map((rule, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all"
                      >
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700 leading-relaxed">{rule}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tip */}
                  <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl">
                    <div className="flex gap-3">
                      <Lightbulb className="text-green-600 flex-shrink-0" size={24} />
                      <div>
                        <p className="font-bold text-green-900 mb-1">Pro tip</p>
                        <p className="text-green-800">
                          Strategy matters as much as skill. Plan wisely, communicate effectively, and don't forget to test your solution thoroughly before submission.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Important Note */}
                  <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex gap-3">
                      <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
                      <div>
                        <p className="font-bold text-blue-900 mb-1">Important</p>
                        <p className="text-blue-800">
                          Violation of any rule may lead to immediate disqualification. When in doubt, reach out to the organizers for clarification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* JUDGES */}
              {activeTab === "Judges" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">Meet the Judges</h3>
                    <p className="text-gray-600">Industry experts who will evaluate your projects.</p>
                  </div>

                  {hackathon.judges && hackathon.judges.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {hackathon.judges.map((judge) => (
                        <div
                          key={judge._id}
                          className="border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#03594E] to-[#1AB69D] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                              {judge.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-lg text-gray-900">{judge.name}</p>
                              <p className="text-sm text-gray-600 mb-2">{judge.email}</p>
                              {judge.occupation && (
                                <p className="text-sm text-gray-700 font-medium">{judge.occupation}</p>
                              )}
                              {judge.company && (
                                <p className="text-xs text-gray-500">{judge.company}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p>Judges will be announced soon</p>
                    </div>
                  )}
                </div>
              )}

              {/* PRIZES */}
              {activeTab === "Prizes" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">Prize Distribution</h3>
                    <p className="text-gray-600">Exciting rewards await the top performers!</p>
                  </div>

                  {hackathon.prizeDetails ? (
                    <div className="prose prose-gray max-w-none bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                      <p className="text-gray-700 leading-relaxed">{hackathon.prizeDetails}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Default Prize Structure */}
                      <div className="flex items-center gap-6 p-6 border-2 border-yellow-400 rounded-2xl bg-gradient-to-r from-yellow-50 to-yellow-100 hover:shadow-xl transition-all">
                        <Trophy className="text-yellow-600" size={48} />
                        <div className="flex-1">
                          <p className="text-lg font-bold text-yellow-900">1st Place</p>
                          <p className="text-3xl font-bold text-yellow-700">
                            ₹{Math.floor(hackathon.prizePool * 0.5)?.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-6xl font-bold text-yellow-400/30">🥇</div>
                      </div>

                      <div className="flex items-center gap-6 p-6 border-2 border-gray-400 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-xl transition-all">
                        <Trophy className="text-gray-600" size={48} />
                        <div className="flex-1">
                          <p className="text-lg font-bold text-gray-900">2nd Place</p>
                          <p className="text-3xl font-bold text-gray-700">
                            ₹{Math.floor(hackathon.prizePool * 0.3)?.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-6xl font-bold text-gray-400/30">🥈</div>
                      </div>

                      <div className="flex items-center gap-6 p-6 border-2 border-orange-400 rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100 hover:shadow-xl transition-all">
                        <Trophy className="text-orange-600" size={48} />
                        <div className="flex-1">
                          <p className="text-lg font-bold text-orange-900">3rd Place</p>
                          <p className="text-3xl font-bold text-orange-700">
                            ₹{Math.floor(hackathon.prizePool * 0.2)?.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-6xl font-bold text-orange-400/30">🥉</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER - REGISTER BUTTON */}
        {!loading && hackathon && (
          <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRegister}
                disabled={registering || hackathon.status === "completed" || (daysRemaining !== null && daysRemaining <= 0)}
                className={`flex-1 py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-3 transition-all ${
                  registering || hackathon.status === "completed" || (daysRemaining !== null && daysRemaining <= 0)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#03594E] to-[#1AB69D] text-white hover:shadow-xl hover:scale-[1.02] active:scale-95"
                }`}
              >
                {registering ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
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
                className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Team Modal */}
        {showTeamModal && (
  <TeamRegistrationModal
    hackathon={hackathon}
    onClose={() => setShowTeamModal(false)}
    onSuccessComplete={() => {
      alert("🎉 Payment successful & team registered!");
      onClose(); // closes HackathonViewModal
    }}
  />
)}

      </div>
    </div>
  );
};

export default HackathonViewModal;
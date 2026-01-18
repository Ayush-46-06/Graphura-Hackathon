import { useEffect, useState } from "react";
import LogoutButton from "../Auth/LogoutButton"
import { Search, Award, Users, ArrowLeft, Github, Video, CheckCircle, XCircle } from "lucide-react";

const JudgeDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 🆕 draft rankings (userId -> rank)
  const [draftRanks, setDraftRanks] = useState({});

  const token = localStorage.getItem("token");

  /* ================= FETCH HACKATHONS ================= */
  useEffect(() => {
    if (!token) return;

    fetch("/api/judge/hackathons", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setHackathons(data?.data || []))
      .catch(() => setHackathons([]));
  }, [token]);

  /* ================= FETCH PARTICIPANTS ================= */
  useEffect(() => {
    if (!selectedHackathon || !token) return;

    setLoading(true);
    setDraftRanks({}); // reset drafts when hackathon changes

    fetch(
      `/api/judge/hackathon/${selectedHackathon}/participants`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => res.json())
      .then(data =>
        setParticipants(
          Array.isArray(data?.data?.participants)
            ? data.data.participants.filter(p => p.user)
            : []
        )
      )
      .catch(() => setParticipants([]))
      .finally(() => setLoading(false));
  }, [selectedHackathon, token]);

  /* ================= SELECT RANK (LOCAL ONLY) ================= */
  const selectRank = (userId, rank) => {
    setDraftRanks(prev => ({
      ...prev,
      [userId]: rank,
    }));
  };

  /* ================= SUBMIT ALL RANKINGS ================= */
  const submitAllRanks = async () => {
  if (!Object.keys(draftRanks).length) {
    alert("Please rank at least one participant");
    return;
  }

  setSubmitting(true);

  try {
    for (const [userId, rank] of Object.entries(draftRanks)) {
      const res = await fetch(
        `/api/judge/hackathon/${selectedHackathon}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, rank }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ranking failed");
      }
    }

    // update UI after successful submit
    setParticipants(prev =>
      prev.map(p =>
        draftRanks[p.user._id]
          ? { ...p, rank: draftRanks[p.user._id] }
          : p
      )
    );

    setDraftRanks({});
    alert("All rankings submitted successfully ✅");

  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to submit rankings");
  } finally {
    setSubmitting(false);
  }
};


  /* ================= FILTER PARTICIPANTS ================= */
  const filteredParticipants = participants.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.user.name.toLowerCase().includes(query) ||
      p.user.email.toLowerCase().includes(query)
    );
  });

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Judge Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Review and rank hackathon submissions
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
        
        {/* HACKATHONS GRID */}
        {!selectedHackathon && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-semibold text-gray-900">Active Hackathons</h2>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                {hackathons.length}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {hackathons.map(h => (
                <div 
                  key={h._id} 
                  className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      h.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {h.status}
                    </span>
                  </div>
                  
                  <h2 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {h.title}
                  </h2>
                  
                  <button
                    onClick={() => setSelectedHackathon(h._id)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg mt-4"
                  >
                    View Participants →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PARTICIPANTS */}
        {selectedHackathon && (
          <div className="space-y-6">
            {/* BACK BUTTON & SEARCH */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <button
                onClick={() => {
                  setSelectedHackathon(null);
                  setParticipants([]);
                  setDraftRanks({});
                  setSearchQuery("");
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Hackathons</span>
              </button>

              {/* SEARCH BAR */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* STATS */}
            <div className="flex gap-4 flex-wrap">
              <div className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Total Participants</p>
                  <p className="text-lg font-bold text-gray-900">{participants.length}</p>
                </div>
              </div>
              
              <div className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-gray-500">Pending Rankings</p>
                  <p className="text-lg font-bold text-gray-900">{Object.keys(draftRanks).length}</p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="bg-white border-2 border-gray-200 p-16 rounded-2xl text-center shadow-md">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading participants...</p>
              </div>
            ) : (
              <>
                {/* PARTICIPANTS LIST */}
                <div className="space-y-4">
                  {filteredParticipants.length === 0 ? (
                    <div className="bg-white border-2 border-gray-200 p-12 rounded-2xl text-center shadow-md">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No participants found matching your search</p>
                    </div>
                  ) : (
                    filteredParticipants.map(p => {
                      const selectedRank = draftRanks[p.user._id] ?? p.rank;

                      return (
                        <div
                          key={p.user._id}
                          className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-md hover:border-emerald-400 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* LEFT: USER INFO */}
                            <div className="flex-1 space-y-3">
                              <div>
                                <p className="font-bold text-xl text-gray-900 mb-1">{p.user.name}</p>
                                <p className="text-sm text-gray-600">{p.user.email}</p>
                              </div>

                              {/* SUBMISSION STATUS */}
                              <div className="flex items-center gap-2">
                                {p.submittedAt ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-green-700 text-sm font-semibold">
                                      Project Submitted
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-4 h-4 text-red-600" />
                                    <span className="text-red-700 text-sm font-semibold">
                                      Not Submitted
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* PROJECT LINKS */}
                              <div className="flex flex-wrap gap-3">
                                {p.githubLink && (
                                  <a
                                    href={p.githubLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-blue-600 hover:text-blue-700 text-sm transition-all"
                                  >
                                    <Github className="w-4 h-4" />
                                    GitHub Repository
                                  </a>
                                )}

                                {p.driveVideoLink && (
                                  <a
                                    href={p.driveVideoLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-purple-600 hover:text-purple-700 text-sm transition-all"
                                  >
                                    <Video className="w-4 h-4" />
                                    Demo Video
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* RIGHT: RANK BUTTONS */}
                            <div className="flex flex-col items-end gap-2">
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Select Rank</p>
                              <div className="flex gap-2">
                                {[1, 2, 3].map(r => (
                                  <button
  disabled={!p.submittedAt}
  onClick={() => selectRank(p.user._id, r)}
  className={`w-16 h-16 rounded-xl font-bold text-lg transition-all ${
    !p.submittedAt
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : selectedRank === r
        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`}
>

                                    {r}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                {filteredParticipants.length > 0 && (
                  <div className="sticky bottom-6 mt-8 flex justify-end">
                    <button
                      onClick={submitAllRanks}
                      disabled={submitting || !Object.keys(draftRanks).length}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Submit Rankings ({Object.keys(draftRanks).length})
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgeDashboard;
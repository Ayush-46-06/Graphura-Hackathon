import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, Award, Medal, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

const DeclareResult = () => {
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState("");
  const [winnerPreview, setWinnerPreview] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:5001/api";

  /* ================= FETCH ALL HACKATHONS ================= */
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get(`${API_URL}/hackathon`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setHackathons(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load hackathons");
      }
    };

    fetchHackathons();
  }, []);

  /* ================= FETCH JUDGE RESULTS ================= */
  const fetchJudgeResult = async (hackathonId) => {
    try {
      setWinnerPreview([]);
      setError("");

      const res = await axios.get(
        `${API_URL}/hackathon/${hackathonId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const participants = res.data?.data?.participants || [];

      // 🔑 Get all ranked participants (1, 2, 3)
      const ranked = participants
        .filter(p => p.rank && [1, 2, 3].includes(p.rank))
        .sort((a, b) => a.rank - b.rank);

      setWinnerPreview(ranked);
    } catch (err) {
      console.error(err);
      setWinnerPreview([]);
      setError("Failed to fetch judge results");
    }
  };

  /* ================= DECLARE RESULT ================= */
  const handleDeclareResult = async () => {
    if (!selectedHackathon) {
      setError("Please select a hackathon");
      return;
    }

    // ❌ Block if Rank 1 is missing
    const hasRankOne = winnerPreview.some(w => w.rank === 1);
    if (!hasRankOne) {
      setError("Rank 1 must be selected by judge before declaring result");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await axios.post(
        `${API_URL}/admin/hackathon/declare-result`,
        { hackathonId: selectedHackathon },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccess(res.data.message || "Result declared successfully");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to declare result");
    } finally {
      setLoading(false);
    }
  };

  const getRankConfig = (rank) => {
    switch(rank) {
      case 1:
        return {
          icon: <Trophy className="w-5 h-5" />,
          color: "from-yellow-400 to-amber-500",
          textColor: "text-yellow-700",
          bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
          borderColor: "border-yellow-300",
          label: "1st Place"
        };
      case 2:
        return {
          icon: <Award className="w-5 h-5" />,
          color: "from-slate-300 to-slate-400",
          textColor: "text-slate-700",
          bgColor: "bg-gradient-to-br from-slate-50 to-gray-50",
          borderColor: "border-slate-300",
          label: "2nd Place"
        };
      case 3:
        return {
          icon: <Medal className="w-5 h-5" />,
          color: "from-orange-400 to-amber-600",
          textColor: "text-orange-700",
          bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
          borderColor: "border-orange-300",
          label: "3rd Place"
        };
      default:
        return {
          icon: <Award className="w-5 h-5" />,
          color: "from-blue-400 to-blue-500",
          textColor: "text-blue-700",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-300",
          label: `${rank}th Place`
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8" />
              <h2 className="text-3xl font-bold">
                Declare Hackathon Result
              </h2>
            </div>
            <p className="text-blue-100 text-sm">
              Review and officially announce the winners
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* SELECT HACKATHON */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Hackathon
              </label>
              <div className="relative">
                <select
                  className="w-full border-2 border-slate-200 p-3.5 pr-10 rounded-xl appearance-none bg-white hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer text-slate-700 font-medium"
                  value={selectedHackathon}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedHackathon(id);
                    setWinnerPreview([]);
                    setSuccess("");
                    setError("");

                    if (id) fetchJudgeResult(id);
                  }}
                >
                  <option value="">Choose a hackathon...</option>
                  {hackathons.map(h => (
                    <option key={h._id} value={h._id}>
                      {h.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* JUDGE RESULT PREVIEW */}
            {winnerPreview.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-lg">
                    Judge's Decision
                  </h3>
                </div>

                <div className="space-y-3">
                  {winnerPreview.map((p, idx) => {
                    const config = getRankConfig(p.rank);
                    return (
                      <div
                        key={idx}
                        className={`${config.bgColor} border-2 ${config.borderColor} rounded-xl p-4 transition-all hover:shadow-md`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 bg-gradient-to-br ${config.color} rounded-lg text-white shadow-sm`}>
                              {config.icon}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-lg">
                                {p.user?.name || "Unknown User"}
                              </p>
                              <p className="text-xs text-slate-500 font-medium">
                                Participant
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${config.textColor} bg-white border-2 ${config.borderColor}`}>
                              {config.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DECLARE BUTTON */}
            <button
              onClick={handleDeclareResult}
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Declaring Result...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Declare Result Officially
                </span>
              )}
            </button>

            {/* SUCCESS */}
            {success && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-green-800 font-semibold flex-1">
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500 rounded-full">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-red-800 font-semibold flex-1">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclareResult;
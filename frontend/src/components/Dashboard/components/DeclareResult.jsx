import { useEffect, useState } from "react";
import {
  Trophy,
  Loader,
  Medal,
  Award,
  Crown,
  Search,
  Users,
  CheckCircle,
  XCircle,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Star,
} from "lucide-react";

const API_BASE = "http://localhost:5001/api";

const DeclareResult = () => {
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [winners, setWinners] = useState({
    first: null,
    second: null,
    third: null,
  });
  const [loading, setLoading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  /* ================= FETCH HACKATHONS ================= */
  useEffect(() => {
    const fetchHackathons = async () => {
      const res = await fetch(`${API_BASE}/hackathon`);
      const data = await res.json();
      setHackathons(
        Array.isArray(data.data)
          ? data.data.filter((h) => h.status !== "completed")
          : []
      );
    };
    fetchHackathons();
  }, []);

  /* ================= FETCH PARTICIPANTS ================= */
  const fetchParticipants = async (hackathon) => {
    setSelectedHackathon(hackathon);
    setParticipants([]);
    setWinners({ first: null, second: null, third: null });
    setSearchQuery("");

    const res = await fetch(
      `${API_BASE}/hackathon/${hackathon._id}/participants`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();

    const list = Array.isArray(data.data)
      ? data.data
      : Array.isArray(data.data?.participants)
      ? data.data.participants
      : [];

    setParticipants(list);
  };

  /* ================= SELECT WINNER ================= */
  const selectWinner = (position, userId) => {
    const newWinners = { ...winners };
    Object.keys(newWinners).forEach((key) => {
      if (newWinners[key] === userId) newWinners[key] = null;
    });
    newWinners[position] = userId;
    setWinners(newWinners);
  };

  /* ================= CLEAR POSITION ================= */
  const clearPosition = (position) => {
    setWinners({ ...winners, [position]: null });
  };

  /* ================= GET USER BY ID ================= */
  const getUserById = (userId) => {
    return participants.find((p) => p.user?._id === userId)?.user;
  };

  /* ================= CHECK IF USER IS WINNER ================= */
  const isUserWinner = (userId) => {
    return Object.values(winners).includes(userId);
  };

  /* ================= FILTERED PARTICIPANTS ================= */
  const filteredParticipants = Array.isArray(participants)
    ? participants.filter(
        (p) =>
          p.user?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          p.user?.email
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : [];

  /* ================= DECLARE RESULT ================= */
  const declareResult = async () => {
    if (!selectedHackathon) {
      return alert("Please select a hackathon");
    }

    const winnersList = [
      winners.first,
      winners.second,
      winners.third,
    ].filter(Boolean);

    if (winnersList.length === 0) {
      return alert("Please select at least one winner");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/admin/hackathon/declare-result`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            hackathonId: selectedHackathon._id,
            winners: winnersList,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to declare result");
      }

      alert("✅ Result declared & certificates sent!");
      setSelectedHackathon(null);
      setParticipants([]);
      setWinners({ first: null, second: null, third: null });
      setSearchQuery("");
    } catch (err) {
      alert(err.message || "Failed to declare result");
    } finally {
      setLoading(false);
    }
  };

  const positionConfig = {
    first: {
      icon: Crown,
      color: "text-yellow-600",
      bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      border: "border-yellow-400",
      hoverBorder: "hover:border-yellow-500",
      label: "🥇 1st Place",
      prize: "Champion",
    },
    second: {
      icon: Medal,
      color: "text-gray-500",
      bg: "bg-gradient-to-br from-gray-50 to-gray-100",
      border: "border-gray-300",
      hoverBorder: "hover:border-gray-400",
      label: "🥈 2nd Place",
      prize: "Runner Up",
    },
    third: {
      icon: Award,
      color: "text-orange-600",
      bg: "bg-gradient-to-br from-orange-50 to-orange-100",
      border: "border-orange-400",
      hoverBorder: "hover:border-orange-500",
      label: "🥉 3rd Place",
      prize: "Second Runner Up",
    },
  };

  const getPositionForUser = (userId) => {
    if (winners.first === userId) return "first";
    if (winners.second === userId) return "second";
    if (winners.third === userId) return "third";
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-4 shadow-xl">
            <Trophy className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black mb-2 text-gray-900">
            Declare Hackathon Results
          </h1>
          <p className="text-gray-600 text-base">
            Select winners and declare official results with automated certificates
          </p>
        </div>

        {/* Hackathon Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-gray-100 hover:border-teal-200 transition-all">
          <label className="block mb-3 font-bold text-gray-800 flex items-center gap-2 text-base">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <Trophy size={18} className="text-teal-600" />
            </div>
            Select Hackathon
          </label>
          <select
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-teal-300 focus:border-teal-500 focus:outline-none transition-all cursor-pointer bg-gray-50"
            onChange={(e) => {
              const hackathon = hackathons.find(
                (h) => h._id === e.target.value
              );
              if (hackathon) fetchParticipants(hackathon);
            }}
            value={selectedHackathon?._id || ""}
          >
            <option value="" disabled>
              Choose a hackathon to declare results...
            </option>
            {hackathons.map((h) => (
              <option key={h._id} value={h._id}>
                {h.title}
              </option>
            ))}
          </select>
        </div>

        {selectedHackathon && (
          <>
            {/* Selected Hackathon Info */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-teal-100 mb-1 uppercase tracking-wide">Selected Hackathon</p>
                  <h3 className="text-xl font-black">{selectedHackathon.title}</h3>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users size={16} />
                  <span className="font-bold text-sm">{participants.length} Participants</span>
                </div>
              </div>
            </div>

            {/* Winner Podium */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black flex items-center gap-3 text-gray-900">
                  <Sparkles className="text-yellow-500" size={28} />
                  Winner Podium
                </h2>
                <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full">
                  <CheckCircle size={16} className="text-teal-600" />
                  <span className="text-xs font-bold text-teal-700">
                    {Object.values(winners).filter(Boolean).length}/3 Selected
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {Object.entries(positionConfig).map(
                  ([position, config]) => {
                    const Icon = config.icon;
                    const winner = winners[position];
                    const user = winner ? getUserById(winner) : null;

                    return (
                      <div
                        key={position}
                        className={`relative p-5 rounded-2xl border-2 ${config.border} ${config.bg} transition-all hover:shadow-xl ${!user && 'hover:scale-105'}`}
                      >
                        {/* Position Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={config.color} size={24} />
                              <span className="font-black text-base text-gray-800">
                                {config.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 font-semibold">{config.prize}</p>
                          </div>
                          {winner && (
                            <button
                              onClick={() => clearPosition(position)}
                              className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md"
                              title="Remove winner"
                            >
                              <XCircle className="text-white" size={18} />
                            </button>
                          )}
                        </div>

                        {/* Winner Display */}
                        {user ? (
                          <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-black text-sm">
                                  {user.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-gray-900 truncate">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-dashed border-gray-300 text-center">
                            <Star className="text-gray-300 mx-auto mb-2" size={24} />
                            <p className="text-xs text-gray-400 font-semibold">
                              Select participant below
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              {/* Declare Button */}
              <button
                onClick={declareResult}
                disabled={loading || Object.values(winners).filter(Boolean).length === 0}
                className={`w-full py-4 rounded-xl font-black text-base flex items-center justify-center gap-3 transition-all shadow-lg ${
                  loading || Object.values(winners).filter(Boolean).length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95"
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Declaring Results...
                  </>
                ) : (
                  <>
                    <Trophy size={20} />
                    Declare Results & Send Certificates
                    <ChevronRight size={20} />
                  </>
                )}
              </button>

              {Object.values(winners).filter(Boolean).length === 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800 font-medium">
                    Please select at least one winner to declare results
                  </p>
                </div>
              )}
            </div>

            {/* Participants */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Users size={24} className="text-teal-600" />
                  All Participants
                  <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                    {filteredParticipants.length}
                  </span>
                </h2>

                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full sm:w-80 pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium focus:border-teal-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {filteredParticipants.length ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredParticipants.map((p) => {
                    const currentPosition = getPositionForUser(p.user?._id);
                    const isWinner = currentPosition !== null;

                    return (
                      <div
                        key={p._id}
                        className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                          isWinner
                            ? `${positionConfig[currentPosition].border} ${positionConfig[currentPosition].bg}`
                            : "border-gray-200 bg-white hover:border-teal-300"
                        }`}
                      >
                        {/* Winner Badge */}
                        {isWinner && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="text-white" size={16} />
                          </div>
                        )}

                        {/* User Info */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-black text-sm">
                              {p.user?.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900 truncate">
                              {p.user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {p.user?.email}
                            </p>
                          </div>
                        </div>

                        {/* Position Buttons */}
                        <div className="flex gap-2">
                          {["first", "second", "third"].map((pos) => {
                            const config = positionConfig[pos];
                            const isSelected = currentPosition === pos;
                            
                            return (
                              <button
                                key={pos}
                                onClick={() => selectWinner(pos, p.user._id)}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                  isSelected
                                    ? `${config.bg} ${config.border} border-2`
                                    : "bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300"
                                }`}
                                title={`Select as ${config.label}`}
                              >
                                {pos === "first" ? "1st" : pos === "second" ? "2nd" : "3rd"}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-gray-300" size={40} />
                  </div>
                  <p className="text-gray-400 font-semibold text-base mb-2">
                    No participants found
                  </p>
                  <p className="text-gray-400 text-sm">
                    {searchQuery ? "Try a different search term" : "No participants have registered yet"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Empty State */}
        {!selectedHackathon && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="text-teal-600" size={48} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Select a Hackathon
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Choose a hackathon from the dropdown above to view participants and declare winners
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeclareResult;
import { useEffect, useState } from "react";
import { Trophy, Loader, Medal, Award, Crown, Search, Users, CheckCircle, XCircle } from "lucide-react";

const API_BASE = "http://localhost:5001/api";

// Note: Replace fetch calls with your actual API library (axios) in your project

const DeclareResult = () => {
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [winners, setWinners] = useState({
    first: null,
    second: null,
    third: null
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH HACKATHONS ================= */
  useEffect(() => {
    const fetchHackathons = async () => {
      const res = await fetch(`${API_BASE}/hackathon`);
      const data = await res.json();
      setHackathons(data.data.filter(h => h.status !== "completed"));
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
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setParticipants(data.data);
  };

  /* ================= SELECT WINNER ================= */
  const selectWinner = (position, userId) => {
    // Remove this user from other positions if already selected
    const newWinners = { ...winners };
    Object.keys(newWinners).forEach(key => {
      if (newWinners[key] === userId) {
        newWinners[key] = null;
      }
    });
    
    // Set the new position
    newWinners[position] = userId;
    setWinners(newWinners);
  };

  /* ================= CLEAR POSITION ================= */
  const clearPosition = (position) => {
    setWinners({ ...winners, [position]: null });
  };

  /* ================= GET USER BY ID ================= */
  const getUserById = (userId) => {
    return participants.find(p => p.user._id === userId)?.user;
  };

  /* ================= CHECK IF USER IS WINNER ================= */
  const isUserWinner = (userId) => {
    return Object.values(winners).includes(userId);
  };

  /* ================= FILTERED PARTICIPANTS ================= */
  const filteredParticipants = participants.filter(p => 
    p.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= DECLARE RESULT ================= */
  const declareResult = async () => {
    if (!selectedHackathon) {
      return alert("Please select a hackathon");
    }

    const winnersList = [winners.first, winners.second, winners.third].filter(Boolean);
    
    if (winnersList.length === 0) {
      return alert("Please select at least one winner");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/admin/hackathon/declare-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            hackathonId: selectedHackathon._id,
            winners: winnersList
          })
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to declare result');
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
      color: "text-yellow-500", 
      bg: "bg-yellow-50", 
      border: "border-yellow-500",
      label: "1st Place"
    },
    second: { 
      icon: Medal, 
      color: "text-gray-400", 
      bg: "bg-gray-50", 
      border: "border-gray-400",
      label: "2nd Place"
    },
    third: { 
      icon: Award, 
      color: "text-orange-600", 
      bg: "bg-orange-50", 
      border: "border-orange-600",
      label: "3rd Place"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="text-yellow-500" size={40} />
            Declare Hackathon Results
          </h1>
          <p className="text-gray-600">Select winners and declare official results</p>
        </div>

        {/* Hackathon Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <label className="block mb-3 font-semibold text-gray-700 flex items-center gap-2">
            <Trophy size={20} />
            Select Hackathon
          </label>
          <select
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#03594E] focus:outline-none transition-colors text-lg"
            onChange={(e) => {
              const hackathon = hackathons.find(h => h._id === e.target.value);
              if (hackathon) fetchParticipants(hackathon);
            }}
            value={selectedHackathon?._id || ""}
          >
            <option value="" disabled>Choose a hackathon to declare results...</option>
            {hackathons.map(h => (
              <option key={h._id} value={h._id}>
                {h.title} • {h.status}
              </option>
            ))}
          </select>
        </div>

        {selectedHackathon && (
          <>
            {/* Winner Podium */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                Winner Podium
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {Object.entries(positionConfig).map(([position, config]) => {
                  const Icon = config.icon;
                  const winner = winners[position];
                  const user = winner ? getUserById(winner) : null;

                  return (
                    <div
                      key={position}
                      className={`relative p-6 rounded-xl border-2 ${config.border} ${config.bg} transition-all`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Icon className={config.color} size={24} />
                          <span className="font-bold text-lg">{config.label}</span>
                        </div>
                        {winner && (
                          <button
                            onClick={() => clearPosition(position)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <XCircle size={20} />
                          </button>
                        )}
                      </div>

                      {user ? (
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="font-semibold text-gray-900 mb-1">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300 text-center">
                          <p className="text-gray-400 text-sm">Click a participant below to select</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <button
                onClick={declareResult}
                disabled={loading || !Object.values(winners).some(Boolean)}
                className="w-full bg-[#03594E] text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#024739] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Declaring Results...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Declare Results & Send Certificates
                  </>
                )}
              </button>
            </div>

            {/* Participants List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="text-[#03594E]" />
                  Participants ({filteredParticipants.length})
                </h2>
                
                {/* Search */}
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search participants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#03594E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {filteredParticipants.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredParticipants.map(p => {
                    const isWinner = isUserWinner(p.user._id);
                    const winnerPosition = Object.keys(winners).find(
                      key => winners[key] === p.user._id
                    );

                    return (
                      <div
                        key={p._id}
                        className={`relative p-4 border-2 rounded-xl transition-all cursor-pointer group
                          ${isWinner 
                            ? `${positionConfig[winnerPosition].border} ${positionConfig[winnerPosition].bg}` 
                            : "border-gray-200 hover:border-[#03594E] hover:shadow-md"
                          }`}
                      >
                        {isWinner && (
                          <div className={`absolute top-2 right-2 ${positionConfig[winnerPosition].color}`}>
                            <CheckCircle size={20} />
                          </div>
                        )}

                        <div className="mb-3">
                          <p className="font-semibold text-gray-900 mb-1">{p.user.name}</p>
                          <p className="text-sm text-gray-500">{p.user.email}</p>
                        </div>

                        {/* Position Buttons */}
                        <div className="flex gap-2">
                          {Object.entries(positionConfig).map(([position, config]) => {
                            const Icon = config.icon;
                            return (
                              <button
                                key={position}
                                onClick={() => selectWinner(position, p.user._id)}
                                disabled={isWinner && winners[position] === p.user._id}
                                className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all flex items-center justify-center gap-1
                                  ${winners[position] === p.user._id
                                    ? `${config.border} ${config.bg} cursor-default`
                                    : "border-gray-200 hover:border-gray-400 bg-white"
                                  }
                                `}
                              >
                                <Icon className={winners[position] === p.user._id ? config.color : "text-gray-400"} size={16} />
                                <span className="text-xs font-medium">
                                  {position === 'first' ? '1st' : position === 'second' ? '2nd' : '3rd'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Users size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No participants found</p>
                </div>
              )}
            </div>
          </>
        )}

        {!selectedHackathon && hackathons.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Trophy size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Select a Hackathon to Begin
            </h3>
            <p className="text-gray-500">
              Choose a hackathon from the dropdown above to view participants and declare results
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeclareResult;
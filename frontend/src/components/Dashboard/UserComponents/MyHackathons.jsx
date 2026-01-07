import { useEffect, useState } from "react";
import api from "./api"; // your axios instance
import { Trophy, Calendar, Award, Users, Tag, Download } from "lucide-react";
import ResultModal from "./ResultModal";
import { getMyHackathonResult } from "./api";

const MyHackathons = () => {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const fetchMyHackathons = async () => {
    try {
      const res = await api.get("/user/hackathons");
      const data = res.data.data;
      
      // Calculate status based on end date
      const updatedRegistrations = data.map(item => {
        const endDate = new Date(item.hackathon?.endDate);
        const currentDate = new Date();
        
        // If end date has passed and status is not already completed, mark as completed
        if (endDate < currentDate && item.status !== "completed") {
          return { ...item, status: "completed" };
        }
        
        return item;
      });
      
      setRegistrations(updatedRegistrations);
    } catch (error) {
      console.error("Failed to fetch hackathons", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProgress = async (hackathonId, status) => {
    try {
      const res = await getMyHackathonResult(hackathonId);
      setResultData(res.data.data);
      setSelectedHackathon({ id: hackathonId, status });
      setShowResult(true);
    } catch (error) {
      console.error("Failed to load result", error);
      alert("Result not available yet");
    }
  };

  useEffect(() => {
    fetchMyHackathons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F9]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#03594E]" />
          <p className="mt-4 text-gray-500">Loading your hackathons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#F5F7F9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#0C121D] mb-2">
            My Hackathons
          </h1>
          <p className="text-gray-500">
            Hackathons you have successfully registered for ({registrations.length} total)
          </p>
        </div>

        {/* Empty State */}
        {registrations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Hackathons Found</h3>
            <p className="text-gray-500 mb-4">
              You have not registered for any hackathons yet.
            </p>
            <button
              onClick={() => window.location.href = '/explore'}
              className="px-6 py-2 bg-[#03594E] text-white rounded-lg font-semibold hover:opacity-90"
            >
              Explore Hackathons
            </button>
          </div>
        ) : (
          /* Hackathon List */
          <div className="space-y-6">
            {registrations.map((item) => {
              const h = item.hackathon;
              
              return (
                <div
                  key={item._id}
                  className="rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
                      <img
                        src={h?.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400"}
                        alt={h?.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400";
                        }}
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <span
                          className="px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg"
                          style={{
                            backgroundColor:
                              item.status === "ongoing"
                                ? "#E8F5E9"
                                : item.status === "completed"
                                ? "#E3F2FD"
                                : "#F5F7F9",
                            color:
                              item.status === "ongoing"
                                ? "#1AB69D"
                                : item.status === "completed"
                                ? "#1976D2"
                                : "#6C757D",
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2 text-[#0C121D]">
                          {h?.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {h?.description}
                        </p>
                      </div>

                      {/* Category & Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {h?.category && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: "#E3F2FD", color: "#1976D2" }}
                          >
                            {h.category}
                          </span>
                        )}
                        {h?.tags?.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-xs flex items-center gap-1"
                            style={{ backgroundColor: "#F5F7F9", color: "#6C757D" }}
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Dates & Participants */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                        <div>
                          <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Start Date
                          </p>
                          <p className="font-semibold text-sm mt-1">
                            {h?.startDate ? new Date(h.startDate).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            End Date
                          </p>
                          <p className="font-semibold text-sm mt-1">
                            {h?.endDate ? new Date(h.endDate).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-orange-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Registration
                          </p>
                          <p className="font-semibold text-sm mt-1 text-orange-500">
                            {h?.lastEnrollmentDate ? new Date(h.lastEnrollmentDate).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Participants
                          </p>
                          <p className="font-semibold text-sm mt-1 text-[#03594E]">
                            {h?.participants?.length || 0} Registered
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {item.status === "completed" && (
                          <a
                            href={`${window.location.origin}/api/user/certificate/${h?._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:scale-105 flex items-center gap-2"
                            style={{ backgroundColor: "#03594E", color: "#fff" }}
                          >
                            <Download className="w-4 h-4" />
                            Download Certificate
                          </a>
                        )}
                        
                        {item.status === "ongoing" && (
                          <button
                            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:scale-105"
                            style={{ backgroundColor: "#03594E", color: "#fff" }}
                          >
                            View Hackathon Details
                          </button>
                        )}

                        <button
                          onClick={() => handleViewProgress(h._id, item.status)}
                          className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-md border-2"
                          style={{ 
                            borderColor: "#03594E", 
                            color: "#03594E",
                            backgroundColor: "#fff"
                          }}
                        >
                          View Progress
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showResult && resultData && (
        <ResultModal
          open={showResult}
          onClose={() => setShowResult(false)}
          data={resultData}
          hackathonId={selectedHackathon?.id}
          completed={selectedHackathon?.status === "completed"}
        />
      )}
    </div>
  );
};

export default MyHackathons;
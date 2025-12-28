import { useEffect, useState } from "react";
import axios from "axios";
import AddHackathonModal from "./AddHackathonModal";

const API_URL = "http://localhost:5001/api/hackathon";

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchHackathons = async () => {
    try {
      const res = await axios.get(API_URL);
      setHackathons(res.data.data);
    } catch (err) {
      alert("Failed to load hackathons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  const deleteHackathon = async (id) => {
    if (!window.confirm("Delete this hackathon?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHackathons((prev) => prev.filter((h) => h._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7F9' }}>
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" 
               style={{ borderColor: '#03594E', borderTopColor: 'transparent' }}></div>
          <p className="mt-4 text-lg" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-heading)' }}>
            Loading hackathons...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7F9' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2" 
                  style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}>
                Hackathons
              </h1>
              <p className="text-base" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                Discover and manage exciting coding challenges
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ 
                backgroundColor: '#03594E', 
                color: '#ffffff',
                fontFamily: 'var(--it-ff-heading)'
              }}
            >
              <span className="mr-2">+</span>
              Add Hackathon
            </button>
          </div>
        </div>

        {/* Hackathon Cards Grid */}
        {hackathons.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hackathons.map((h) => (
              <div
                key={h._id}
                className="rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" 
                        style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}>
                      {h.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm" style={{ color: '#6C757D' }}>
                      <span className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: '#F0F4F5', color: '#03594E' }}>
                        {h.category}
                      </span>
                      <span className="font-bold" style={{ color: '#F8C62F' }}>
                        ₹{h.prizePool.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <span 
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                      h.status === "upcoming" ? "status-upcoming" :
                      h.status === "ongoing" ? "status-ongoing" : "status-completed"
                    }`}
                    style={{
                      backgroundColor: 
                        h.status === "upcoming" ? '#E3F2FD' :
                        h.status === "ongoing" ? '#E8F5E9' : '#F5F7F9',
                      color: 
                        h.status === "upcoming" ? '#1976D2' :
                        h.status === "ongoing" ? '#1AB69D' : '#6C757D'
                    }}
                  >
                    {h.status}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t my-4" style={{ borderColor: '#F0F4F5' }}></div>

                {/* Date Information Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide mb-1" 
                       style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                      Start Date
                    </p>
                    <p className="font-semibold text-sm" style={{ color: '#0C121D' }}>
                      {new Date(h.startDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide mb-1" 
                       style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                      End Date
                    </p>
                    <p className="font-semibold text-sm" style={{ color: '#0C121D' }}>
                      {new Date(h.endDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <p className="text-xs uppercase tracking-wide mb-1" 
                       style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                      Last Enrollment
                    </p>
                    <p className="font-semibold text-sm" style={{ color: '#FE8235' }}>
                      {new Date(h.lastEnrollmentDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {h.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {h.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: '#F0F4F5', 
                          color: '#03594E',
                          fontFamily: 'var(--it-ff-body)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: '#F0F4F5' }}>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
                    style={{ 
                      backgroundColor: '#F0F4F5', 
                      color: '#03594E',
                      fontFamily: 'var(--it-ff-heading)'
                    }}
                  >
                    View
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
                    style={{ 
                      backgroundColor: '#FFF8F4', 
                      color: '#F8C62F',
                      fontFamily: 'var(--it-ff-heading)'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHackathon(h._id)}
                    className="px-4 py-2 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
                    style={{ 
                      backgroundColor: '#FEE2E2', 
                      color: '#DC2626',
                      fontFamily: 'var(--it-ff-heading)'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl" style={{ backgroundColor: '#ffffff' }}>
            <div className="mb-4">
              <svg 
                className="mx-auto h-24 w-24" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="#D9D9D9"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" 
                style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}>
              No Hackathons Yet
            </h3>
            <p className="mb-6" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
              Get started by creating your first hackathon
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ 
                backgroundColor: '#03594E', 
                color: '#ffffff',
                fontFamily: 'var(--it-ff-heading)'
              }}
            >
              <span className="mr-2">+</span>
              Create Hackathon
            </button>
          </div>
        )}

        {showModal && (
          <AddHackathonModal
            onClose={() => setShowModal(false)}
            onCreated={fetchHackathons}
          />
        )}
      </div>
    </div>
  );
};

export default Hackathons;
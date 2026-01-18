import { useEffect, useState } from "react";
import axios from "axios";
import AddHackathonModal from "./AddHackathonModal";
import HackathonViewModal from "./HackathonViewModal";
import { Users, Calendar, Award, Tag } from "lucide-react";

const API_URL = "http://localhost:5001/api/hackathon";

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editHackathon, setEditHackathon] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);

  // 🔹 Participants states
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);

  // 🔍 Search
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchHackathons = async () => {
    try {
      const res = await axios.get(API_URL);
      setHackathons(res.data.data);
    } catch {
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

  const uploadProblemStatement = async (hackathonId) => {
  if (!selectedFile) {
    alert("Please select a PDF file");
    return;
  }

  const formData = new FormData();
  formData.append("activityPdf", selectedFile);

  try {
    setUploadingId(hackathonId);

    await axios.post(
      `${API_URL}/${hackathonId}/activity-pdf`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Problem statement uploaded successfully");
    setSelectedFile(null);
    fetchHackathons(); // refresh list

  } catch (err) {
    alert("Failed to upload problem statement");
  } finally {
    setUploadingId(null);
  }
};


  // ✅ FIXED VIEW PARTICIPANTS
  const viewParticipants = async (hackathon) => {
    setSelectedHackathon(hackathon);
    setShowParticipants(true);
    setParticipants([]);
    setParticipantsLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}/${hackathon._id}/participants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setParticipants(res.data.data.participants);

    } catch {
      alert("Failed to load participants");
    } finally {
      setParticipantsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F7F9" }}>
        <div className="text-center">
          <div
            className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#03594E", borderTopColor: "transparent" }}
          />
          <p className="mt-4 text-lg" style={{ color: "#6C757D" }}>
            Loading hackathons...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5F7F9" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: "#0C121D" }}>
              Hackathons
            </h1>
            <p style={{ color: "#6C757D" }}>
              Discover and manage exciting coding challenges
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: "#03594E", color: "#fff" }}
          >
            + Add Hackathon
          </button>
        </div>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by title, category or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 mb-6 border rounded-lg"
        />

        {/* Hackathon List */}
        {hackathons.length > 0 ? (
          <div className="space-y-6">
            {hackathons
              .filter(
                (h) =>
                  h.title.toLowerCase().includes(search.toLowerCase()) ||
                  h.category?.toLowerCase().includes(search.toLowerCase()) ||
                  h.tags?.some((t) =>
                    t.toLowerCase().includes(search.toLowerCase())
                  )
              )
              .map((h) => (
                <div
                  key={h._id}
                  className="rounded-2xl shadow-md bg-white overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-80 h-64 relative">
                      <img
                        src={h.image}
                        alt={h.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <h3 className="text-2xl font-bold mb-2">{h.title}</h3>

                      {/* <div className="flex items-center gap-2 mb-3">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="text-xl font-bold text-yellow-500">
                          ₹{h.prizePool.toLocaleString()}
                        </span>
                      </div> */}

                      <p className="text-sm mb-4 text-gray-600">
                        {h.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <Calendar className="inline w-4 h-4 mr-1" />
                          {new Date(h.startDate).toLocaleDateString()}
                        </div>
                        <div>
                          <Calendar className="inline w-4 h-4 mr-1" />
                          {new Date(h.endDate).toLocaleDateString()}
                        </div>
                        <div>
                          <Users className="inline w-4 h-4 mr-1" />
                          {h.participants?.length || 0} Registered
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => viewParticipants(h)}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#03594E", color: "#fff" }}
                        >
                          View Participants
                        </button>

                        <button
                          onClick={() => {
                            setSelectedId(h._id);
                            setOpen(true);
                          }}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#E8F5E9", color: "#1AB69D" }}
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => setEditHackathon(h)}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#FFF8F4", color: "#F8C62F" }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteHackathon(h._id)}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
                        >
                          Delete
                        </button>
                        <label className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
  style={{ backgroundColor: "#EEF2FF", color: "#3730A3" }}
>
  Upload Problem Statement
  <input
    type="file"
    accept="application/pdf"
    hidden
    onChange={(e) => setSelectedFile(e.target.files[0])}
  />
</label>

<button
  onClick={() => uploadProblemStatement(h._id)}
  disabled={uploadingId === h._id}
  className="px-4 py-2 rounded-lg text-sm font-medium"
  style={{
    backgroundColor: "#1AB69D",
    color: "#fff",
    opacity: uploadingId === h._id ? 0.6 : 1,
  }}
>
  {uploadingId === h._id ? "Uploading..." : "Submit PDF"}
</button>


                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No hackathons found</p>
        )}

        {/* Participants Modal */}
        {showParticipants && selectedHackathon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedHackathon.title} – Participants
              </h2>

              {participantsLoading ? (
                <p>Loading...</p>
              ) : participants.length > 0 ? (
                participants.map((p, i) => (
                  <div key={p._id} className="border p-3 rounded mb-2">
                    <p className="font-semibold">{p.user?.name}</p>
                    <p className="text-sm">{p.user?.email}</p>
                  </div>
                ))
              ) : (
                <p>No participants yet</p>
              )}

              <button
                onClick={() => setShowParticipants(false)}
                className="mt-4 w-full py-2 rounded-lg font-semibold"
                style={{ backgroundColor: "#03594E", color: "#fff" }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* View Modal */}
        {open && (
          <HackathonViewModal
            hackathonId={selectedId}
            onClose={() => {
              setOpen(false);
              setSelectedId(null);
            }}
          />
        )}

        {/* Add/Edit Modals */}
        {editHackathon && (
          <AddHackathonModal
            editData={editHackathon}
            onClose={() => setEditHackathon(null)}
            onCreated={fetchHackathons}
          />
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

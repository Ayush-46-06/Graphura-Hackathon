import { useEffect, useState } from "react";
import axios from "axios";
import {
  X,
  Trophy,
  CheckCircle,
  Calendar,
  Users,
  Award,
  ExternalLink
} from "lucide-react";

const tabs = ["Overview", "Rules", "Judges", "Prizes"];

const HackathonViewModal = ({ hackathonId, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hackathonId) return;

    const fetchHackathon = async () => {
      try {
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

  if (!hackathonId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="relative h-64">
          <img
            src={
              hackathon?.image ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
            }
            className="w-full h-full object-cover"
            alt="hackathon"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center"
          >
            <X />
          </button>

          {hackathon && (
            <div className="absolute bottom-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{hackathon.title}</h1>
              <p className="text-white/90">{hackathon.description}</p>
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="bg-gray-50 border-b px-6 pt-4 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-t-xl font-semibold ${
                activeTab === tab
                  ? "bg-white text-green-600"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading && <p className="text-center">Loading...</p>}

          {!loading && hackathon && (
            <>
              {/* OVERVIEW */}
              {activeTab === "Overview" && (
                <div className="space-y-6">
                  {hackathon.about
                    ?.split("\\n")
                    .map((p, i) => (
                      <p key={i} className="text-gray-700">{p}</p>
                    ))}

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <Calendar className="mx-auto text-green-600" />
                      <p className="font-bold">48 Hours</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <Users className="mx-auto text-blue-600" />
                      <p className="font-bold">2–4 Members</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl text-center">
                      <Award className="mx-auto text-purple-600" />
                      <p className="font-bold">
                        ₹
                        {hackathon.prizes
                          ?.reduce((s, p) => s + p.amount, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* RULES */}
              {activeTab === "Rules" && (
                <div className="space-y-3">
                  {hackathon.rules?.map((rule, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <CheckCircle className="text-green-600" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* JUDGES */}
              {activeTab === "Judges" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {hackathon.judges?.map((judge) => (
                    <div
                      key={judge._id}
                      className="border p-4 rounded-xl"
                    >
                      <p className="font-semibold">{judge.name}</p>
                      <p className="text-sm text-gray-500">{judge.email}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* PRIZES */}
              {activeTab === "Prizes" && (
                <div className="space-y-4">
                  {hackathon.prizes?.map((prize, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 border rounded-xl"
                    >
                      <Trophy className="text-yellow-500" />
                      <div>
                        <p className="font-bold">{prize.position}</p>
                        <p className="text-lg font-bold">
                          ₹{prize.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}
        {/* <div className="p-6 border-t bg-gray-50 flex gap-4">
          <button className="flex-1 bg-green-600 text-white py-3 rounded-xl flex justify-center gap-2">
            Register Now <ExternalLink />
          </button>
          <button className="border px-6 rounded-xl">Share</button>
        </div> */}
      </div>
    </div>
  );
};

export default HackathonViewModal;

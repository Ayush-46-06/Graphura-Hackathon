import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5001/api";

const HackathonRegistrationStats = () => {
  const token = localStorage.getItem("token");
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${API_BASE}/hackathon`);
      setHackathons(res.data.data);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Hackathon Registration Count
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hackathons.map((h) => (
          <div
            key={h._id}
            className="border rounded-xl p-4 shadow"
          >
            <h2 className="font-semibold text-lg">{h.title}</h2>
            <p className="text-gray-600">
              Total Registrations:{" "}
              <span className="font-bold">
                {h.totalRegistrations || 0}
              </span>
            </p>
            <p>Status: {h.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackathonRegistrationStats;

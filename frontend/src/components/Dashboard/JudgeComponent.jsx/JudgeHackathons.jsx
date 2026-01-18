import { useEffect, useState } from "react";
import axios from "axios";

const JudgeHackathons = ({ setActive, setSelectedHackathon }) => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    axios.get("/api/judge/hackathons", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => {
      setHackathons(res.data.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hackathons</h1>

      {hackathons.map(h => (
        <div key={h._id} className="bg-white p-4 rounded mb-3 shadow">
          <h2 className="font-semibold">{h.title}</h2>
          <p>Status: {h.status}</p>

          <button
            onClick={() => {
              setSelectedHackathon(h._id);
              setActive("participants");
            }}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            View Participants
          </button>
        </div>
      ))}
    </div>
  );
};

export default JudgeHackathons;

import { useEffect, useState } from "react";
import axios from "axios";

const JudgeParticipants = ({ hackathonId }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios.get(
      `/api/judge/hackathon/${hackathonId}/participants`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then(res => {
      setParticipants(res.data.data.participants);
    });
  }, [hackathonId]);

  const giveRank = async (userId, rank) => {
    await axios.post(
      `/api/judge/hackathon/${hackathonId}/review`,
      { userId, rank },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Rank assigned");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Participants</h1>

      {participants.map(p => (
        <div key={p.user._id} className="bg-white p-4 mb-3 rounded shadow">
          <p className="font-semibold">{p.user.name}</p>
          <p className="text-sm text-gray-500">{p.user.email}</p>

          <div className="flex gap-2 mt-2">
            {[1, 2, 3].map(r => (
              <button
                key={r}
                onClick={() => giveRank(p.user._id, r)}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Rank {r}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JudgeParticipants;

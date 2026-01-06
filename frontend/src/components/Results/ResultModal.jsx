import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ResultModal({ hackathon, onClose }) {
  // TEMP mock data (will come from backend later)
  const result = {
    rank: 23,
    score: 78.4,
    total: 24, // total participants
  };

  const leaderboard = [
    { rank: 1, team: "Team Alpha", score: 96.4 },
    { rank: 2, team: "CodeStorm", score: 94.1 },
    { rank: 3, team: "Neural Ninjas", score: 92.8 },
  ];

  // Percentage-based distribution (frontend-only logic)
  const total = result.total;

  const top10 = Math.ceil(total * 0.1);
  const top25 = Math.ceil(total * 0.25);
  const others = total - top25;

  const distribution = [
    { label: "Top 10%", count: top10 },
    { label: "Top 25%", count: top25 - top10 },
    { label: "Others", count: others },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl p-8 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl leading-none"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-6">
          {hackathon.title} – Result
        </h2>

        {/* A. HACKATHON DESCRIPTION */}
        <div className="bg-[#E6F4F1] p-6 rounded-xl mb-10">
          <h3 className="font-semibold mb-4">About This Hackathon</h3>

          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {hackathon.description ||
              "This hackathon challenged participants to collaborate, innovate, and build impactful solutions within a limited timeframe. Teams were evaluated on innovation, execution quality, feasibility, and overall presentation, encouraging both technical and creative problem-solving approaches."}
          </p>
        </div>

      
        {/* B. LEADERBOARD */}
        <div>
          <h4 className="font-semibold mb-4">Top Performers</h4>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Rank</th>
                <th className="py-2 text-left">Team</th>
                <th className="py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row) => (
                <tr key={row.rank} className="border-b">
                  <td className="py-2">{row.rank}</td>
                  <td className="py-2">{row.team}</td>
                  <td className="py-2">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

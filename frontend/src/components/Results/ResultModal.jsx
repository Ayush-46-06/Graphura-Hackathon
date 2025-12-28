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

  // 🔥 Percentage-based distribution (frontend-only logic)
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

        {/* A. YOUR PERFORMANCE */}
        <div className="bg-[#E6F4F1] p-6 rounded-xl mb-10">
          <h3 className="font-semibold mb-4">Your Performance</h3>

          <div className="flex gap-12">
            <div>
              <p className="text-sm text-gray-500">Your Rank</p>
              <p className="text-2xl font-bold">
                {result.rank} / {result.total}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-2xl font-bold">{result.score}</p>
            </div>
          </div>
        </div>

        {/* B. RANK DISTRIBUTION */}
        <div className="mb-12">
          <h4 className="font-semibold mb-4">
            Rank Distribution
            <span className="ml-2 text-xs text-gray-500">
              (percentage based)
            </span>
          </h4>

          <BarChart width={500} height={250} data={distribution}>
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#03594E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </div>

        {/* C. LEADERBOARD */}
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

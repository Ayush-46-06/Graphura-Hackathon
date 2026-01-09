import { X, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ResultModal = ({ open, onClose, data, hackathonId, completed }) => {
  if (!open) return null;

  const chartData = [
    { name: "Top 10%", value: data.distribution.top10 },
    { name: "Top 25%", value: data.distribution.top25 },
    { name: "Others", value: data.distribution.others }
  ];

  const handleDownload = () => {
    window.open(`/api/user/certificate/${hackathonId}`, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl rounded-2xl p-6 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hackathon Result</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-6 bg-[#EAF6F4] p-4 rounded-xl mb-6">
          <div>
            <p className="text-sm text-gray-500">Your Rank</p>
            <p className="text-2xl font-bold">
              {data.rank} / {data.totalParticipants}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-2xl font-bold">{data.score}</p>
          </div>
        </div>

        {/* Chart */}
        <h3 className="font-semibold mb-3">Rank Distribution</h3>
        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#03594E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <h3 className="font-semibold mb-3">Top Performers</h3>
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Rank</th>
              <th className="text-left">Team</th>
              <th className="text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.topPerformers.map((p) => (
              <tr key={p.rank} className="border-b">
                <td className="py-2">{p.rank}</td>
                <td>{p.team}</td>
                <td className="text-right">{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Certificate */}
        {completed && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-[#03594E] text-white px-6 py-3 rounded-xl font-semibold"
          >
            <Download size={18} />
            Download Certificate
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultModal;

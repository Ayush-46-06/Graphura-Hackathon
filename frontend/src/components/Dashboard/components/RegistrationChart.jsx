import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const dataMap = {
  day: [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 200 },
    { name: "Wed", value: 150 },
  ],
  week: [
    { name: "Week 1", value: 400 },
    { name: "Week 2", value: 600 },
  ],
  month: [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1800 },
  ],
};

const RegistrationChart = () => {
  const [filter, setFilter] = useState("day");

  return (
    <div className="bg-white rounded-xl p-6 shadow">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Hackathon Registrations</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataMap[filter]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default RegistrationChart;

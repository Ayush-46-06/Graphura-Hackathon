import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Cell,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

const Graph = () => {
  const data = [
    { department: "Frontend", interns: 245, color: "#cbd5e1" },
    { department: "Backend", interns: 318, color: "#94a3b8" },
    { department: "Data Analytics", interns: 475, color: "#60a5fa" },
    { department: "Graphic Design", interns: 62, color: "#38bdf8" },
    { department: "Sales & Marketing", interns: 137, color: "#2dd4bf" },
    { department: "Content Creators", interns: 57, color: "#a78bfa" },
    { department: "Content Writers", interns: 94, color: "#f472b6" },
  ];

  const wrapText = (text, maxChars = 12) => {
    if (text.length <= maxChars) return [text];

    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + " " + word).trim().length <= maxChars) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);

    return lines.slice(0, 2); 
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl px-4 max-w-[500px]">
      <h2 className="text-lg font-bold">
        Current Interns by Department
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 20, left: 20, bottom: 60 }}
        >
          <XAxis hide />
          <YAxis hide />
          <Tooltip />

          <Bar
            dataKey="interns"
            barSize={90}
            radius={[14, 14, 0, 0]}
          >
            {/* INTERN COUNT (INSIDE TOP) */}
            <LabelList
              dataKey="interns"
              position="insideTop"
              fill="#ffffff"
              fontSize={12}
              fontWeight={700}
            />

            {/* DEPARTMENT NAME (BELOW BAR) */}
            <LabelList
              dataKey="department"
              content={({ x, y, width, height, value }) => {
                if (!value) return null;

                const lines = wrapText(value);

                return (
                  <text className="text-[8px] sm:text-[11px] md:text-[12px]"
                    x={x + width / 2}
                    y={y + height + 14}
                    textAnchor="middle"
                    fill="#000"
                    fontWeight="500"
                  >
                    {lines.map((line, index) => (
                      <tspan
                        key={index}
                        x={x + width / 2}
                        dy={index === 0 ? 0 : 12}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              }}
            />

            {data.map((item, index) => (
              <Cell key={index} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;

import { useEffect, useState } from "react";

const statsData = [
  { value: 1090, label: "Our Online Courses", icon: "/1.svg" },
  { value: 120, label: "Our Instructors", icon: "/2.svg" },
  { value: 120, label: "Total Video Lessons", icon: "/3.svg" },
  { value: 6000, label: "Total Students Enrolled", icon: "/4.svg" },
];

const StatCard = ({ value, label, index }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  

  return (
    <div
      className={`
        group relative flex items-center justify-center sm:justify-start gap-4 p-8 py-12
        border-r border-white/20 sm:last:border-none
        border-b sm:border-b-0 border-white/20 last:border-b-0
        transition-transform duration-500 ease-in-out
        ${
          index % 2 === 0
            ? "group-hover:translate-x-4"
            : "group-hover:-translate-x-4"
        }
      `}
    >
      {/* Icon */}
      <div className="text-4xl text-white/90">
        <img
          src={statsData[index].icon}
          alt=""
          className="group-hover:[transform:rotateY(360deg)] transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-4xl font-semibold text-white">
          {count}
          <span className="text-white">+</span>
        </h3>
        <p className="text-white text-sm">{label}</p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
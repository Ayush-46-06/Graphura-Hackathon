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
        group relative flex items-center gap-4
        justify-center sm:justify-start
        text-center sm:text-left
        p-6 py-8 sm:p-8 sm:py-12
        border-b sm:border-b-0
        sm:border-r border-white/20
        last:border-none
        transition-transform duration-500 ease-in-out
        ${
          index % 2 === 0
            ? "group-hover:translate-x-4"
            : "group-hover:-translate-x-4"
        }
      `}
    >
      {/* Icon */}
      <div  className="text-white/90 flex justify-center sm:justify-start">
      <img src={statsData[index].icon} alt="" className="w-8 h-8 sm:w-auto sm:h-auto group-hover:[transform:rotateY(360deg)] transition-transform duration-500 ease-in-out" />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-semibold text-white">
          {count}
          <span className="text-white">+</span>
        </h3>
        <p className="text-white text-xs sm:text-sm">{label}</p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] -green">
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

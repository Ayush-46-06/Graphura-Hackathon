import { useEffect, useState } from "react";

const Counter = ({ end, duration = 2000, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <h3 className="text-5xl font-bold text-[#F8C62F]">
      {count}
      {suffix}
    </h3>
  );
};

export default Counter;

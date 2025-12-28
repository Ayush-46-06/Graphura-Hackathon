import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const initialHackathons = [
  {
    id: 1,
    title: "CYBER SECURITY HACKATHON",
    category: "CYBER SECURITY",
    declarationTime: Date.now() + 10 * 60 * 60 * 1000,
  },
  {
    id: 2,
    title: "WEB DEVELOPMENT HACKATHON",
    category: "WEB DEVELOPMENT",
    declarationTime: Date.now() + 14 * 60 * 60 * 1000,
  },
  {
    id: 3,
    title: "AI / ML INNOVATION CHALLENGE",
    category: "AI / ML",
    declarationTime: Date.now() + 6 * 60 * 60 * 1000,
  },
  {
    id: 4,
    title: "DATA SCIENCE SPRINT",
    category: "DATA SCIENCE",
    declarationTime: Date.now() + 20 * 60 * 60 * 1000,
  },
];

const formatTime = (ms) => {
  const total = Math.max(Math.floor(ms / 1000), 0);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
};

export default function Results() {
  const [hackathons, setHackathons] = useState(initialHackathons);

  useEffect(() => {
    const interval = setInterval(() => {
      setHackathons((prev) =>
        prev.filter((h) => h.declarationTime > Date.now())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
        className="
            relative
            overflow-hidden
            py-24
            bg-[radial-gradient(circle_at_top_left,#F6FAF9,transparent_60%),radial-gradient(circle_at_bottom_right,#FFF1CC,transparent_55%),linear-gradient(90deg,#F6FAF9,#FFF7E6)]
        "
        >
  
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <span className="inline-block mb-4 text-sm bg-[#E6F4F1] text-[#03594E] px-5 py-1 rounded-full">
          Live Results
        </span>

        <h1 className="text-5xl font-bold text-[#0C121D] mb-4">
          Current Hackathon Results
        </h1>

        <p className="text-[#6C757D] max-w-xl mx-auto">
          Pending hackathons whose results are yet to be declared.
        </p>
      </div>

      {/* NAVIGATION ARROWS (OUTSIDE CARDS) */}
      <button
        className="
          results-prev
          absolute
          left-6
          top-1/2
          -translate-y-1/2
          z-20
          w-12 h-12
          rounded-full
          bg-white
          border
          shadow-md
          flex items-center justify-center
          text-2xl
          text-[#03594E]
          hover:bg-[#E6F4F1]
        "
      >
        ‹
      </button>

      <button
        className="
          results-next
          absolute
          right-6
          top-1/2
          -translate-y-1/2
          z-20
          w-12 h-12
          rounded-full
          bg-white
          border
          shadow-md
          flex items-center justify-center
          text-2xl
          text-[#03594E]
          hover:bg-[#E6F4F1]
        "
      >
        ›
      </button>

      {/* SLIDER */}
      <Swiper
        slidesPerView="auto"
        centeredSlides
        initialSlide={1} // so that 2nd card is in the center by default
        spaceBetween={40}
        navigation={{
          prevEl: ".results-prev",
          nextEl: ".results-next",
        }}
        modules={[Navigation]}
        className="max-w-7xl mx-auto px-6 pb-32 overflow-visible"
      >
        {hackathons.map((hack) => (
          <SwiperSlide key={hack.id} className="results-slide">
            <div
              className="
                relative
                bg-[#FDFEFE]
                border border-[#E6F4F1]
                rounded-2xl
                p-10
                shadow-[0_10px_30px_rgba(3,89,78,0.08)]
              "
            >
              {/* CATEGORY */}
              <span
                className="
                  absolute
                  top-6 right-6
                  text-[11px]
                  bg-[#E6F4F1]
                  text-[#03594E]
                  px-4 py-1
                  rounded-full
                  font-semibold
                  uppercase
                "
              >
                {hack.category}
              </span>

              {/* PLACEHOLDERS */}
              <div className="grid grid-cols-3 gap-6 mt-10 mb-10">
                {[
                  "First Place",
                  "Second Runner Up",
                  "Third Runner Up",
                ].map((label, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="
                        aspect-square
                        border-2 border-[#03594E]/40
                        rounded-xl
                        flex items-center justify-center
                        text-3xl font-bold
                        text-[#03594E]
                        bg-white
                      "
                    >
                      ?
                    </div>
                    <p className="mt-2 text-[10px] uppercase text-[#6C757D] font-medium">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* DATE + TIMER */}
              <div className="flex justify-between items-center text-sm text-[#6C757D] mb-6">
                <span>
                  📅{" "}
                  {new Date(
                    hack.declarationTime
                  ).toLocaleDateString()}
                </span>
                <span className="font-mono">
                  ⌛ {formatTime(hack.declarationTime - Date.now())}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-lg text-[#0C121D] leading-snug">
                {hack.title}
              </h3>

              {/* ACCENT */}
              <div className="mt-6 h-[4px] w-16 bg-[#F8C62F] rounded-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* SCALE EFFECT */}
      <style>{`
        .results-slide {
        width: 420px;
        padding: 25px 0;  
        transform: scale(0.8);
        opacity: 0.45;
        transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .swiper-slide-prev.results-slide,
        .swiper-slide-next.results-slide {
        transform: scale(0.9);
        opacity: 0.75;
        }

        .swiper-slide-active.results-slide {
        transform: scale(1.08);
        opacity: 1;
        }

      `}</style>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const formatTime = (ms) => {
  const total = Math.max(Math.floor(ms / 1000), 0);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
};

export default function Results() {
  const [hackathons, setHackathons] = useState([]);
  const [now, setNow] = useState(Date.now());


  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/hackathon"
        );

        // ✅ only ongoing hackathons
        const ongoing = res.data.data.filter(
          (hack) => hack.status === "ongoing"
        );

        setHackathons(ongoing);
      } catch (err) {
        console.error("Error fetching hackathons", err);
      }
    };

    fetchHackathons();
  }, []);

  useEffect(() => {
  const timer = setInterval(() => {
    setNow(Date.now());
  }, 1000);

  return () => clearInterval(timer);
}, []);

const visibleHackathons = hackathons.filter(
  (hack) => new Date(hack.endDate).getTime() > now
);

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12 lg:pt-16 pb-10 sm:pb-14 lg:pb-20 bg-[radial-gradient(circle_at_top_left,#F6FAF9,transparent_60%),radial-gradient(circle_at_bottom_right,#FFF1CC,transparent_55%),linear-gradient(90deg,#F6FAF9,#FFF7E6)]">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <span className="inline-block mb-3 text-xs sm:text-sm bg-[#E6F4F1] text-[#03594E] px-4 py-1.5 rounded-full">
          Live Results
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C121D] mb-3">
          Current Hackathon Results
        </h1>

        <p className="text-sm sm:text-base text-[#6C757D] max-w-xl mx-auto">
          Ongoing hackathons whose results are yet to be declared.
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative max-w-7xl mx-auto px-6">
        <button className="results-prev absolute left-2 lg:left-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white border shadow-md flex items-center justify-center text-2xl text-[#03594E]">
          ‹
        </button>

        <button className="results-next absolute right-2 lg:right-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white border shadow-md flex items-center justify-center text-2xl text-[#03594E]">
          ›
        </button>

        <Swiper
          slidesPerView="auto"
          centeredSlides
          initialSlide={1}
          spaceBetween={40}
          navigation={{
            prevEl: ".results-prev",
            nextEl: ".results-next",
          }}
          modules={[Navigation]}
          className="overflow-visible pb-20"
        >
          {visibleHackathons.map((hack) => {
            const endTime = new Date(hack.endDate).getTime();

            return (
              <SwiperSlide key={hack._id} className="results-slide">
                <div className="relative bg-[#FDFEFE] border border-[#E6F4F1] rounded-2xl p-8 shadow-[0_10px_30px_rgba(3,89,78,0.08)]">

                  {/* CATEGORY */}
                  <span className="absolute top-6 right-6 text-[11px] bg-[#E6F4F1] text-[#03594E] px-4 py-1 rounded-full font-semibold uppercase">
                    {hack.category}
                  </span>

                  {/* PLACEHOLDERS */}
                  <div className="grid grid-cols-3 gap-6 mt-10 mb-10">
                    {["First", "Second", "Third"].map((label, i) => (
                      <div key={i} className="text-center">
                        <div className="aspect-square border-2 border-[#03594E]/40 rounded-xl flex items-center justify-center text-3xl font-bold text-[#03594E]">
                          ?
                        </div>
                        <p className="mt-2 text-[10px] uppercase text-[#6C757D]">
                          {label} Place
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* DATE + TIMER */}
                  <div className="flex justify-between items-center text-sm text-[#6C757D] mb-6">
                    <span>
                      📅 {new Date(hack.endDate).toLocaleDateString()}
                    </span>
                    <span className="font-mono">
                      ⌛ {formatTime(endTime - now)}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="font-semibold text-lg text-[#0C121D]">
                    {hack.title}
                  </h3>

                  <div className="mt-6 h-[4px] w-16 bg-[#F8C62F] rounded-full" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* SCALE EFFECT */}
      <style>{`
        .results-slide {
          width: 400px;
          padding: 25px 0;
          transform: scale(0.8);
          opacity: 0.45;
          transition: all 0.4s ease;
        }
        .swiper-slide-active.results-slide {
          transform: scale(1.08);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

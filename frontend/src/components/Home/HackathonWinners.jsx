import React from "react";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";

const initialHackathons = [
  {
    id: 1,
    title: "CYBER SECURITY HACKATHON",
    category: "CYBER SECURITY",
    color: "#03594E",
  },
  {
    id: 2,
    title: "WEB DEVELOPMENT HACKATHON",
    category: "WEB DEVELOPMENT",
    color: "#2563EB",
  },
  {
    id: 3,
    title: "AI / ML INNOVATION CHALLENGE",
    category: "AI / ML",
    color: "#7C3AED",
  },
  {
    id: 4,
    title: "DATA SCIENCE SPRINT",
    category: "DATA SCIENCE",
    color: "#DC2626",
  },
];

const POSITIONS = ["1st Place", "2nd Place", "3rd Place"];
const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

export default function Results() {
  const swiperRef = React.useRef(null);

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css";
    document.head.appendChild(link);

    script.onload = () => {
      if (window.Swiper && swiperRef.current) {
        new window.Swiper(swiperRef.current, {
          slidesPerView: 1,
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-12 md:py-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* HEADER */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm bg-emerald-50 text-emerald-700 px-4 md:px-5 py-2 rounded-full border border-emerald-200 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Live Results
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
          Hackathon Winner Section
        </h1>

        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg px-4">
        Meet the Champions: Celebrating the Winners of Our Latest Hackathons
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button className="swiper-button-next-custom absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div ref={swiperRef} className="swiper pb-16">
          <div className="swiper-wrapper">
            {initialHackathons.map((hack) => (
              <div
                key={hack.id}
                className="swiper-slide"
                style={{ height: "auto" }}
              >
                <div className="bg-white border-2 border-slate-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden h-full flex flex-col">
                  {/* Gradient Accent at Top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 md:h-2 rounded-t-2xl md:rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, ${hack.color}, ${hack.color}dd)`,
                    }}
                  />

                  {/* CATEGORY BADGE */}
                  <div className="flex justify-start items-start mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 md:gap-2 text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full uppercase tracking-wide shadow-sm"
                      style={{
                        backgroundColor: `${hack.color}15`,
                        color: hack.color,
                        border: `2px solid ${hack.color}30`,
                      }}
                    >
                      <Trophy className="w-3 h-3" />
                      {hack.category}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="font-bold text-xl md:text-2xl text-slate-900 leading-tight mb-6 md:mb-8 min-h-[3.5rem] flex items-center">
                    {hack.title}
                  </h3>

                  {/* PLACEHOLDERS */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4 flex-grow">
                    {POSITIONS.map((label, i) => (
                      <div key={i} className="text-center group">
                        <div className="relative">
                          <div
                            className="aspect-square border-3 md:border-4 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold bg-gradient-to-br from-slate-50 to-white shadow-md transition-transform duration-300 group-hover:scale-105"
                            style={{
                              borderColor: MEDAL_COLORS[i],
                              color: MEDAL_COLORS[i],
                            }}
                          >
                            ?
                          </div>
                          <div
                            className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                            style={{ backgroundColor: MEDAL_COLORS[i] }}
                          >
                            {i + 1}
                          </div>
                        </div>
                        <p className="mt-2 md:mt-3 text-[10px] md:text-xs uppercase text-slate-600 font-semibold tracking-wide">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="swiper-pagination mt-8"></div>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #CBD5E1;
          opacity: 1;
          transition: all 0.3s;
        }
        
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #03594E;
        }
        
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          transform: scale(1.1);
        }
        
        .swiper-button-prev-custom:active,
        .swiper-button-next-custom:active {
          transform: scale(0.95);
        }
      `}</style>
    </section>
  );
}
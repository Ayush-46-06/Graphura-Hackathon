import { useState, useEffect, useRef } from "react";
import ResultModal from "./ResultModal";

export default function PastResults({ pastHackathons }) {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll into view animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-15 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1AB69D]/25 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#F8C62F]/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* HEADER */}
      <div
        className={`relative max-w-7xl mx-auto px-6 text-center mb-14 z-10
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <span className="inline-block mb-4 text-sm bg-white/10 backdrop-blur-md text-[#F8C62F] px-6 py-1 rounded-full border border-white/20">
          Results Declared
        </span>

        <h2 className="text-4xl font-bold text-white mb-4">
          Past Hackathon Results
        </h2>

        <p className="text-white/80 max-w-xl mx-auto">
          Celebrating teams who stood out and made their mark.
        </p>
      </div>

      {/* GRID */}
      <div className="relative max-w-7xl mx-auto px-2 grid grid-cols-1 lg:grid-cols-3 gap-10 z-10">
        {pastHackathons.map((hack, index) => (
          <div
            key={hack.id}
            style={{ transitionDelay: `${index * 120}ms` }}
            className={`
              group relative rounded-2xl p-8
              bg-white/95 backdrop-blur-xl
              border border-white/30
              shadow-[0_20px_50px_rgba(3,89,78,0.35)]
              transition-all duration-700 ease-out
              hover:-translate-y-3
              hover:shadow-[0_30px_70px_rgba(3,89,78,0.55)]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
            `}
          >
            {/* CATEGORY */}
            <span className="absolute top-6 right-6 text-[11px] bg-[#E6F4F1] text-[#03594E] px-4 py-1 rounded-full font-semibold uppercase">
              {hack.category}
            </span>

            {/* PODIUM */}
            <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
              {[1, 0, 2].map((i) => (
                <div key={i} className="text-center">
                  <div
                    className={`
                      aspect-square
                      rounded-xl
                      overflow-hidden
                      bg-white
                      transition-all duration-300
                      group-hover:scale-[1.03]
                      ${i === 0 ? "border-2 border-[#F8C62F]" : "border border-[#DDEAE7]"}
                    `}
                  >
                    <img
                      src={hack.winners[i]}
                      alt="Winner"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="mt-3 text-[10px] uppercase tracking-wide text-[#6C757D] font-medium">
                    {i === 0 ? "Winner" : i === 1 ? "2nd Runner Up" : "3rd Runner Up"}
                  </p>
                </div>
              ))}
            </div>


            {/* META */}
            <div className="flex justify-between items-center text-sm text-[#6C757D] mb-6">
              <span>📅 {hack.date}</span>
              <span className="px-3 py-1 text-[10px] rounded-full bg-[#E6F4F1] text-[#03594E] font-semibold uppercase">
                Declared
              </span>
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-lg text-[#0C121D] leading-snug">
              {hack.title}
            </h3>

            {/* ACCENT */}
            <div className="mt-6 h-[4px] w-16 bg-[#F8C62F] rounded-full group-hover:w-32 transition-all duration-500" />

            {/* ACTION */}
            <button
              onClick={() => setSelectedHackathon(hack)}
              className="mt-8 px-6 py-2 text-[11px] font-bold tracking-widest rounded-full border text-[#03594E] hover:bg-[#03594E] hover:text-white transition-all"
            >
              SHOW RESULT
            </button>
          </div>
        ))}
      </div>

      {/* SVG Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none">
          <path
            d="M0,50 C360,100 720,0 1080,50 C1200,65 1320,80 1440,80 L1440,100 L0,100 Z"
            fill="white"
            fillOpacity="0.1"
          />
          <path
            d="M0,70 C360,30 720,90 1080,60 C1200,50 1320,40 1440,50 L1440,100 L0,100 Z"
            fill="white"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      {/* RESULT MODAL */}
      {selectedHackathon && (
        <ResultModal
          hackathon={selectedHackathon}
          onClose={() => setSelectedHackathon(null)}
        />
      )}
    </section>
  );
}


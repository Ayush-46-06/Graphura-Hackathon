import { useState, useEffect, useRef } from "react";
import ResultModal from "./ResultModal";

export default function PastResults({ pastHackathons }) {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // ✅ Filter ONLY completed + limit to 3
  const completedHackathons = pastHackathons
    .filter(hack => hack.status === "completed")
    .slice(0, 3);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
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
      className="relative overflow-hidden py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1AB69D]/25 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#F8C62F]/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <div
        className={`relative max-w-7xl mx-auto px-6 text-center mb-10 z-10 transition-all duration-700
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <span className="inline-block mb-4 text-sm bg-white/10 backdrop-blur-md text-[#F8C62F] px-6 py-1 rounded-full border border-white/20">
          Results Declared
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
          Past Hackathon Results
        </h2>

        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          Celebrating teams who stood out and made their mark.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative max-w-7xl mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
        {completedHackathons.map((hack, index) => (
          <div
            key={hack._id}
            style={{ transitionDelay: `${index * 120}ms` }}
            className={`group relative rounded-2xl p-4 bg-white/95 backdrop-blur-xl
              border border-white/30
              shadow-[0_20px_50px_rgba(3,89,78,0.35)]
              transition-all duration-700
              hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(3,89,78,0.55)]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
            `}
          >
            {/* Category */}
            <span className="absolute top-5 right-5 text-[11px] bg-[#E6F4F1] text-[#03594E] px-4 py-1 rounded-full font-semibold uppercase">
              {hack.category}
            </span>

            {/* Winners Podium */}
            <div className="grid grid-cols-3 gap-3 pt-10 mt-4 mb-5">
              {[1, 2, 3].map(rank => {
                const winner = hack.winnerDetails?.find(w => w.rank === rank);

                return (
                  <div key={rank} className="text-center">
                    <div
                      className={`aspect-square max-w-[90px] mx-auto rounded-lg overflow-hidden bg-white
                        transition-all duration-300 group-hover:scale-105
                        ${rank === 1 ? "border-2 border-[#F8C62F]" : "border border-[#DDEAE7]"}
                      `}
                    >
                      <img
                        src={winner?.user?.image || "/default-avatar.png"}
                        alt={winner?.user?.name || "Winner"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="mt-2 text-[10px] uppercase tracking-wide text-[#6C757D] font-medium">
                      {rank === 1 ? "Winner" : rank === 2 ? "2nd Place" : "3rd Place"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Meta */}
            <div className="flex justify-between items-center text-xs text-[#6C757D] mb-4">
              <span>📅 {new Date(hack.endDate).toDateString()}</span>
              <span className="px-3 py-1 text-[10px] rounded-full bg-[#E6F4F1] text-[#03594E] font-semibold uppercase">
                Declared
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-base sm:text-lg text-[#0C121D] leading-snug">
              {hack.title}
            </h3>

            {/* Accent */}
            <div className="mt-4 h-[4px] w-16 bg-[#F8C62F] rounded-full group-hover:w-32 transition-all duration-500" />

            {/* Action */}
            <button
              onClick={() => setSelectedHackathon(hack)}
              className="mt-5 px-5 py-1.5 text-[11px] font-bold tracking-widest rounded-full border
                text-[#03594E] hover:bg-[#03594E] hover:text-white transition-all"
            >
              SHOW RESULT
            </button>
          </div>
        ))}
      </div>

      {/* Result Modal */}
      {selectedHackathon && (
        <ResultModal
          hackathon={selectedHackathon}
          onClose={() => setSelectedHackathon(null)}
        />
      )}
    </section>
  );
}

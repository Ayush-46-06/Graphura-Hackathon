import React from "react";

const PartnerSection = () => {
  const partners = [
   "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700392/Hindustan_times_slsorl",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700392/Deewal_aa6obw",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700378/Accenture_bfsucq",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700378/Bajaj_sgqhky",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700377/TheAstroTalk_ztw8sq",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700377/Leans_Kart_tbzjbu",
  ];

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6 border border-green-200">
            Our Partner
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight px-4">
            The trusted market leader in talent
            <br className="hidden sm:block" />
            transformation through{" "}
            <span className="relative inline-block">
              <span className="relative z-10">education</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 -rotate-1 -z-0"></span>
            </span>
          </h2>
        </div>

        {/* Partner Slider */}
        <div className="relative overflow-hidden">
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 40s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex animate-scroll">
            {duplicatedPartners.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-10 flex items-center justify-center min-w-[300px]"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="max-w-full h-auto max-h-24 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
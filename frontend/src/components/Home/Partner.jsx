import React from "react";

const PartnerSection = () => {
  const partners = [
    {
      id: 1,
      name: "Gardenbook",
      logo: "https://via.placeholder.com/150x80/4299e1/ffffff?text=Gardenbook",
    },
    {
      id: 2,
      name: "Education",
      logo: "https://via.placeholder.com/150x80/10b981/ffffff?text=Education",
    },
    {
      id: 3,
      name: "Penbook",
      logo: "https://via.placeholder.com/150x80/8b5cf6/ffffff?text=Penbook",
    },
    {
      id: 4,
      name: "Eduhouse",
      logo: "https://via.placeholder.com/150x80/f59e0b/ffffff?text=Eduhouse",
    },
    {
      id: 5,
      name: "Book Library",
      logo: "https://via.placeholder.com/150x80/ec4899/ffffff?text=Book+Library",
    },
    {
      id: 6,
      name: "Owlbook",
      logo: "https://via.placeholder.com/150x80/6366f1/ffffff?text=Owlbook",
    },
  ];

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

        {/* Partner Grid - 3 cards per row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl p-10 flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 min-h-[180px] group cursor-pointer"
            >
              <div className="transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full h-auto max-h-24 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
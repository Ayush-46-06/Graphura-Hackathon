import React, { useEffect, useState } from "react";

const HomeHackathonSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const filterList = [
    "All",
    "Coding",
    "Design",
    "AI/ML",
    "Blockchain",
    "Web Development",
    "Mobile Apps",
  ];

  // Fetch hackathons
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/hackathon");
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.log("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  // Filter data by category
  const filteredData = data.filter((item) => {
    return active === "All" || item.category === active;
  });

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [active]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Responsive items to show
  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredData.length - itemsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Loading hackathons...</p>
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 px-2">
            Explore <span className="text-[#03594E]">Live Hackathons</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Join competitions and build amazing projects
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 md:mb-8 overflow-x-auto scrollbar-hide -mx-3 sm:mx-0">
          <div className="flex md:justify-center px-3 sm:px-0">
            <div className="inline-flex gap-2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg">
              {filterList.map((val) => (
                <button
                  key={val}
                  onClick={() => setActive(val)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm ${
                    active === val
                      ? "bg-[#03594E] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Container */}
        {filteredData.length > 0 ? (
          <div className="relative">
            {/* Navigation Buttons - Hidden on mobile */}
            {filteredData.length > itemsToShow && (
              <>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6 text-[#03594E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6 text-[#03594E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Cards Grid with Slider */}
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out gap-3 sm:gap-4 md:gap-6"
                style={{
                  transform: `translateX(-${
                    currentIndex *
                    (100 / itemsToShow +
                      (itemsToShow === 1 ? 3 : itemsToShow === 2 ? 2 : 2))
                  }%)`,
                }}
              >
                {filteredData.map((val) => (
                  <a
                    href={`/hackathons/${val._id}`}
                    key={val._id}
                    className="flex-shrink-0 w-[calc(100%-12px)] sm:w-[calc(100%-16px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    <div className="group relative rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-300 bg-white h-full">
                      {/* Image */}
                      <div className="overflow-hidden h-40 sm:h-44 md:h-48">
                        <img
                          src={val.image}
                          alt={val.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          {val.tags?.slice(0, 2).map((tag, index) => (
                            <span
                              key={tag}
                              className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full border ${
                                index % 3 === 0
                                  ? "bg-green-50 text-green-700 border-green-300"
                                  : index % 3 === 1
                                  ? "bg-blue-50 text-blue-700 border-blue-300"
                                  : "bg-purple-50 text-purple-700 border-purple-300"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 truncate group-hover:text-[#03594E] transition">
                          {val.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                          {val.description}
                        </p>

                        {/* Stats */}
                        <div className="border-t border-gray-200 pt-2.5 sm:pt-3 flex justify-between gap-2">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="bg-green-100 rounded-lg p-1.5 sm:p-2">
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                Participants
                              </p>
                              <p className="text-xs sm:text-sm font-semibold text-green-600">
                                {val.participants?.length || 0}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="bg-blue-100 rounded-lg p-1.5 sm:p-2">
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                {val.status === "upcoming" ? "Starts" : "Ends"}
                              </p>
                              <p className="text-xs sm:text-sm font-semibold text-blue-600">
                                {formatDate(
                                  val.status === "upcoming"
                                    ? val.startDate
                                    : val.endDate
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Free Badge */}
                      <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#2c572f] text-[#39ff14] font-semibold text-[10px] sm:text-xs py-0.5 sm:py-1 px-2 sm:px-3 rounded-full border border-[#39ff14] shadow-[0_0_8px_#39ff14]">
                        Free
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            {filteredData.length > itemsToShow && (
              <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      currentIndex === index
                        ? "bg-[#03594E] w-4 sm:w-6"
                        : "bg-gray-300 w-1.5 sm:w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg px-4">
              No hackathons found for this category
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-6 sm:mt-8">
          <a
            href="/hackathons"
            className="inline-block bg-[#03594E] text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-[#024a3f] transition shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            View All Hackathons →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeHackathonSlider;
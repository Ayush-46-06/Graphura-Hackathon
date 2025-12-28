import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TABS = ["All", "Trending", "Popularity", "Featured"];

const HomeHackathonSection = () => {
  const [activeTab, setActiveTab] = useState("Featured");
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/hackathon");
        setHackathons(res.data.data || []);
      } catch (error) {
        console.error("Hackathon fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  // TAB FILTER LOGIC
  const filteredHackathons = useMemo(() => {
    if (activeTab === "All") {
      return hackathons;
    }

    if (activeTab === "Trending") {
      return hackathons.filter((h) => h.isTrending === true);
    }

    if (activeTab === "Featured") {
      return hackathons.filter((h) => h.isFeatured === true);
    }

    if (activeTab === "Popularity") {
      return [...hackathons].sort(
        (a, b) => b.participants.length - a.participants.length
      );
    }

    return hackathons;
  }, [activeTab, hackathons]);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">Loading hackathons…</p>
    );
  }

  return (
    <section className="py-20 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== SECTION TABS ===== */}
        <div className="flex justify-center gap-10 mb-16">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium relative transition-colors ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* ===== CARDS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredHackathons.map((val) => (
            <Link to={`/hackathons/${val._id}`} key={val._id}>
              <div className="bg-white rounded-[22px] shadow-md hover:shadow-xl transition overflow-hidden">
                {/* IMAGE */}
                <div className="relative h-[220px]">
                  <img
                    src={val.image}
                    alt={val.title}
                    className="w-full h-full object-cover"
                  />

                  {/* CATEGORY BADGE */}
                  <span className="absolute top-4 left-4 bg-[#03594E] text-white text-sm px-4 py-1 rounded-full">
                    {val.category || "Technology"}
                  </span>

                  {/* BOOKMARK */}
                  <span className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow">
                    🔖
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* AUTHOR */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="author"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-500">Graphura Team</span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-bold leading-snug mb-2 line-clamp-2">
                    {val.title}
                  </h3>

                  {/* RATING */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-sm text-gray-500">
                      (4.7/5 Rating)
                    </span>
                  </div>

                  <hr />

                  {/* META */}
                  <div className="flex justify-between text-sm text-gray-500 mt-4">
                    <span>
                      📅{" "}
                      {val.startDate
                        ? new Date(val.startDate).toLocaleDateString()
                        : "TBA"}
                    </span>
                    <span>👥 {val.participants.length} Students</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* EMPTY STATE */}
          {filteredHackathons.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No hackathons found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHackathonSection;

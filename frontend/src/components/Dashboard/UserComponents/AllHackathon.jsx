import { useEffect, useState } from "react";
import axios from "axios";
import HackathonViewModal from "./HackathonViewModal";
import { Users, Calendar, Award, Tag, Search, Filter, X, ChevronDown } from "lucide-react";

const API_URL = "http://localhost:5001/api/hackathon";

const ExploreEvents = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  // Search & Filter
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique categories and tags
  const categories = ["all", ...new Set(hackathons.map(h => h.category).filter(Boolean))];
  const allTags = [...new Set(hackathons.flatMap(h => h.tags || []))];

  const fetchHackathons = async () => {
    try {
      // Add ?limit=1000 to get all hackathons (or remove pagination from backend)
      const res = await axios.get(`${API_URL}?limit=1000`);
      setHackathons(res.data.data);
    } catch {
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  // Filter logic
  const filteredHackathons = hackathons.filter((h) => {
    const matchesSearch = 
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.description?.toLowerCase().includes(search.toLowerCase()) ||
      h.category?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === "all" || h.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || h.status === selectedStatus;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => h.tags?.includes(tag));

    return matchesSearch && matchesCategory && matchesStatus && matchesTags;
  });

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedTags([]);
    setSearch("");
  };

  const activeFiltersCount = 
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedStatus !== "all" ? 1 : 0) +
    selectedTags.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F9]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#03594E]" />
          <p className="mt-4 text-gray-500">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#F5F7F9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#0C121D] mb-2">
            Explore Events
          </h1>
          <p className="text-gray-500">
            Discover {hackathons.length} upcoming hackathons & competitions
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, category, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#03594E] focus:border-transparent transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-md relative"
              style={{ 
                backgroundColor: showFilters ? "#03594E" : "#fff",
                color: showFilters ? "#fff" : "#03594E",
                border: showFilters ? "none" : "2px solid #03594E"
              }}
            >
              <Filter size={20} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown 
                size={18} 
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-[#03594E] text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat === "all" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {["all", "upcoming", "ongoing", "completed"].map(status => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedStatus === status
                          ? "bg-[#03594E] text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              {allTags.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                          selectedTags.includes(tag)
                            ? "bg-yellow-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Tag size={12} />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-bold text-[#03594E]">{filteredHackathons.length}</span> of {hackathons.length} events
          </p>
          {activeFiltersCount > 0 && (
            <p className="text-sm text-gray-500">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
            </p>
          )}
        </div>

        {/* Event List */}
        {filteredHackathons.length > 0 ? (
          <div className="space-y-6">
            {filteredHackathons.map((h) => (
              <div
                key={h._id}
                className="rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={h.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400"}
                      alt={h.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400";
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className="px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg"
                        style={{
                          backgroundColor:
                            h.status === "upcoming"
                              ? "#E3F2FD"
                              : h.status === "ongoing"
                              ? "#E8F5E9"
                              : "#F5F7F9",
                          color:
                            h.status === "upcoming"
                              ? "#1976D2"
                              : h.status === "ongoing"
                              ? "#1AB69D"
                              : "#6C757D",
                        }}
                      >
                        {h.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2 text-[#0C121D]">
                        {h.title}
                      </h3>
                      {/* <div className="flex items-center gap-2 mb-3">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="text-xl font-bold text-yellow-500">
                          ₹{h.prizePool?.toLocaleString() || "0"}
                        </span>
                      </div> */}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {h.description}
                      </p>
                    </div>

                    {/* Category & Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {h.category && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "#E3F2FD", color: "#1976D2" }}
                        >
                          {h.category}
                        </span>
                      )}
                      {h.tags?.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs flex items-center gap-1"
                          style={{ backgroundColor: "#F5F7F9", color: "#6C757D" }}
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Dates & Participants */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                      <div>
                        <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Start Date
                        </p>
                        <p className="font-semibold text-sm mt-1">
                          {new Date(h.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          End Date
                        </p>
                        <p className="font-semibold text-sm mt-1">
                          {new Date(h.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-orange-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Last Enrollment
                        </p>
                        <p className="font-semibold text-sm mt-1 text-orange-500">
                          {new Date(h.lastEnrollmentDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Participants
                        </p>
                        <p className="font-semibold text-sm mt-1 text-[#03594E]">
                          {h.participants?.length || 0} Registered
                        </p>
                      </div>
                    </div>

                    {/* View Button */}
                    <button
                      onClick={() => {
                        setSelectedId(h._id);
                        setOpen(true);
                      }}
                      className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:scale-105"
                      style={{ backgroundColor: "#03594E", color: "#fff" }}
                    >
                      View Details & Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[#03594E] text-white rounded-lg font-semibold hover:opacity-90"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* View Modal */}
        {open && (
          <HackathonViewModal
            hackathonId={selectedId}
            onClose={() => {
              setOpen(false);
              setSelectedId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;
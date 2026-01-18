import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Calendar, Tag, Search, Grid, List, Loader2, BookOpen, TrendingUp, Clock, ImageIcon } from "lucide-react";
import AddEditBlogModal from "./AddEditBlogModal";

const API_URL = "http://localhost:5001/api/blog";
const token = localStorage.getItem("token");

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  /* ================= FETCH BLOG LIST ================= */
  const fetchBlogs = async () => {
    setLoading(true);
    const res = await axios.get(API_URL);
    setBlogs(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ================= EDIT HANDLER (🔥 IMPORTANT) ================= */
  const handleEdit = async (blogId) => {
    try {
      const res = await axios.get(`${API_URL}/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSelectedBlog(res.data.data); // ✅ FULL BLOG WITH SECTIONS
      setModalOpen(true);
    } catch (error) {
      alert("Failed to load blog");
    }
  };
/* ================= DELETE HANDLER ================= */
const handleDelete = async (blogId) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  try {
    await axios.delete(`${API_URL}/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Refresh list after delete
    fetchBlogs();
  } catch (error) {
    alert("Failed to delete blog");
  }
};

  /* ================= CREATE ================= */
  const handleCreate = () => {
    setSelectedBlog(null);
    setModalOpen(true);
  };

  /* ================= FILTERS ================= */
  const categories = ["all", ...new Set(blogs.map(b => b.category).filter(Boolean))];
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /* ================= STATS ================= */
  const stats = [
    { label: "Total Blogs", value: blogs.length, icon: BookOpen, color: "green" },
    { label: "Categories", value: categories.length - 1, icon: Tag, color: "purple" },
    // { label: "Published", value: blogs.filter(b => b.status === "published").length, icon: TrendingUp, color: "green" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <BookOpen className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] bg-clip-text text-transparent">
                  Blog Management
                </h1>
                <p className="text-gray-600 mt-1">Create, edit and manage your blog content</p>
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] text-white rounded-xl hover:shadow-xl hover:shadow-indigo-300 transition-all duration-300 font-semibold group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              Create New Blog
            </button>
          </div>

          {/* ================= STATS CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: "from-blue-500 to-blue-600 shadow-blue-200",
                purple: "from-purple-500 to-purple-600 shadow-purple-200",
                green: "from-green-500 to-green-600 shadow-green-200"
              };
              
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[stat.color]} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white" size={26} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= SEARCH & FILTERS ================= */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blogs by title or category..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white cursor-pointer min-w-[160px]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                  >
                    <Grid size={20} className={viewMode === "grid" ? "text-green-800" : "text-gray-600"} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                  >
                    <List size={20} className={viewMode === "list" ? "text-green-800" : "text-gray-600"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LOADING STATE ================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-green-800 animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-gray-400" size={36} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedCategory !== "all" 
                ? "Try adjusting your filters" 
                : "Get started by creating your first blog post"}
            </p>
            {!searchQuery && selectedCategory === "all" && (
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                <Plus size={20} />
                Create First Blog
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ================= GRID VIEW ================= */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <div 
                    key={blog._id} 
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="text-gray-300" size={48} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {blog.category && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-green-800">
                            <Tag size={12} />
                            {blog.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-green-800 transition-colors">
                        {blog.title}
                      </h3>
                      
                      {blog.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {blog.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        {blog.createdAt && (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        )}
                        {blog.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {blog.readTime} min read
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(blog._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 font-medium text-sm"
                        >
                          <Edit2 size={14} />
                          Edit Blog
                        </button>
                        <button
    onClick={() => handleDelete(blog._id)}
    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium text-sm"
  >
    Delete
  </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ================= LIST VIEW ================= */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {filteredBlogs.map((blog) => (
                  <div 
                    key={blog._id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex gap-5">
                      <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="text-gray-300" size={32} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-green-800 transition-colors">
                              {blog.title}
                            </h3>
                            {blog.category && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-green-800 rounded-full text-xs font-semibold">
                                <Tag size={10} />
                                {blog.category}
                              </span>
                            )}
                          </div>
                            <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(blog._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] text-white rounded-lg hover:shadow-lg hover:shadow-indigo-200 transition-all font-medium text-sm"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button
    onClick={() => handleDelete(blog._id)}
    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm"
  >
    Delete
  </button>
                          </div>
                        </div>

                        {blog.description && (
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {blog.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {blog.createdAt && (
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          )}
                          {blog.readTime && (
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              {blog.readTime} min read
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ================= RESULTS COUNT ================= */}
            <div className="mt-8 text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-indigo-600">{filteredBlogs.length}</span> of <span className="font-semibold text-gray-900">{blogs.length}</span> blogs
              </p>
            </div>
          </>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <AddEditBlogModal
          key={selectedBlog?._id || "create"} // 🔥 forces remount
          blog={selectedBlog}
          onClose={() => setModalOpen(false)}
          onSuccess={fetchBlogs}
        />
      )}
    </div>
  );
};

export default Blogs;
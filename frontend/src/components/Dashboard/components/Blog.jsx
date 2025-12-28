import { useEffect, useState } from "react";
import axios from "axios";
import AddEditBlogModal from "./AddEditBlogModal";

const API_URL = "http://localhost:5001/api/blog"; 
const token = localStorage.getItem("token");

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data.data);
    } catch {
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7F9' }}>
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" 
               style={{ borderColor: '#03594E', borderTopColor: 'transparent' }}></div>
          <p className="mt-4 text-lg" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-heading)' }}>
            Loading blogs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7F9' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2" 
                  style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}>
                Blogs
              </h1>
              <p className="text-base" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                Create and manage your blog posts
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedBlog(null);
                setShowModal(true);
              }}
              className="px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ 
                backgroundColor: '#03594E', 
                color: '#ffffff',
                fontFamily: 'var(--it-ff-heading)'
              }}
            >
              <span className="mr-2">+</span>
              Add Blog
            </button>
          </div>
        </div>

        {/* Blog List */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* Card Header with Image Placeholder */}
                <div 
                  className="h-48 flex items-center justify-center relative"
                  style={{ 
                    backgroundColor: '#F0F4F5',
                    backgroundImage: blog.image ? `url(${blog.image})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!blog.image && (
                    <svg 
                      className="w-16 h-16" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="#D9D9D9"
                      strokeWidth={1.5}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
                      />
                    </svg>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: blog.publishedAt ? '#E8F5E9' : '#FFF8F4',
                        color: blog.publishedAt ? '#1AB69D' : '#F8C62F'
                      }}
                    >
                      {blog.publishedAt ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="mb-3">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: '#F0F4F5', 
                        color: '#03594E',
                        fontFamily: 'var(--it-ff-body)'
                      }}
                    >
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg font-bold mb-3 line-clamp-2 min-h-[3.5rem]" 
                    style={{ 
                      color: '#0C121D', 
                      fontFamily: 'var(--it-ff-heading)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {blog.title}
                  </h3>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4" style={{ color: '#6C757D' }}>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <span className="text-sm" style={{ fontFamily: 'var(--it-ff-body)' }}>
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : "Not published yet"}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t mb-4" style={{ borderColor: '#F0F4F5' }}></div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setShowModal(true);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
                      style={{ 
                        backgroundColor: '#F0F4F5', 
                        color: '#03594E',
                        fontFamily: 'var(--it-ff-heading)'
                      }}
                    >
                      <svg 
                        className="w-4 h-4 inline mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="px-4 py-2 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
                      style={{ 
                        backgroundColor: '#FEE2E2', 
                        color: '#DC2626',
                        fontFamily: 'var(--it-ff-heading)'
                      }}
                    >
                      <svg 
                        className="w-4 h-4 inline" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl" style={{ backgroundColor: '#ffffff' }}>
            <div className="mb-4">
              <svg 
                className="mx-auto h-24 w-24" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="#D9D9D9"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" 
                style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}>
              No Blogs Yet
            </h3>
            <p className="mb-6" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
              Start sharing your thoughts and ideas with the world
            </p>
            <button
              onClick={() => {
                setSelectedBlog(null);
                setShowModal(true);
              }}
              className="px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ 
                backgroundColor: '#03594E', 
                color: '#ffffff',
                fontFamily: 'var(--it-ff-heading)'
              }}
            >
              <span className="mr-2">+</span>
              Create Blog
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <AddEditBlogModal
            blog={selectedBlog}
            onClose={() => setShowModal(false)}
            onSuccess={fetchBlogs}
          />
        )}
      </div>
    </div>
  );
};

export default Blogs;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// HERO ASSETS
import heroImg from "../../assets/blogs/blog-hero.png";
import circleImg from "../../assets/blogs/breadcrumb-circle.png";
import Footer from "../Footer";
import Navbar from "../Navbar";
import GraphuraBlogSEO from "../SEO/GraphuraBlogSEO";

const BLOGS_PER_PAGE = 9;
const API_URL = "http://localhost:5001/api/blog";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#f8fafb]">
      <GraphuraBlogSEO />
      <Navbar />
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden min-h-[70vh] bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
        <div className="container mx-auto px-4 pt-32 pb-28 md:pt-36">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* LEFT */}
            <div className="relative z-10 text-center md:text-left max-w-xl">
              {/* <img
                src={brushImg}
                alt=""
                className="hidden md:block absolute w-full h-5 left-0 top-10"
              /> */}

              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-[#e0e0e0]">
                Graphura Hackathon
                <br />
                <span className="text-yellow-400">Blogs</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#d4d4d4]">
                Drop in. Team up. Build fast. Outplay the competition. A
                survival-of-the-smartest hackathon where only the top creators
                claim victory.
              </p>

              {/* <img
                src={dotsImg}
                alt=""
                className="hidden md:block absolute -left-20 bottom-40"
              /> */}
            </div>

            {/* RIGHT */}
            <div className="relative flex justify-center md:justify-start">
              <img
                src={circleImg}
                alt=""
                className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-[480px]"
              />

              <img
                src={heroImg}
                alt="Blog Hero"
                className="relative z-10 w-full max-w-[460px] rounded-md shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLOG GRID ================= */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={
                        blog.image ||
                        "https://via.placeholder.com/600x400?text=No+Image"
                      }
                      alt={blog.title}
                      className="w-full h-56 object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-[#03594E] text-white text-sm px-4 py-1 rounded-md">
                      {blog.category || "General"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-3">
                      📅{" "}
                      {blog.createdAt
                        ? new Date(blog.createdAt).toDateString()
                        : "Date not available"}
                    </div>

                    <h3 className="text-lg font-semibold mb-4 text-[#0C121D]">
                      {blog.title}
                    </h3>

                    {/* SEND USER TO /blog */}
                    <Link to={`/blog/${blog._id}`}>
                      <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all text-[#03594E]">
                        More Details <span>→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16">
                <div className="flex items-center gap-3">
                  {/* Prev */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-lg border disabled:opacity-40"
                  >
                    ←
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === page
                            ? "bg-[#03594E] text-white"
                            : "border"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-lg bg-[#03594E] text-white disabled:opacity-40"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default AllBlog;
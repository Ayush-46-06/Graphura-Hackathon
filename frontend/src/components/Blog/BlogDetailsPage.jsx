import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";

/* ================= STATIC SIDEBAR DATA (UNCHANGED) ================= */

const categories = [
  { name: "Education", count: 7 },
  { name: "Business", count: 6 },
  { name: "Technology", count: 5 },
  { name: "Design", count: 4 },
  { name: "Innovation", count: 8 },
];

const latestBlogs = [
  {
    id: 1,
    title: "Future of AI in Hackathons",
    date: "02 June 2025",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
  },
  {
    id: 2,
    title: "How Hackathons Shape Careers",
    date: "05 June 2025",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    id: 3,
    title: "Design Thinking for Developers",
    date: "10 June 2025",
    image: "https://images.unsplash.com/photo-1559028012-dc68a7a8b1b3",
  },
];

/* ================= API ================= */

const API_URL = "/api/blog";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BLOG + SIMILAR ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch current blog
        const blogRes = await axios.get(`${API_URL}/${id}`);
        const currentBlog = blogRes.data.data;
        setBlog(currentBlog);

        // 2. Fetch all blogs
        const allRes = await axios.get(API_URL);
        const allBlogs = allRes.data.data || [];

        // 3. Filter similar blogs
        const filtered = allBlogs
          .filter(
            (b) =>
              b._id !== currentBlog._id && b.category === currentBlog.category
          )
          .slice(0, 3);

        setSimilarBlogs(filtered);
      } catch (err) {
        console.error("Failed to fetch blog data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleShare = (platform) => {
    const url = window.location.href;

    // 1️⃣ Copy link
    navigator.clipboard.writeText(url);

    // 2️⃣ Show alert first
    alert("Link copied!");

    let shareUrl = "";

    if (platform === "facebook") {
      shareUrl = "https://www.facebook.com";
    }

    if (platform === "twitter") {
      shareUrl = "https://twitter.com";
    }

    if (platform === "instagram") {
      shareUrl = "https://www.instagram.com";
    }

    // 3️⃣ Open platform in new tab AFTER alert
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return <p className="text-center py-32">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center py-32">Blog not found</p>;
  }

  return (
    <div className="bg-white">
      <Navbar />
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] py-32 text-center text-white">
        <p className="text-sm mb-4">Home → Blog → {blog.title}</p>
        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
          {blog.title}
        </h1>
      </section>

      {/* ================= MAIN ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* ========== LEFT SIDEBAR (UNCHANGED) ========== */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Search */}
          <div className="bg-gray-100 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Search Here</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Keywords"
                className="w-full px-4 py-3 rounded-lg outline-none"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700" />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gray-100 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Category</h3>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-white px-4 py-2 rounded-lg hover:bg-emerald-700 hover:text-white cursor-pointer transition"
                >
                  <span>{cat.name}</span>
                  <span>{cat.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Blogs */}
          <div className="bg-gray-100 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Latest Blogs</h3>
            <div className="space-y-4">
              {latestBlogs.map((blog) => (
                <div key={blog.id} className="flex gap-4">
                  <img
                    src={blog.image}
                    alt=""
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-500">{blog.date}</p>
                    <Link
                      to="/blog"
                      className="font-medium hover:text-emerald-700"
                    >
                      {blog.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ========== RIGHT CONTENT ========== */}
        <main className="lg:col-span-8 space-y-8">
          {/* Blog Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full rounded-2xl"
            />
          )}

          {/* Date */}
          <p className="text-sm text-gray-500">
            {new Date(blog.publishedAt).toDateString()}
          </p>

          {/* BLOG SECTIONS */}
          {Array.isArray(blog.sections) &&
            blog.sections.map((section, index) => {
              if (section.type === "heading") {
                return (
                  <h3 key={index} className="text-2xl font-semibold">
                    {section.content}
                  </h3>
                );
              }

              if (section.type === "paragraph") {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                );
              }

              if (section.type === "quote") {
                return (
                  <div key={index} className="flex gap-3">
                    <FaCheckCircle className="text-emerald-700 mt-1" />
                    <span>{section.content}</span>
                  </div>
                );
              }

              if (section.type === "list") {
                return (
                  <ul
                    key={index}
                    className="list-disc pl-6 space-y-2 text-gray-700"
                  >
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}

          {/* Share */}
          <div className="flex justify-between items-center border-t pt-6">
            <span className="font-medium">Share:</span>

            <div className="flex gap-3">
              <div
                onClick={() => handleShare("facebook")}
                className="w-9 h-9 border rounded-full flex items-center justify-center hover:bg-emerald-700 hover:text-white cursor-pointer transition"
              >
                <FaFacebookF />
              </div>

              <div
                onClick={() => handleShare("instagram")}
                className="w-9 h-9 border rounded-full flex items-center justify-center hover:bg-emerald-700 hover:text-white cursor-pointer transition"
              >
                <FaInstagram />
              </div>

              <div
                onClick={() => handleShare("twitter")}
                className="w-9 h-9 border rounded-full flex items-center justify-center hover:bg-emerald-700 hover:text-white cursor-pointer transition"
              >
                <FaXTwitter />
              </div>
            </div>
          </div>

          {/* ================= SIMILAR BLOGS ================= */}
          {similarBlogs.length > 0 && (
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-8">Similar Blogs</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similarBlogs.map((b) => (
                  <div
                    key={b._id}
                    className="bg-gray-100 rounded-2xl overflow-hidden"
                  >
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-5">
                      <p className="text-sm text-gray-500">
                        {new Date(b.publishedAt).toDateString()}
                      </p>
                      <h4 className="font-semibold mb-3">{b.title}</h4>
                      <Link
                        to={`/blog/${b._id}`}
                        className="text-emerald-700 font-medium"
                      >
                        More Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default BlogDetails;
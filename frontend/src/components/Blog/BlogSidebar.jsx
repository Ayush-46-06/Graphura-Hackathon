import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import categories from "../data/categories";
import recentPosts from "../data/recentPosts";
import tags from "../data/tags";
import appointmentImg from "../../assets/blogDetail/sidebar-1-4.png";

const BlogSidebar = () => {
  return (
    <div className="space-y-8">
      
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-100 p-6 rounded-2xl"
      >
        <h3 className="text-xl font-semibold mb-4">Search Here</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Keywords"
            className="w-full px-4 py-3 rounded-lg outline-none"
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700" />
        </div>
      </motion.div>

      {/* Categories */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Category</h3>
        <ul className="space-y-3">
          {categories.map((cat, i) => (
            <li
              key={i}
              className={`flex justify-between px-4 py-2 rounded-lg cursor-pointer ${
                cat.active
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <span>{cat.name}</span>
              <span>{cat.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Recent Post</h3>
        <div className="space-y-4">
          {recentPosts.map((post, i) => (
            <div key={i} className="flex gap-4">
              <img
                src={post.image}
                alt=""
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">{post.date}</p>
                <h4 className="font-medium text-gray-800 leading-snug">
                  {post.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment CTA */}
      <div className="relative rounded-2xl overflow-hidden">
        <img src={appointmentImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-800/90 p-6 flex flex-col justify-end text-white">
          <h3 className="text-xl font-semibold mb-2">Make An Appointment</h3>
          <p className="mb-4">+51-(0)-888-455-369</p>
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-medium w-fit">
            Contact Us →
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-emerald-700 hover:text-white transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BlogSidebar;

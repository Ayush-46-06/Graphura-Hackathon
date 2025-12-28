import React from "react";
import { motion } from "framer-motion";
import bg from "../../assets/blogDetail/breadcrumb-1-bg.png";

const BlogBreadcrumb = () => {
  return (
    <section
      className="relative h-[320px] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          A Step-by-Step Guide to Building <br /> Better User Experiences
        </h1>

        <div className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-medium">
          <span>Home</span>
          <span>→</span>
          <span>Blog</span>
          <span>→</span>
          <span>Blog Details</span>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogBreadcrumb;

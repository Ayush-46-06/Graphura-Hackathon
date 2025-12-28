import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaComments,
  FaFacebookF,
  FaInstagram,
  FaBehance,
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";

import banner from "../../assets/blogDetail/details-1-6.png";
import inlineImg from "../../assets/blogDetail/details-1-7.png";
import comments from "../data/comments";

const BlogContent = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Banner */}
      <img
        src={banner}
        alt="Blog Banner"
        className="w-full rounded-2xl object-cover"
      />

      {/* Meta */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <MdDateRange className="text-emerald-700" />
          December 24, 2025
        </span>
        <span className="flex items-center gap-2">
          <FaComments className="text-emerald-700" />
          Comments
        </span>
        <span className="flex items-center gap-2">
          <FaUser className="text-emerald-700" />
          Jennifer Hale
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        A Step-by-Step Guide to Building Better User Experiences
      </h2>

      {/* Intro */}
      <p className="text-gray-600 leading-relaxed">
        What does it take to deliver an amazing user experience (UX)? A seamless
        design process, of course. The UX design process is a cycle that leads
        to the creation of products that align with users’ needs to create a
        more satisfying, intuitive experience.
      </p>

      {/* Bullet List */}
      <div className="space-y-3">
        {[
          {
            title: "Research:",
            text: "Learn about the problem and user needs.",
          },
          {
            title: "Ideation & design:",
            text: "Explore potential solutions.",
          },
          {
            title: "Fine-tuning:",
            text: "Make changes based on feedback.",
          },
          {
            title: "Continuous improvement:",
            text: "Iterate and enhance continuously.",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-3">
            <FaCheckCircle className="text-emerald-700 mt-1" />
            <p className="text-gray-700">
              <strong>{item.title}</strong> {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Inline Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img src={inlineImg} alt="" className="rounded-2xl object-cover" />
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            What Is the UX Design Process?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The UX design process refers to the steps required to create
            intuitive digital experiences. Examples of where this process can be
            applied include websites, apps, software, and digital services.
          </p>
          <ul className="space-y-2">
            {["Websites", "Apps", "Software", "Digital services"].map(
              (item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-700" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Tags + Share */}
      <div className="flex flex-wrap justify-between items-center border-t pt-6 gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">Tags:</span>
          {["Research", "Team", "UI Design"].map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium">Flowing:</span>
          {[FaFacebookF, FaInstagram, FaXTwitter, FaBehance].map((Icon, i) => (
            <div
              key={i}
              className="w-9 h-9 flex items-center justify-center border rounded-full cursor-pointer hover:bg-emerald-700 hover:text-white transition"
            >
              <Icon />
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">
          Comment ({comments.length.toString().padStart(2, "0")})
        </h3>

        <div className="space-y-6">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-4">
              <img
                src={c.avatar}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{c.name}</h4>
                    <p className="text-sm text-gray-500">{c.date}</p>
                  </div>
                  <button className="text-emerald-700 text-sm">Reply</button>
                </div>
                <p className="text-gray-600 mt-2">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Form */}
      <div className="bg-gray-100 p-8 rounded-2xl">
        <h3 className="text-2xl font-semibold mb-6">Leave a reply</h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name*"
            className="border-b bg-transparent outline-none py-2"
          />
          <input
            type="email"
            placeholder="Email Here*"
            className="border-b bg-transparent outline-none py-2"
          />
          <input
            type="text"
            placeholder="Website"
            className="border-b bg-transparent outline-none py-2 md:col-span-2"
          />
          <textarea
            placeholder="Write Note*"
            rows="4"
            className="border-b bg-transparent outline-none py-2 md:col-span-2"
          />
          <button
            type="submit"
            className="bg-emerald-700 text-white px-6 py-3 rounded-lg w-fit"
          >
            Submit Now →
          </button>
        </form>
      </div>
    </motion.article>
  );
};

export default BlogContent;

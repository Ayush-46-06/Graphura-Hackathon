import React from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

/* ================= STATIC DATA ================= */

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

const similarBlogs = [
  {
    id: 1,
    title: "The Future of Medical Science",
    date: "24 May 2025",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16c7689",
  },
  {
    id: 2,
    title: "AI Revolution in Education",
    date: "09 Dec 2025",
    category: "Education",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  },
  {
    id: 3,
    title: "Building Products That Scale",
    date: "19 Dec 2025",
    category: "Business",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  },
];

/* ================= COMPONENT ================= */

const BlogDetails = () => {
  const [activeQA, setActiveQA] = React.useState(null);
  return (
    <div className="bg-white">
      <Navbar />
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] py-32 text-center text-white">
        <p className="text-sm mb-4">Home → Blog → Blog Details</p>
        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
          Graphura HackQuest 2025: Enter the Battlefield of Innovation
        </h1>
      </section>

      {/* ================= MAIN ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* ========== LEFT SIDEBAR ========== */}
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

          {/* Internship Ad */}
          <div className="bg-emerald-800 text-white p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">
              Join Our Internship Program
            </h3>
            <p className="mb-4">Learn. Build. Get Hired.</p>
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-medium">
              Apply Now →
            </button>
          </div>
        </aside>

        {/* ========== RIGHT CONTENT ========== */}
        <main className="lg:col-span-8 space-y-8">
          {/* Blog Image */}
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt=""
            className="w-full rounded-2xl"
          />

          {/* Date */}
          <p className="text-sm text-gray-500">December 24, 2025</p>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed">
            In a world where technology evolves faster than ever, only the
            boldest innovators rise to the top. This year, Graphura invites you
            to step into a digital battleground like no other—HackQuest 2025, a
            high-energy hackathon crafted for creators, coders, designers, and
            problem-solvers ready to push their limits.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Whether you are a rookie programmer looking to gain XP or a seasoned
            tech warrior eager to dominate the leaderboard, HackQuest promises a
            challenge that will test your creativity, speed, and strategic
            thinking.
          </p>

          <h3 className="text-2xl font-semibold">Why HackQuest Stands Apart</h3>
          <p>
            Hackathons often feel like marathons. But HackQuest? It feels like a
            mission. A mission where:
          </p>

          {[
            "Every line of code is a weapon",
            "Every idea is a power-up",
            "Every teammate becomes part of your squad",
            "Every challenge is a boss you must defeat",
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <FaCheckCircle className="text-emerald-700 mt-1" />
              <span>{item}</span>
            </div>
          ))}
          <p>
            Graphura designed this event for individuals who thrive under
            pressure and love to compete, create, and conquer.
          </p>
          <p>This is not just a hackathon.</p>
          <p>
            It is an experience, a journey through quests, rapid-fire problem
            solving, and intense innovation sprints.
          </p>

          {/* -------------------------------------------------------------------- */}
          <h3 className="text-2xl font-semibold">
            The Gameplay: How HackQuest Works
          </h3>

          <p className="text-gray-700">
            Participants will enter the arena with a clear goal—build something
            extraordinary within the given time window. But this is not a simple
            build-and-submit event. The entire flow is structured like a
            competitive game.
          </p>

          <div className="space-y-6 text-gray-700">
            {/* Q1 */}
            <div>
              <p className="font-semibold">Create Your Squad </p>
              <p className="mt-2">
                <span className="font-medium">A:</span> Form a powerful team or
                enter as a solo warrior. Collaboration is your key to unlocking
                higher skill levels and tackling tougher missions.
              </p>
            </div>

            {/* Q2 */}
            <div>
              <p className="font-semibold">Choose Your Challenge Track </p>
              <p className="mt-2">
                <span className="font-medium">A:</span> Each track represents a
                different world:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>AI & Automation Realm</li>
                <li>Design & Creativity Zone</li>
                <li>Business Innovation Universe</li>
                <li>Tech for Good Quest</li>
              </ul>
              <p className="mt-2">
                Pick the track that excites you—or the one where you wish to
                level up.
              </p>
            </div>

            {/* Q3 */}
            <div>
              <p className="font-semibold">Start the Mission </p>
              <p className="mt-2">
                <span className="font-medium">A:</span> As the clock starts
                ticking, the real test begins. Participants must ideate, design,
                build, and implement their project in a fast-paced,
                adrenaline-filled atmosphere.
              </p>
            </div>

            {/* Q4 */}
            <div>
              <p className="font-semibold">Earn Power-Ups </p>
              <p className="mt-2">
                <span className="font-medium">A:</span> Throughout the event,
                teams can unlock:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Mentor boosts</li>
                <li>Bonus learning sessions</li>
                <li>Surprise mini-challenges</li>
                <li>Expert insights (your equivalent of in-game hints)</li>
              </ul>
            </div>

            {/* Q5 */}
            <div>
              <p className="font-semibold">Present to the Guardians (Judges)</p>
              <p className="mt-2">
                <span className="font-medium">A:</span> At the end, teams must
                pitch their creation to industry experts—our “Guardians”—who
                evaluate innovation, impact, creativity, and execution.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold">
            Final Call: Are You Ready to Begin the Quest?
          </h3>

          <p className="text-gray-700">
            Graphura HackQuest 2025 is your arena. Prepare your squad. Sharpen
            your skills. Gear up for the ultimate coding adventure.
          </p>

          {/* Share */}
          <div className="flex justify-between items-center border-t pt-6">
            <span className="font-medium">Share:</span>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaXTwitter].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 border rounded-full flex items-center justify-center hover:bg-emerald-700 hover:text-white cursor-pointer"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>

          {/* Comment Form */}
          <div className="bg-gray-100 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6">Leave a Reply</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                placeholder="Full Name*"
                className="border-b bg-transparent py-2 outline-none"
              />
              <input
                placeholder="Email*"
                className="border-b bg-transparent py-2 outline-none"
              />
              <textarea
                placeholder="Write Note*"
                rows="4"
                className="border-b bg-transparent py-2 outline-none md:col-span-2"
              />
              <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg w-fit">
                Submit Now →
              </button>
            </form>
          </div>
        </main>
      </section>

      {/* ================= SIMILAR BLOGS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Similar Blog</h2>
          <Link
            to="/blog"
            className="bg-yellow-400 px-5 py-2 rounded-lg font-medium"
          >
            View All Blog →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-100 rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt=""
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-4 left-4 bg-yellow-400 px-3 py-1 rounded-md text-sm">
                  {blog.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500">{blog.date}</p>
                <h4 className="font-semibold mb-3">{blog.title}</h4>
                <Link to="/blog" className="text-emerald-700 font-medium">
                  More Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogDetails;
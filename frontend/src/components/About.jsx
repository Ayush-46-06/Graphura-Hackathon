import Navbar from "./Navbar";
import Footer from "./Footer";
import StatsSection from "../components/Home/StatsSection";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartLine,
  FaGift,
  FaUserGraduate,
  FaTasks,
  FaTrophy,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";


const whyChooseData = [
  {
    icon: <FaUsers />,
    title: "Squad Battles",
    desc: "Team formation, strategy and execution",
  },
  {
    icon: <FaChartLine />,
    title: "Live Leaderboards",
    desc: "Every move impacts rankings",
  },
  {
    icon: <FaGift />,
    title: "Reward Loot Drops",
    desc: "Swag, rewards and career boosts",
  },
  {
    icon: <FaUserGraduate />,
    title: "Clutch Mentorship",
    desc: "Revive moments from tech experts",
  },
  {
    icon: <FaTasks />,
    title: "Real Mission Design",
    desc: "No dummy tasks, pure industry relevance",
  },
  {
    icon: <FaTrophy />,
    title: "Fame System",
    desc: "Titles, badges, trophies and spotlight",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const teamMembers = [
  {
    id: 1,
    name: "Anurag Sharma",
    role: "Head - Technical Department",
    image: "/about_img/team1.webp",
  },
  {
    id: 2,
    name: "Virendra Singh",
    role: "Head - Finance Department",
    image: "/about_img/team2.webp",
  },
  {
    id: 3,
    name: "Aayushi Shrivastav",
    role: "Sales & Marketing Specialist",
    image: "/about_img/team3.webp",
  },
  {
    id: 4,
    name: "Divya Jain",
    role: "Head - Management & Operations",
    image: "/about_img/team4.webp",
  },
  {
    id: 5,
    name: "Aarav Sharma",
    role: "Digital Marketing Specialist",
    image: "/about_img/team5.webp",
  },
];




export default function About() {
  const navigate = useNavigate();
  const darkLogos = [6, 7, 8, 9, 10]; // logos that need dark card 

  return (
    <>
      {/* HEADER */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="bg-white">

        
        {/* ================= HERO ================= */}
        <section className="
          pt-[120px] sm:pt-[140px]
          relative
          overflow-hidden
          pb-24 sm:pb-28
          min-h-[calc(100vh-80px)]
          flex items-start lg:items-center
          bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]
        ">

          {/* Subtle floating background accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-24 left-16 w-72 h-72 bg-[#1AB69D]/25 rounded-full blur-3xl"></div>
            <div className="absolute bottom-16 right-20 w-96 h-96 bg-[#F8C62F]/15 rounded-full blur-3xl"></div>
          </div>

          {/* CONTENT */}
          <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT CONTENT */}
            <div>
              <span className="
                inline-block mb-6 text-base bg-white/20 text-white px-5 py-1.5
                rounded-full font-semibold tracking-wide
                opacity-0 hero-fade-up delay-100
              ">
                About Us
              </span>



              <h1 className="
                text-4xl md:text-5xl leading-tight font-bold text-white mb-6
                opacity-0 hero-fade-up delay-200
              ">
                Where Hackathons <br />
                <span className="relative inline-block">
                  Meet Esports
                  <span className="absolute left-0 -bottom-2 w-full h-[6px] bg-[#F8C62F]/70 rounded-full" />
                </span>
              </h1>

              <p className="
                text-white/80 text-lg max-w-xl mb-10
                opacity-0 hero-fade-up delay-300
              ">
                We redefine hackathons into competitive, game-driven arenas where
                innovation, skills, and teamwork level you up for the real world.
              </p>

              {/* CTA */}
              <div className="flex gap-5 opacity-0 hero-fade-up delay-400">
                <button
                  onClick={() => navigate("/hackathons")}
                  className="
                    px-8 py-4 bg-[#F8C62F] text-[#0C121D]
                    rounded-xl font-semibold transition-all
                    hover:bg-[#e0b429] hover:scale-105
                    hover:shadow-3xl hover:shadow-[#F8C62F]/40
                  "
                >
                  Explore Hackathons →
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative opacity-0 hero-image-in delay-500">
              <img
                src="/about_img/hero.webp"
                alt="About Graphura"
                className="rounded-2xl shadow-2xl max-h-[360px] md:max-h-[420px] lg:max-h-none mx-auto"
              />
            </div>
          </div>
        </section>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

        {/* ================= ABOUT CONTENT ================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT: IMAGE STACK */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch"
            >

              {/* Image 1 */}
              <img
                src="/about_img/about-1.webp"
                alt="Students collaborating"
                className="w-full sm:w-[55%] h-[260px] sm:h-[420px] rounded-2xl object-cover"
              />

              {/* Image 2 */}
              <div className="relative w-full sm:w-[45%] h-[260px] sm:h-[420px]">
                <img
                  src="/about_img/about-2.webp"
                  alt="Learning discussion"
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </motion.div>

            {/* RIGHT: CONTENT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >

              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 text-base bg-[#E6F4F1] text-[#03594E] px-5 py-1.5 rounded-full"
              >
                About Us
              </motion.span>

              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              >
                Develop your potential with education that fits your life.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-[#6C757D] mb-8 max-w-xl text-sm sm:text-base"
              >
                Sharpen your skill set and fast-track your professional career with
                coursework you can take anytime, anywhere. Access expert-led learning
                designed to help you succeed from the comfort of your home.
              </motion.p>

              <ul className="grid sm:grid-cols-2 gap-5">
                {[
                  "Interactive modules",
                  "Unrestricted training",
                  "Sector industry-minded individuals",
                  "On the go research",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="!text-[#F8C62F] font-extrabold text-2xl leading-none">
                      ✓
                    </span>

                    <span className="text-[#0C121D]">{item}</span>
                  </motion.li>
                ))}
              </ul>

            </motion.div>


          </div>
        </section>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />


        {/* ================= STATS ================= */}
        <StatsSection />

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

        {/* ================= WHY CHOOSE (ANIMATED) ================= */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4 text-base bg-[#E6F4F1] text-[#03594E] px-5 py-1.5 rounded-full"
            >
              Why Choose Graphura
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-12 md:mb-16"

            >
              Hackathons Designed Like Esports Arenas
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {whyChooseData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    boxShadow: "0px 18px 35px rgba(0,0,0,0.18)",
                  }}
                  className="
                    bg-white
                    border border-[#E6F4F1]
                    rounded-2xl
                    p-8 md:p-10
                    text-center
                    cursor-pointer
                    transition-shadow
                  "
                >

                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#E6F4F1] text-[#03594E] text-2xl">
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  <h4 className="text-xl font-semibold mb-3">
                    {item.title}
                  </h4>

                  <p className="text-[#6C757D] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

        {/* ================= PARTNERS ================= */}
        <section className="relative py-16 md:py-28 bg-[#F6FAF9] overflow-hidden">
          {/* Background accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#1AB69D]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-24 w-96 h-96 bg-[#F8C62F]/20 rounded-full blur-3xl" />

          {/* TEXT stays centered */}
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block mb-4 text-base bg-[#E6F4F1] text-[#03594E] px-5 py-1.5 rounded-full">
              Our Partners
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">
              The trusted partners behind your successful hackathons
            </h2>
          </div>

          <div className="marquee-wrapper">
            <div className="marquee-track">

              {[1,6,2,7,3,8,4,9,10].map((i) => {
                const isDark = darkLogos.includes(i);

                return (
                  <div
                    key={`a-${i}`}
                    className={`rounded-xl p-6 mx-5 flex items-center justify-center shadow-sm min-w-[140px] sm:min-w-[180px]
                      ${isDark ? "bg-[#03594E]" : "bg-white"}
                    `}
                  >
                    <img
                      src={`/about_img/brand${i}.webp`}
                      alt="Partner Logo"
                      className={`h-20 object-contain`}
                    />
                  </div>
                );
              })}


              {[1,6,2,7,3,8,4,9,10].map((i) => {
                const isDark = darkLogos.includes(i);

                return (
                  <div
                    key={`b-${i}`}
                    className={`rounded-xl p-6 mx-5 flex items-center justify-center shadow-sm min-w-[140px] sm:min-w-[180px]
                      ${isDark ? "bg-[#03594E]" : "bg-white"}
                    `}
                  >
                    <img
                      src={`/about_img/brand${i}.webp`}
                      alt="Partner Logo"
                      className={`h-20 object-contain`}
                    />
                  </div>
                );
              })}


            </div>
          </div>
        </section>


        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

        {/* ================= TEAM ================= */}
        <section className="py-16 md:py-28 bg-gradient-to-b from-white to-[#F9FAFB]">

          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block mb-4 text-base bg-[#E6F4F1] text-[#03594E] px-5 py-1.5 rounded-full">
              Meet Our Team
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">
              Meet the Passionate & Expert Minds Behind Your Successful Hackathons
            </h2>

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-5
              gap-8
              pt-6
            ">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="
                    group
                    w-full
                    max-w-[260px]
                    mx-auto
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    shadow-sm
                    transition
                    duration-300
                    ease-out
                    hover:shadow-xl
                    hover:-translate-y-2
                  "
                >

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="
                        w-full h-56 sm:h-64 object-cover
                        transition-all
                        duration-300
                        ease-out
                        group-hover:brightness-75
                      "
                    />

                    {/* Hover overlay */}
                    <div
                      className="
                        absolute inset-x-0 bottom-6
                        flex justify-center gap-4
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                      "
                    >

                      <div className="flex gap-4">
                        <span className="w-10 h-10 rounded-lg border border-white/30 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center hover:border-white/60 transition ">
                          <FaLinkedinIn />
                        </span>
                        <span className="w-10 h-10 rounded-lg border border-white/30 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center hover:border-white/60 transition ">
                          <FaTwitter />
                        </span>
                        <span className="w-10 h-10 rounded-lg border border-white/30 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center hover:border-white/60 transition ">
                          <FaInstagram />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-6 text-center">
                    <h4 className="font-semibold text-lg text-[#0C121D]">
                      {member.name}
                    </h4>
                    <p className="text-sm text-[#6C757D] mt-1">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
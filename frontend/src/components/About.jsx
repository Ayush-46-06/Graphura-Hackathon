import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import {
  FaUsers,

  FaChartLine,
  FaGift,
  FaUserGraduate,
  FaTasks,
  FaTrophy,
  FaLinkedinIn,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";


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


const Counter = ({ end, suffix = "", duration = 2000,delay=0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const animateCount = () => {
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) requestAnimationFrame(update);
    };

    setTimeout(() => {
      requestAnimationFrame(update);
    }, delay);
  };

  return (
    <h3 ref={ref} className="text-5xl font-bold text-[#F8C62F]">
      {count}
      {suffix}
    </h3>
  );
};



export default function About() {
  return (
    <>
      {/* HEADER */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="bg-white">

        
        {/* ================= HERO ================= */}
        <section className="
          mt-[80px]
          relative
          overflow-hidden
          py-28
          bg-[radial-gradient(circle_at_top_left,#F6FAF9,transparent_60%),radial-gradient(circle_at_bottom_right,#FFF1CC,transparent_55%),linear-gradient(90deg,#F6FAF9,#FFF7E6)]
        ">

          {/* Decorative shapes */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-[#F8C62F]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#03594E]/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT CONTENT */}
            <div>
              <span className="inline-block mb-5 text-sm bg-[#E6F4F1] text-[#03594E] px-4 py-1 rounded-full">
                About Us
              </span>

              <h1 className="text-5xl leading-tight font-bold text-[#0C121D] mb-6">
                Where Hackathons <br />
                <span className="relative inline-block">
                  Meet Esports
                  <span className="absolute left-0 -bottom-2 w-full h-[6px] bg-[#F8C62F]/60 rounded-full" />
                </span>
              </h1>

              <p className="text-[#6C757D] text-lg max-w-xl mb-10">
                We redefine hackathons into competitive, game-driven arenas where
                innovation, skills, and teamwork level you up for the real world.
              </p>

              {/* CTA */}
              <div className="flex gap-5">
                <button
                  className="
                    bg-[#03594E]
                    text-white
                    px-8 py-4
                    rounded-lg
                    font-medium
                    hover:bg-[#1AB69D]
                    transition
                  "
                >
                  Explore Hackathons →
                </button>

              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative">
              <img
                src="/about_img/hero.png"
                alt="About Graphura"
                className="rounded-2xl shadow-2xl"
              />

            </div>

          </div>
        </section>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

        {/* ================= ABOUT CONTENT ================= */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {/* LEFT: IMAGE STACK */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex gap-6"
            >

              {/* Image 1 */}
              <img
                src="/about_img/about-1.jpg"
                alt="Students collaborating"
                className="w-[55%] rounded-2xl object-cover"
              />

              {/* Image 2 */}
              <div className="relative w-[45%]">
                <img
                  src="/about_img/about-2.webp"
                  alt="Learning discussion"
                  className="rounded-2xl object-cover"
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
                className="inline-block mb-4 text-sm bg-[#E6F4F1] text-[#03594E] px-4 py-1 rounded-full"
              >
                About Us
              </motion.span>

              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold mb-6 leading-tight"
              >
                Develop your potential with education that fits your life.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-[#6C757D] mb-8 max-w-xl"
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


        {/* ================= COUNTERS ================= */}
        <section className="bg-[#03594E] py-20 text-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">

            <div>
              <Counter end={200} suffix="+" delay={0} />
              <p className="mt-2">Available Hackathons</p>
            </div>

            <div>
              <Counter end={1500} suffix="+" delay={200} />
              <p className="mt-2">Participants</p>
            </div>

            <div>
              <Counter end={30} suffix="+" delay={400} />
              <p className="mt-2">Collaborated Universities</p>
            </div>

            <div>
              <Counter end={10} suffix="+" delay={600} />
              <p className="mt-2">Companies Partnered</p>
            </div>

          </div>
        </section>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

        {/* ================= WHY CHOOSE (ANIMATED) ================= */}
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4 text-sm bg-[#E6F4F1] text-[#03594E] px-5 py-1 rounded-full"
            >
              Why Choose Graphura
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-16"
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
                    p-10
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
        <section className="relative py-28 bg-[#F6FAF9] overflow-hidden">
          {/* Background accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#1AB69D]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-24 w-96 h-96 bg-[#F8C62F]/20 rounded-full blur-3xl" />

          {/* TEXT stays centered */}
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block mb-4 text-sm bg-[#E6F4F1] text-[#03594E] px-4 py-1 rounded-full">
              Our Partners
            </span>

            <h2 className="text-4xl font-bold mb-16">
              The trusted partners behind your successful hackathons
            </h2>
          </div>

          {/* 🔥 MARQUEE MUST BE FULL WIDTH */}
          <div className="marquee-wrapper">
            <div className="marquee-track">

              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={`a-${i}`}
                  className="bg-white rounded-xl p-6 mx-5 flex items-center justify-center shadow-sm min-w-[180px]"
                >
                  <img
                    src={`/about_img/partner-${i}.png`}
                    alt="Partner Logo"
                    className="h-20 object-contain"
                  />
                </div>
              ))}

              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={`b-${i}`}
                  className="bg-white rounded-xl p-6 mx-5 flex items-center justify-center shadow-sm min-w-[180px]"
                >
                  <img
                    src={`/about_img/partner-${i}.png`}
                    alt="Partner Logo"
                    className="h-20 object-contain"
                  />
                </div>
              ))}

            </div>
          </div>
        </section>


        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />

        {/* ================= TEAM ================= */}
        <section className="py-28 bg-gradient-to-b from-white to-[#F9FAFB]">

          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block mb-4 text-sm bg-[#E6F4F1] text-[#03594E] px-4 py-1 rounded-full">
              Meet Our Team
            </span>

            <h2 className="text-4xl font-bold mb-16">
              Meet the Passionate & Expert Minds Behind Your Successful Hackathons
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="
                    group
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
                      src={`/about_img/team-${i}.png`}
                      alt="Team Member"
                      className="
                        w-full h-64 object-cover
                        transition-transform
                        duration-300
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Hover overlay */}
                    <div
                      className="
                        absolute inset-0
                        bg-[#03594E]/70
                        flex items-center justify-center
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                      "
                    >
                      <div className="w-12 h-12 rounded-full bg-white text-[#03594E] flex items-center justify-center">
                        <FaLinkedinIn />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-6 text-center">
                    <h4 className="font-semibold text-lg text-[#0C121D]">
                      Team Member
                    </h4>
                    <p className="text-sm text-[#6C757D] mt-1">
                      Role / Position
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
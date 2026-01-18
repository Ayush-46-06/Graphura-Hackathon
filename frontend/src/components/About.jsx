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
import AboutPageSEO from "./SEO/AboutPageSEO";

const universities = [
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561171/0a8d0497-ecca-4135-b047-393bc52ed5e4_removalai_preview_yzpaog",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/bb2bd7b7-dd7e-4e4c-ad9c-482cea8861dc_removalai_preview_pylvja",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/b094f29e-2783-466f-a6da-35c05910ed3c_removalai_preview_w8cj70",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/80e54548-ab6b-4c6d-8c32-e377aa4272f1_removalai_preview_so2ubo",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/74951467-33d0-4bfd-8b69-0844ea367f08_removalai_preview_qbgzgl",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/857a49f3-5eeb-4c65-9f96-b3d8f7393fe9_removalai_preview_akhaxb",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/Jigyasa_University_Logo_-_Color__1_n8jokp",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/VIT_pbfcph",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/11c98e03-0279-411f-8abf-832e2c05ea47_removalai_preview_rwcg0v",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/89d84749-b44e-486a-b14e-16bb1a3de50d_removalai_preview_amds5h",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/6c2c4609-ffda-4183-99dc-ba34f3de9e64_removalai_preview_oir4np",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/mu-logo_fri1x0_ytedpe",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/2d-logo-miet-comp_mtdoi2",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/Vellore_Institute_of_Technology_seal_2017.svg_yljl5k",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/logo_pn22s9",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/latest_logo-CERg6eCh_xbuthi",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/National_Institute_of_Technology__Kurukshetra_Logo_cqzp8f",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561285/InstituteLogo_Colour_ftmshg",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561284/Indian_Institute_of_Technology_Delhi_Logo_1_rg5kdx",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561281/bhartilogo_lltuk8",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561284/iitp_logo_sdjfps",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561284/d0cf9993-b4cf-430b-bd83-cce09b67a726_kovpvw",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561283/cc75ce0b-e8ba-4b13-a971-5f1255a5b46d_removalai_preview_1_peiilg",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561283/f4cb457d-bff7-44e8-a156-6f48fdae60b0_removalai_preview_k2sy6h",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561283/IIIT_Gwalior_Simply_modern_logo_qe9eqq",
  ];
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
      <AboutPageSEO />
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

    {/* FIRST LOOP */}
    {universities.map((logo, index) => (
      <div
        key={`uni-a-${index}`}
        className="rounded-xl p-6 mx-5 flex items-center justify-center shadow-sm min-w-[140px] sm:min-w-[180px] bg-white"
      >
        <img
          src={logo}
          alt={`University ${index + 1}`}
          className="h-20 object-contain"
          loading="lazy"
        />
      </div>
    ))}

    {/* DUPLICATE LOOP (for infinite marquee) */}
    {universities.map((logo, index) => (
      <div
        key={`uni-b-${index}`}
        className="rounded-xl p-6 mx-5 flex items-center justify-center shadow-sm min-w-[140px] sm:min-w-[180px] bg-white"
      >
        <img
          src={logo}
          alt={`University ${index + 1}`}
        className="h-20 object-contain"
          loading="lazy"
        />
      </div>
    ))}

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
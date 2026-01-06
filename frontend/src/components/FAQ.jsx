import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "What is Graphura Hackathon?",
    a: "Graphura Hackathon is a multi-domain innovation hackathon where participants collaborate to solve real-world problems using technology, creativity, and strategic thinking.",
  },
  {
    q: "Who can participate in Graphura Hackathon?",
    a: "Students, freshers, professionals, developers, designers, marketers, and innovators from any background are welcome to participate.",
  },
  {
    q: "Is Graphura Hackathon open to non-technical participants?",
    a: "Yes. Graphura Hackathon is designed for both technical and non-technical participants, including designers, marketers, business strategists, content creators, and idea builders.",
  },
  {
    q: "Do I need prior hackathon experience?",
    a: "No prior experience is required. Beginners are highly encouraged to participate and learn through hands-on collaboration and mentorship.",
  },
  {
    q: "Can I participate individually or in a team?",
    a: "You can register as an individual or as a team. Team size requirements may vary depending on the hackathon edition.",
  },
  {
    q: "Is Graphura Hackathon conducted online or offline?",
    a: "Graphura Hackathon can be conducted online, offline, or in a hybrid format. Event details are clearly mentioned on the respective hackathon page.",
  },
  {
    q: "What is the duration of the hackathon?",
    a: "Most Graphura Hackathon events run for 24 to 72 hours, depending on the challenge and format.",
  },
  {
    q: "Is there any registration fee?",
    a: "Some editions are free to participate, while others may include a nominal registration fee. Details are always mentioned on the registration page.",
  },
  {
    q: "What domains or themes are covered?",
    a: "Graphura Hackathon covers multiple domains including Web & App Development, AI / ML, Cybersecurity, UI/UX Design, Business & Marketing, Social Impact, and Open Innovation.",
  },
  {
    q: "How are projects evaluated?",
    a: "Projects are judged based on innovation, problem-solving, execution, feasibility, presentation, and real-world impact.",
  },
  {
    q: "What do winners receive?",
    a: "Winners may receive certificates, trophies, prizes or goodies, featured recognition, and internship or career opportunities in selected editions.",
  },
  {
    q: "Will all participants receive a certificate?",
    a: "Yes, all eligible participants who successfully complete the hackathon receive a Participation Certificate.",
  },
  {
    q: "Can I participate in multiple Graphura Hackathon events?",
    a: "Absolutely. You are welcome to participate in multiple editions to build experience and visibility.",
  },
  {
    q: "How do I register?",
    a: "Click the Register Now button on the hackathon page, fill out the form, and follow the instructions sent to your email.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <Navbar />

      <main className="bg-white">

        {/* ================= HERO ================= */}
        <section
          className="
            mt-[64px] sm:mt-[80px]
            relative overflow-hidden
            min-h-[unset] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[650px]
            flex items-start lg:items-center
            py-12 sm:py-0
            bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]
          "
        >
          {/* Floating background accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-28 left-12 w-72 h-72 bg-[#1AB69D]/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-16 w-96 h-96 bg-[#F8C62F]/20 rounded-full blur-3xl" />
          </div>

          {/* CONTENT GRID */}
          <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">

              {/* Badge */}
              <span
                className="
                  inline-flex items-center gap-2
                  mb-8
                  text-xs md:text-sm
                  tracking-[0.25em]
                  uppercase
                  bg-white/20 backdrop-blur-md
                  text-white
                  px-6 py-2.5
                  rounded-full
                  font-semibold
                  shadow-lg shadow-black/10
                  border border-white/20
                  opacity-0 hero-fade-up delay-100
                "
              >
                Help & Support
              </span>
              {/* Heading */}
              <h1
                className="
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  leading-[1.15]
                  font-[var(--it-ff-heading)]
                  text-white
                  mb-8
                  drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)]
                  opacity-0 hero-fade-up delay-200
                "
              >
                Got Questions? <br />

                <span className="relative inline-block">
                  <span className="relative z-10">We’ve Got Answers</span>

                  {/* Glow underline */}
                  <span
                    className="
                      absolute left-0 -bottom-2
                      w-full h-[7px]
                      bg-gradient-to-r
                      from-[#F8C62F]
                      via-[#FFD966]
                      to-[#F8C62F]
                      rounded-full
                    "
                  />
                </span>
              </h1>

              {/* Description */}
              <p
                className="
                  text-white/85
                  text-lg md:text-xl
                  max-w-xl
                  mb-6 sm:mb-10
                  leading-relaxed
                  opacity-0 hero-fade-up delay-300
                "
              >
                Everything you need to know about Graphura Hackathon — participation,
                eligibility, formats, rewards, and how to get started.
              </p>
            </div>

            {/* RIGHT VISUAL */}
            <div className="
              relative w-full max-w-sm mx-auto lg:max-w-none
              -mt-8 sm:mt-0 mb-16 sm:mb-0
              opacity-0 hero-image-in delay-400
            ">
              <img
                src="/faq.jpg"
                alt="FAQ Illustration"
                className="rounded-2xl shadow-2xl border border-white/10 w-full"
              />
            </div>

          </div>
          {/* Scroll indicator */}
          <div
            className="
              absolute bottom-8 left-1/2 -translate-x-1/2
              text-white/70 text-sm tracking-wide
              opacity-0 hero-fade-up delay-500
            "
          >
            Scroll to explore FAQs ↓
          </div>
        </section>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />


        {/* ================= FAQ SECTION ================= */}
        <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16">

            {/* LEFT CONTENT */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            >
            <span className="text-sm text-[#6C757D] uppercase tracking-wide">
                Support
            </span>

            <h2 className="text-4xl font-bold text-[#0C121D] mt-3 mb-6">
                FAQs
            </h2>

            <p className="text-[#6C757D] max-w-sm leading-relaxed">
                Have questions? We’ve got answers. Browse through our frequently
                asked questions to quickly understand how Graphura Hackathon works
                and how you can participate.
            </p>
            </motion.div>

            {/* RIGHT FAQ LIST (WIDER) */}
            <div className="space-y-6">
            {faqs.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-gray-200 pb-4"
                >
                    {/* Question */}
                    <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="
                        w-full flex items-center justify-between
                        py-4 text-left
                        group
                    "
                    >
                    <span className="text-base sm:text-lg font-medium text-[#0C121D] group-hover:text-[#0E8F7C] transition">
                        {item.q}
                    </span>

                    <span
                        className={`
                        text-xl text-[#6C757D]
                        transition-transform duration-300
                        ${isOpen ? "rotate-90 text-[#03594E]" : ""}
                        `}
                    >
                        →
                    </span>
                    </button>

                    {/* Answer */}
                    <motion.div
                    initial={false}
                    animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    >
                    <div className="pt-2 text-[#6C757D] leading-relaxed max-w-full sm:max-w-2xl">
                        {item.a}
                    </div>
                    </motion.div>
                </motion.div>
                );
            })}
            </div>
        </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

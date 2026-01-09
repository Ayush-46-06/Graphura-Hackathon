import HomeHackathonSection from "./HomeHackathonSlider";
import StatCard from "./StatsSection";
import CTASection from "./CTASection";
import Partner from "./Partner";
import TestimonialSection from "./Testimonial";
import { motion } from "framer-motion";
import HackathonWinners from "./HackathonWinners";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function First() {
  return (
    <main className="bg-white">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* SMALL PILL LABEL */}
          <div className="inline-block mb-6 px-5 py-5 rounded-full border border-green-200 text-green-700 text-md font-medium">
            Categories
          </div>

          {/* MAIN HEADING */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0C121D] leading-tight">
            Choose Your Mission
          </h1>

          {/* SUB HEADING / DESCRIPTION */}
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            From creative sprints to data combat — pick the battlefield that
            suits your skill.
          </p>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Card 1 */}
            <div className="group bg-[#F3F8F7] border border-[#0E766E] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#0E766E] flex justify-center alignitmes-center">
                <img src="./Sales.svg" alt="" />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                Sales & Marketing Faceoffs
              </h4>
            </div>

            {/* Card 2 */}
            <div className="group bg-[#FFD23F] border border-[#F8C62F] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#1F2937] flex justify-center alignitmes-center">
                <img src="./Ui.svg" alt="" />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                UI/UX Design Quests
              </h4>
            </div>

            {/* Card 3 */}
            <div className="group bg-[#FFF1F1] border border-[#FF6B6B] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#FF6B6B] flex justify-center alignitmes-center">
                <img src="./ContentStatergy.svg" alt="" />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                Content Strategy Challenges
              </h4>
            </div>

            {/* Card 4 */}
            <div className="group bg-[#EDF5FF] border border-[#3B82F6] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#3B82F6] flex justify-center alignitmes-center">
                <img src="./HumanResources.svg" alt="" />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                Human Resources Hack Battles
              </h4>
            </div>

            {/* Card 5 */}
            <div className="group bg-[#EEF2FF] border border-[#4F46E5] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#4F46E5] flex justify-center alignitmes-center">
                <img
                  src="./VideoEditing.svg
              "
                  alt=""
                />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                Video Editing Showdowns
              </h4>
            </div>

            {/* Card 6 */}
            <div className="group bg-[#F3FFF0] border border-[#22C55E] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#22C55E] flex justify-center alignitmes-center">
                <img src="./GraphicDesign.svg" alt="" />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                Graphic Design Combat
              </h4>
            </div>

            {/* Card 7 */}
            <div className="group bg-[#F5F3FF] border border-[#8B5CF6] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#8B5CF6] flex justify-center alignitmes-center">
                <img src="./DigitalMarketing.svg" alt="" />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                Digital Marketing Ops
              </h4>
            </div>

            {/* Card 8 */}
            <div className="group bg-[#FFF5F9] border border-[#EC4899] rounded-2xl p-10 transition hover:-translate-y-2">
              <div className="mb-6 text-[#EC4899] flex justify-center alignitmes-center">
                <img src="./DataScience.svg" alt="" />
              </div>
              <h4 className="text-lg font-semibold text-[#0C121D]">
                Data Science & Analytics Missions
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COUNTERS ================= */}
      <StatCard />

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* CONTENT - Shows first on mobile */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="order-1"
            >
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 text-sm font-semibold bg-[#E6F4F1] text-[#03594E] px-5 py-2 rounded-full"
              >
                About Us
              </motion.span>

              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-[#0C121D]"
              >
                Reinventing Hackathons as Esports
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-[#6C757D] text-base sm:text-lg mb-8 leading-relaxed"
              >
                Graphura blends coding, creativity, and competition into a
                high-energy experience where learning becomes a leaderboard
                challenge.
              </motion.p>

              <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
                {[
                  "Game-mode learning",
                  "Flexible, online participation",
                  "Industry-relevant tasks",
                  "Growth-focused tech ecosystem",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F8C62F]/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#F8C62F]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-[#0C121D] font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group bg-[#03594E] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-[#1AB69D] transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Discover Who We Are
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* IMAGE STACK - Shows second on mobile, right side on desktop */}
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
          </div>
        </div>
      </section>

      {/* ================= ACTIVE HACKATHONS ================= */}
      <HomeHackathonSection />
      {/* ================= PARTNER LOGOS ================= */}
      <Partner />

      <TestimonialSection />

      <HackathonWinners />
      {/* ================= CTA BANNER ================= */}
      {/* <CTASection /> */}
    </main>
  );
}
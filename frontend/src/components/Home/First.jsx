import HomeHackathonSection from "./HomeHackathonSlider";
import StatCard from "./StatsSection";
import CTASection from "./CTASection";

import TestimonialSection from "./Testimonial";
import { motion } from "framer-motion";
import HackathonWinners from "./HackathonWinners";
import { useNavigate } from "react-router-dom";
import PartnerSection from "./Partner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function First() {
  const navigate = useNavigate();

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
            <div className="group bg-[#FFF4CC] border-2 border-[#FFE8A3] rounded-2xl p-10 transition hover:-translate-y-2 shadow-[0_4px_20px_rgba(255,210,63,0.15)]">
              <div className="mb-6 text-[#1F2937] flex justify-center items-center">
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
      
      {/* ================= ACTIVE HACKATHONS ================= */}
      <HomeHackathonSection />
      {/* ================= PARTNER LOGOS ================= */}
      <PartnerSection />

      <TestimonialSection />

      {/* <HackathonWinners /> */}
      {/* ================= CTA BANNER ================= */}
      {/* <CTASection /> */}
    </main>
  );
}
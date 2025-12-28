import HomeHackathonSection from "./HomeHackathonSlider";
import StatCard from "./StatsSection";
import CTASection from "./CTASection";

export default function First() {
  return (
    <main className="bg-white">
      {/* ================= CATEGORIES / DOMAINS ================= */}
      {/* <section className="py-24 bg-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0C121D] mb-4">
            Choose Your Mission
          </h2>
          <p className="text-[#6C757D] max-w-2xl mx-auto mb-12">
            From creative sprints to data combat — pick the battlefield that
            suits your skill.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Human Resources Hack Battles",
              "Content Strategy Challenges",
              "Graphic Design Combat",
              "Data Science & Analytics Missions",
              "Video Editing Showdowns",
              "Sales & Marketing Faceoffs",
              "Digital Marketing Ops",
              "UI/UX Design Quests",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 hover:shadow-lg transition text-left"
              >
                <h4 className="font-semibold text-[#0C121D]">{item}</h4>
                <p className="text-sm text-[#6C757D] mt-2">
                  Every domain has a different path to victory.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0C121D] mb-4 bg-gradient-to-br from-[#F8C62F] to-[#FE8235]">
            Choose Your Mission
            <span className="relative inline-block ml-2">
              <span className=" w-full h-2 text-2xl text-[#F8C62F]/60 ">
                From creative sprints to data combat — pick the battlefield that
                suits your skill.
              </span>
            </span>
          </h2>

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

      {/* ================= ABOUT ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#0C121D] mb-6">
              Reinventing Hackathons as Esports
            </h2>
            <p className="text-[#6C757D] mb-6">
              Graphura blends coding, creativity, and competition into a
              high-energy experience where learning becomes a leaderboard
              challenge.
            </p>

            <ul className="space-y-3">
              {[
                "Game-mode learning",
                "Flexible, online participation",
                "Industry-relevant tasks",
                "Growth-focused tech ecosystem",
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#F8C62F] rounded-full"></span>
                  {point}
                </li>
              ))}
            </ul>

            <button className="mt-8 bg-[#03594E] text-white px-8 py-4 rounded-lg hover:bg-[#1AB69D] transition">
              Discover Who We Are
            </button>
          </div>
        </div>
      </section>
      {/* ================= ACTIVE HACKATHONS ================= */}
      <HomeHackathonSection />
      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">What Players Are Saying</h2>

          <div className="space-y-6">
            {[
              "It felt like a real-time strategy game with actual results.",
              "The leaderboard experience pushed me to outperform myself.",
              "Best innovation battle I’ve participated in so far.",
              "Great mentors and electrifying competition.",
            ].map((quote, i) => (
              <blockquote
                key={i}
                className="bg-[#F5F7F9] p-6 rounded-xl italic"
              >
                “{quote}”
              </blockquote>
            ))}
          </div>

          <button className="mt-10 bg-[#03594E] text-white px-8 py-4 rounded-lg">
            More Success Stories
          </button>
        </div>
      </section>
      {/* ================= CTA BANNER ================= */}
      {/* <section className="py-24 bg-[#03594E] text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready To Enter a New Level of Innovation?
        </h2>
        <p className="mb-8">
          Get your squad, pick a mission, and compete in the ultimate coding
          battle.
        </p>

        <div className="flex justify-center gap-6">
          <button className="bg-[#F8C62F] text-black px-8 py-4 rounded-lg font-semibold">
            Join the Next Hackathon
          </button>
          <button className="border border-white px-8 py-4 rounded-lg">
            Contact Our Team
          </button>
        </div>
      </section> */}
      <CTASection />
    </main>
  );
}

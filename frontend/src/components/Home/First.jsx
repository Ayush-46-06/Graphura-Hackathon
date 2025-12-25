
      import Counter from "./Stats";
export default function First() {
  return (
    <main className="bg-white">
      {/* ================= CATEGORIES / DOMAINS ================= */}
      <section className="py-24 bg-[#F5F7F9]">
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
      </section>
      {/* ================= COUNTERS ================= */}
      <section className="py-24 bg-[#03594E] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Global Game Stats</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Counter end={20} />
              <p className="mt-2">Hackathons Hosted</p>
            </div>

            <div>
              <Counter end={950} />
              <p className="mt-2">Active Participants</p>
            </div>

            <div>
              <Counter end={13} />
              <p className="mt-2">Universities Collaborating</p>
            </div>

            <div>
              <Counter end={7} />
              <p className="mt-2">Corporate Partners</p>
            </div>
          </div>

          <p className="mt-12 text-white/80">
            The map is expanding. So is your opportunity.
          </p>
        </div>
      </section>
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
      <section className="py-24 bg-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Live Missions You Can Join Right Now
          </h2>
          <p className="text-[#6C757D] mb-12">
            Registration open. Rankings begin the moment you enter.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Trending Challenges",
              "High-Reward Missions",
              "Spotlight Hackathons",
            ].map((type, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-semibold">{type}</h4>
                <p className="text-sm text-[#6C757D] mt-2">
                  Time to make your move.
                </p>
              </div>
            ))}
          </div>

          <button className="mt-12 bg-[#F8C62F] text-black px-8 py-4 rounded-lg font-semibold">
            View All Hackathons
          </button>
        </div>
      </section>
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
      <section className="py-24 bg-[#03594E] text-white text-center">
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
      </section>
    </main>
  );
}

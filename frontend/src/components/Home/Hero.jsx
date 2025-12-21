export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#03594E]">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-white text-[46px] leading-tight mb-6">
            Discover, Learn,
            <br />
            and Grow Smarter
            <br />
            with{" "}
            <span className="relative inline-block text-[#F8C62F]">
              Graphura
              <span className="absolute left-0 -bottom-2 w-full h-3 bg-[#F8C62F]/40 -z-10"></span>
            </span>
          </h1>

          <p className="text-white/80 max-w-xl mb-10">
            Graphura offers expert-led courses, modern tools, and a supportive
            environment to help learners grow, achieve success, and build a
            brighter future.
          </p>

          <button className="bg-[#F8C62F] text-black px-8 py-4 rounded-lg font-semibold hover:scale-105 transition">
            Find Courses →
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          {/* BACK CIRCLE */}
          <div className="absolute w-[420px] h-[420px] bg-[#1AB69D]/40 rounded-full"></div>

          {/* MAIN IMAGE */}
          <img
            src="https://ordainit.com/html/educeet/assets/img/hero/hero-1-1.png"
            alt="Student"
            className="relative z-10 w-[420px]"
          />

          {/* CARD 1 — ONLINE VIDEO COURSES */}
          <div className="absolute top-16 right-0 bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-[260px]">
            <div className="w-14 h-14 bg-[#03594E] rounded-full flex items-center justify-center">
              {/* VIDEO SVG */}
              <svg
                width="38"
                height="35"
                viewBox="0 0 38 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path d="M35.0078 2.83038H32.978..." fill="white" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                Online Video Courses
              </span>
              <p className="text-xl font-bold text-black">
                10k<span className="text-[#F8C62F]">+</span>
              </p>
            </div>
          </div>

          {/* CARD 2 — ACTIVE STUDENTS */}
          <div className="absolute bottom-16 left-0 bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-[260px]">
            <div className="w-14 h-14 bg-[#F8C62F] rounded-full flex items-center justify-center">
              {/* STUDENT SVG */}
              <svg
                width="33"
                height="41"
                viewBox="0 0 33 41"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
              >
                <path d="M27.9395 26.5646L25.6094..." fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-gray-600">Active Students</span>
              <p className="text-xl font-bold text-black">
                15k<span className="text-[#F8C62F]">+</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

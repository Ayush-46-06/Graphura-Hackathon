import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CurrentResults from './CurrentResults';
import PastResults from './PastResults';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Results = () => {
  // Mock Data
  const pastHackathons = [
  {
    id: 1,
    title: "WEB DEVELOPMENT HACKATHON",
    category: "WEB DEVELOPMENT",
    date: "18 Oct 2025",
    winners: [
      "results_img/winner1.webp",
      "results_img/testimonial1.webp",
      "results_img/testimonial2.webp",
    ],
  },
  {
    id: 2,
    title: "AI / ML INNOVATION CHALLENGE",
    category: "AI / ML",
    date: "15 Oct 2025",
    winners: [
      "results_img/winner2.webp",
      "results_img/testimonial3.webp",
      "results_img/testimonial4.webp",
    ],
  },
  {
    id: 3,
    title: "CYBER SECURITY HACKATHON",
    category: "CYBER SECURITY",
    date: "10 Oct 2025",
    winners: [
      "results_img/winner3.webp",
      "results_img/testimonial1.webp",
      "results_img/testimonial3.webp",
    ]

  },
];


  return (
    
    <div className="bg-white min-h-screen font-[var(--it-ff-body)]">

      {/* NAVBAR */}
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <section
        className="
          mt-[80px]
          relative
          overflow-hidden
          min-h-[500px] md:min-h-[600px] lg:min-h-[650px]
          flex items-center
          bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]
        "
      >
        {/* Floating background accents (slightly sharper than About) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-28 left-12 w-72 h-72 bg-[#1AB69D]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-16 w-96 h-96 bg-[#0FB9A8]/25 rounded-full blur-3xl" />
        </div>

        {/* CONTENT GRID */}
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="relative">
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
          Results & Announcements
        </span>

        {/* Heading */}
        <h1
          className="
            text-4xl md:text-5xl lg:text-6xl
            leading-[1.15]
            font-[var(--it-ff-heading)]
            text-white
            mb-8
            drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)]
            opacity-0 hero-fade-up delay-200
          "
        >
          Official Hackathon <br />

          <span className="relative inline-block">
            <span className="relative z-10">Results</span>

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

          <span className="block mt-2">& Announcements</span>
        </h1>

        {/* Description */}
        <p
          className="
            text-white/85
            text-lg md:text-xl
            max-w-xl
            mb-10
            leading-relaxed
            opacity-0 hero-fade-up delay-300
          "
        >
          Discover declared winners, track upcoming result announcements,
          and relive the best moments from every Graphura hackathon.
        </p>
      </div>


          {/* RIGHT VISUAL */}
          <div className="relative opacity-0 hero-image-in delay-400">
            <img
              src="/results_img/results-hero.webp"
              alt="Hackathon Results"
              className="
                rounded-2xl
                shadow-2xl
                border border-white/10
              "
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E6F4F1]/70 to-transparent" />


      {/* --- CURRENT HACKATHONS --- */}
      <CurrentResults/>

      {/* --- PAST HACKATHONS --- */}
      <PastResults pastHackathons={pastHackathons}/>

      {/* FOOTER */}
      <Footer />

    </div>
    
  );
};

export default Results;
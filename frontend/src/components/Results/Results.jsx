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
import Footer from '../Footer';

const Results = () => {
  // Mock Data
  const currentHackathons = [
    { id: 1, title: "WEB DEVELOPMENT", date: "20 Oct 2025", timeLeft: "23h 48m 21s", name: "GLOBAL WEB CHALLENGE" },
    { id: 2, title: "AI / ML", date: "22 Oct 2025", timeLeft: "10h 05m 11s", name: "NEURAL MATRIX 2.0" },
    { id: 3, title: "CYBER SECURITY", date: "25 Oct 2025", timeLeft: "45h 12m 00s", name: "SHIELD HACKATHON" },
  ];

  const pastHackathons = [
  {
    id: 1,
    title: "WEB DEVELOPMENT HACKATHON",
    category: "WEB DEVELOPMENT",
    date: "18 Oct 2025",
    winners: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    ],
  },
  {
    id: 2,
    title: "AI / ML INNOVATION CHALLENGE",
    category: "AI / ML",
    date: "15 Oct 2025",
    winners: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    ],
  },
  {
    id: 3,
    title: "CYBER SECURITY HACKATHON",
    category: "CYBER SECURITY",
    date: "10 Oct 2025",
    winners: [
  "https://i.pravatar.cc/300?img=12",
  "https://i.pravatar.cc/300?img=25",
  "https://i.pravatar.cc/300?img=47",
]

  },
];


  return (
    <div className="bg-white min-h-screen font-[var(--it-ff-body)]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070')` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45))]"></div>
  <div className="absolute inset-0 bg-gradient-to-br from-[#022F2A]/97 via-[#024C42]/90 to-[#0A6F63]/75"></div>

        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title text-5xl md:text-7xl font-[var(--it-ff-heading)] mb-6">
            Official Hackathon <br /> Results & Announcements
          </h1>

          <p className="hero-subtitle text-white/75 max-w-2xl mx-auto text-lg">
            Track upcoming declarations and explore declared champions.
          </p>
        </div>

      </section>

      {/* --- CURRENT HACKATHONS --- */}
      <CurrentResults/>

      {/* --- PAST HACKATHONS --- */}
      <PastResults pastHackathons={pastHackathons}/>

    {/* FOOTER */}
          <Footer />

      <style>
        {`
          .hero-title {
            opacity: 0;
            transform: translateY(24px);
            animation: heroFadeUp 1s ease-out forwards;
          }

          .hero-subtitle {
            opacity: 0;
            transform: translateY(20px);
            animation: heroFadeUp 1s ease-out forwards;
            animation-delay: 0.3s;
          }

          @keyframes heroFadeUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
    
  );
};

export default Results;
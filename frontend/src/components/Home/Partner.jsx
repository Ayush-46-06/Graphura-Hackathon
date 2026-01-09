import React, { useEffect, useRef, useState } from "react";
import { BookOpen, GraduationCap, Book, Home } from "lucide-react";

export default function Partner() {
  const decorativeRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const logos = [
    { name: "Gardennook", icon: BookOpen, colors: "from-blue-400 to-pink-400" },
    {
      name: "Education",
      icon: GraduationCap,
      colors: "from-red-500 to-blue-500",
    },
    { name: "Penbook", icon: Book, colors: "from-blue-600 to-blue-400" },
    { name: "Eduhouse", icon: Home, colors: "from-blue-500 to-orange-400" },
    {
      name: "Learning Center",
      icon: BookOpen,
      colors: "from-orange-400 to-blue-400",
    },
    { name: "Book Chat", icon: Book, colors: "from-pink-500 to-pink-400" },
    {
      name: "Owlbook",
      icon: GraduationCap,
      colors: "from-blue-500 to-orange-400",
    },
    {
      name: "University",
      icon: GraduationCap,
      colors: "from-blue-600 to-red-500",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (decorativeRef.current) {
        const element = decorativeRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(
            Math.max((windowHeight - rect.top) / windowHeight, 0),
            1
          );
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateX = 100 - scrollProgress * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="container mx-auto px-8 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-16 max-w-5xl mx-auto leading-tight">
          The trusted market leader in talent transformation through{" "}
          <span className="relative inline-block">
            education
            <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-400 -z-10 transform -skew-y-1"></span>
          </span>
        </h1>

        {/* Logos Grid with rounded bottom */}
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-teal-50 rounded-t-3xl p-12 shadow-lg relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${logo.colors} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <logo.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-gray-700 font-semibold text-center text-sm">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>

          {/* Curved bottom edge with wave */}
          <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
            <svg
              className="w-full h-24"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z"
                fill="url(#gradient)"
                className="opacity-100"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#ccfbf1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* * Decorative Wave Pattern - Animated on Scroll */}
        <div
          ref={decorativeRef}
          className="relative overflow-hidden h-64 -mt-1"
        >
          {/* Background continuation */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-white"></div>

          {/* Light wave line across the top */}
          <div className="absolute top-0 left-0 w-full">
            <svg
              className="w-full h-8"
              viewBox="0 0 1200 30"
              preserveAspectRatio="none"
            >
              <path
                d="M0,15 Q300,5 600,15 T1200,15"
                stroke="#e5e7eb"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
          </div>

        </div>

    
      </main>
    </div>
  );
}
import React from "react";
import { Play, Users, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden h-screen bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-[#1AB69D]/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-[#F8C62F]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-20 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] lg:min-h-0">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left fade-in-animation flex flex-col justify-center items-center lg:items-start">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#F8C62F]" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                Top-Rated Learning Platform
              </span>
            </div>

            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover, Learn,
              <br className="hidden sm:block" />
              and Grow Smarter
              <br className="hidden sm:block" />
              with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#F8C62F]">Graphura</span>
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-3 sm:h-4 bg-[#F8C62F]/30 -z-0 transform -skew-x-12"></span>
              </span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
              Graphura offers expert-led courses, modern tools, and a supportive
              environment to help learners grow, achieve success, and build a
              brighter future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/hackathons")}
                className="group bg-[#F8C62F] text-[#0C121D] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-[#e0b429] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#F8C62F]/50 flex items-center justify-center gap-2"
              >
                Join Hackathon
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
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
              </button>
              <button
                onClick={() => navigate("/all-blog")}
                className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Upcoming Battles
              </button>
            </div>
          </div>

          {/* Image section - hidden on mobile, visible on tablet and desktop */}
          <div className="hidden md:flex relative justify-center items-center mt-8 lg:mt-0 lg:justify-end min-h-[400px] lg:min-h-[700px]">
            {/* Animated background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px] bg-[#1AB69D]/30 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Spinning border ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] lg:w-[420px] lg:h-[420px] border-4 border-white/10 rounded-full spin-slow-animation"></div>
            </div>

            {/* Main image container */}
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[600px] -mb-28 flex items-center justify-center z-10">
              <img
                src="https://ordainit.com/html/educeet/educeet/assets/img/hero/hero-1-1.png"
                alt="Student learning"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating stat cards - optimized positioning with higher z-index */}
            <div className="absolute top-20 sm:top-8 lg:top-25 right-4 sm:right-8 lg:-right-8 bg-white px-3 sm:px-5 lg:px-6 py-2.5 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px] sm:w-[200px] lg:w-[280px] hover:scale-105 transition-transform float-animation z-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#03594E] to-[#1AB69D] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] lg:text-sm text-gray-500 font-medium block">
                  Video Courses
                </span>
                <p className="text-sm sm:text-lg lg:text-2xl font-bold text-[#0C121D]">
                  8<span className="text-[#F8C62F]">+</span>
                </p>
              </div>
            </div>

            <div
              className="absolute bottom-8 sm:bottom-12 lg:bottom-35 left-4 sm:left-8 lg:left-0 bg-white px-3 sm:px-5 lg:px-6 py-2.5 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px] sm:w-[200px] lg:w-[280px] hover:scale-105 transition-transform float-animation z-20"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#F8C62F] to-[#FE8235] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-[#0C121D]" />
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] lg:text-sm text-gray-500 font-medium block">
                  Active Students
                </span>
                <p className="text-sm sm:text-lg lg:text-2xl font-bold text-[#0C121D]">
                  15k<span className="text-[#F8C62F]">+</span>
                </p>
              </div>
            </div>

            <div
              className="absolute w-[140px] sm:w-[180px] lg:w-[280px] top-[55%] sm:top-[60%] lg:top-[65%] -translate-y-1/2 right-2 sm:right-4 lg:-right-20 bg-white px-3 sm:px-5 lg:px-6 py-2.5 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl hover:scale-105 transition-transform float-animation z-20"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#1AB69D] to-[#03594E] rounded-md sm:rounded-lg lg:rounded-xl flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500">
                    Success Rate
                  </span>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-[#0C121D]">
                    98%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 C360,100 720,0 1080,50 C1200,65 1320,80 1440,80 L1440,100 L0,100 Z"
            fill="white"
            fillOpacity="0.1"
          />
          <path
            d="M0,70 C360,30 720,90 1080,60 C1200,50 1320,40 1440,50 L1440,100 L0,100 Z"
            fill="white"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .spin-slow-animation {
          animation: spin-slow 20s linear infinite;
        }

        .fade-in-animation {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
}
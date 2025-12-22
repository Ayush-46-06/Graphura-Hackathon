import React from 'react';
import { Play, Users, BookOpen, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1AB69D]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F8C62F]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 animate-fade-in">
          
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-[#F8C62F]" />
              <span className="text-white/90 text-sm font-medium">Top-Rated Learning Platform</span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl font-bold leading-tight">
              Discover, Learn,
              <br />
              and Grow Smarter
              <br />
              with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#F8C62F]">Graphura</span>
                <span className="absolute left-0 bottom-2 w-full h-4 bg-[#F8C62F]/30 -z-0 transform -skew-x-12"></span>
              </span>
            </h1>

            
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              Graphura offers expert-led courses, modern tools, and a supportive
              environment to help learners grow, achieve success, and build a
              brighter future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group bg-[#F8C62F] text-[#0C121D] px-8 py-4 rounded-xl font-bold hover:bg-[#e0b429] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#F8C62F]/50 flex items-center gap-2">
                Find Courses
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
              <div>
                <p className="text-[#F8C62F] text-3xl font-bold">10k+</p>
                <p className="text-white/70 text-sm">Video Courses</p>
              </div>
              <div>
                <p className="text-[#F8C62F] text-3xl font-bold">15k+</p>
                <p className="text-white/70 text-sm">Active Students</p>
              </div>
              <div>
                <p className="text-[#F8C62F] text-3xl font-bold">500+</p>
                <p className="text-white/70 text-sm">Expert Instructors</p>
              </div>
            </div>
          </div>

       
          <div className="relative flex justify-center lg:justify-end">
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[450px] h-[450px] bg-[#1AB69D]/30 rounded-full blur-2xl animate-pulse"></div>
            </div>

            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[420px] h-[420px] border-4 border-white/10 rounded-full animate-spin-slow"></div>
            </div>

            
            <div className="relative z-10 w-[420px] h-[420px] flex items-center justify-center">
              <img
                src="https://ordainit.com/html/educeet/educeet/assets/img/hero/hero-1-1.png"
                alt="Student learning"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            
            <div className="absolute top-6 -right-4 lg:right-8 bg-white px-6 py-5 rounded-2xl shadow-2xl flex items-center gap-4 w-[280px] hover:scale-105 transition-transform animate-float">
              <div className="w-16 h-16 bg-gradient-to-br from-[#03594E] to-[#1AB69D] rounded-2xl flex items-center justify-center shadow-lg">
                <Play className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-sm text-gray-500 font-medium block">
                  Online Video Courses
                </span>
                <p className="text-2xl font-bold text-[#0C121D]">
                  10k<span className="text-[#F8C62F]">+</span>
                </p>
              </div>
            </div>

            
            <div className="absolute bottom-8 -left-4 lg:left-0 bg-white px-6 py-5 rounded-2xl shadow-2xl flex items-center gap-4 w-[280px] hover:scale-105 transition-transform animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#F8C62F] to-[#FE8235] rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-[#0C121D]" />
              </div>
              <div>
                <span className="text-sm text-gray-500 font-medium block">
                  Active Students
                </span>
                <p className="text-2xl font-bold text-[#0C121D]">
                  15k<span className="text-[#F8C62F]">+</span>
                </p>
              </div>
            </div>

           
            <div className="absolute top-1/2 -translate-y-1/2 -right-8 lg:right-0 bg-white px-5 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1AB69D] to-[#03594E] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#0C121D]">98%</p>
                  <span className="text-xs text-gray-500">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C360,100 720,0 1080,50 C1200,65 1320,80 1440,80 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
          <path d="M0,70 C360,30 720,90 1080,60 C1200,50 1320,40 1440,50 L1440,100 L0,100 Z" fill="white" fillOpacity="0.05"/>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
}
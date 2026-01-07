import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate transform based on scroll position
  const spiralTransform = `translateY(${Math.min(scrollY * 0.3, 200)}px)`;

  return (
    <footer className="relative overflow-visible mt-40">
      {/* Newsletter Section - Positioned to overlap */}
      <div className="absolute left-0 right-0 -top-28 z-30 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-teal-800 rounded-2xl py-10 px-8 md:px-12 relative overflow-hidden shadow-2xl">
            {/* Decorative curved lines */}
            <div className="absolute inset-0 opacity-20">
              <svg
                className="absolute top-0 right-0 w-1/2 h-full"
                viewBox="0 0 400 300"
                fill="none"
              >
                <path
                  d="M 0,150 Q 100,50 200,150 T 400,150"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-yellow-400"
                />
                <path
                  d="M 0,180 Q 100,80 200,180 T 400,180"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-yellow-400"
                />
              </svg>
            </div>

            <div className="relative z-20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Sign Up today to get the latest inspiration & insights
                  </h2>
                </div>
                <div className="w-full md:w-auto md:min-w-[380px]">
                  <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
                    <input
                      type="email"
                      placeholder="Enter Your Email Address"
                      className="flex-1 px-6 py-4 text-gray-700 outline-none"
                    />
                    <button className="bg-teal-700 hover:bg-teal-600 text-white px-6 transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        className="relative pt-36 pb-20"
        style={{
          background:
            "linear-gradient(135deg, #e8f4f8 0%, #fce4ec 25%, #fff9e6 50%, #fce4ec 75%, #e8f4f8 100%)",
        }}
      >
        {/* Decorative dots pattern on left with upward-downward animation */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-5 gap-3 animate-float">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-teal-600 opacity-60"
            />
          ))}
        </div>

        {/* Rotating spiral dots pattern on right */}
        <div className="absolute right-8 top-0 w-56 h-56 hidden lg:block">
          <div className="w-full h-full animate-spin-slow">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Generate spiral dots */}
              {(() => {
                const dots = [];
                const centerX = 150;
                const centerY = 150;
                const totalDots = 200;
                const maxRadius = 135;

                for (let i = 0; i < totalDots; i++) {
                  const angle = i * 0.5; // Golden angle for spiral
                  const radius = (i / totalDots) * maxRadius;
                  const x = centerX + radius * Math.cos(angle);
                  const y = centerY + radius * Math.sin(angle);

                  // Dot size increases towards edge
                  const dotSize = 1 + (i / totalDots) * 2;
                  const opacity = 0.5 + (i / totalDots) * 0.4;

                  dots.push(
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={dotSize}
                      fill="#D1D5DB"
                      opacity={opacity}
                    />
                  );
                }
                return dots;
              })()}
            </svg>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          @keyframes float {
            0%,
            100% {
              transform: translate(0, -50%);
            }
            50% {
              transform: translate(0, calc(-50% + 20px));
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 - Logo & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  Educeet
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Graphura — Where Hackathons Meet Esports.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
                <span>→</span>
              </Link>
            </div>

            {/* Column 2 - Useful Links */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-6">
                Quick Navigation
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hackathons"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Hackathons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/results"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Winners
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partner"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Our Company */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-6">
                Support Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/all-blog"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rules"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Rules
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Get Contact */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-6">
                Get Contact
              </h4>
              <ul className="space-y-4 mb-6">
                <li className="text-gray-600">
                  <span className="font-semibold text-gray-800">Phone:</span>{" "}
                  <a
                    href="tel:+91123456789"
                    className="hover:text-teal-600 transition-colors"
                  >
                    +91 7378021327
                  </a>
                </li>
                <li className="text-gray-600">
                  <span className="font-semibold text-gray-800">Email:</span>{" "}
                  <a
                    href="mailto:educeet@gmail.com"
                    className="hover:text-teal-600 transition-colors"
                  >
                    support@graphura.in
                  </a>
                </li>
                <li className="text-gray-600">
                  <span className="font-semibold text-gray-800">Location:</span>{" "}
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal-600 transition-colors"
                  >
                    Graphura India Private Limited, near RSF, Pataudi, Gurgaon,
                    Haryana 122503
                  </a>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-800 hover:text-teal-600 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-teal-600 transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-teal-600 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-teal-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-5">
        <p className="text-center text-gray-400 text-sm">
          Copyright © 2025{" "}
          <a
            href="#"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
          >
            Ordainit
          </a>{" "}
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
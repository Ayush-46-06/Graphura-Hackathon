import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 overflow-hidden">
      <div className="container mx-auto px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white z-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready To Get{" "}
              <span className="relative inline-block">
                Started?
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 5 100 2 150 3C200 4 250 7 298 10"
                    stroke="#FCD34D"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Let's Talk To Us Today
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Learning Now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-yellow-300 to-green-400 rounded-full opacity-80"></div>

            {/* Dots Pattern */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 grid grid-cols-5 gap-2 opacity-60">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.02 }}
                  className="w-2 h-2 bg-teal-800 rounded-full"
                />
              ))}
            </div>

            {/* Student Image Placeholder */}
            <div className="relative z-10 w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden ">
                {/* Image placeholder - replace with actual image */}
                {/* <div className="aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="text-center p-8">
                    <svg
                      className="w-24 h-24 mx-auto mb-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">
                      Replace with your image:
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Add an img tag with src pointing to your image
                    </p>
                  </div>
                </div> */}
                {/* To add your image, replace the div above with: */}
                <img
                  src="https://ordainit.com/html/educeet/educeet/assets/img/cta/thumb.png"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Yellow Book/Folder Element */}
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-8 -right-4 w-32 h-40 bg-yellow-400 rounded-lg shadow-xl transform rotate-12"
              >
                <div className="w-full h-full border-4 border-yellow-500 rounded-lg"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-8 right-8 bg-teal-800 hover:bg-teal-900 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
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
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </section>
  );
};

export default CTASection;

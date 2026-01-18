import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialSection = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ================= FETCH REVIEWS ================= */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/review");
        setReviews(res.data.review || []);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    fetchReviews();
  }, []);

  if (!reviews.length) return null;

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % reviews.length);

  const prev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );

  const current = reviews[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16">
          What Our Interns Say
        </h2>

        {/* Testimonial Card */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-8 h-full">

              {/* Image */}
              <div className="md:col-span-2 relative h-96 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800" />
                <img
                  src={current?.user?.image}
                  alt={current?.user?.name}
                  className="w-full h-full object-cover  opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-between">
                <Quote className="w-16 h-16 text-teal-600 opacity-50 mb-6" />

                <p className="text-gray-700 md:text-lg leading-relaxed line-clamp-6">
                  {current?.text}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-gray-900">
                    {current?.user?.name}
                  </h4>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? "w-12 h-3 bg-teal-600"
                  : "w-3 h-3 bg-gray-300 hover:bg-teal-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

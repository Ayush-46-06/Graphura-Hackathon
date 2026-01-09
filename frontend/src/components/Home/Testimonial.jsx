import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Christopher Story",
      role: "Software Developer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      text: "Educeet transformed my learning journey! The platform is intuitive, the courses are top-notch, and the support is exceptional. I've gained real skills and confidence. Highly recommended for anyone serious about education.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      role: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      text: "The quality of instruction on Educeet is outstanding. I've taken multiple courses and each one has exceeded my expectations. The interactive learning approach really helps concepts stick.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      text: "What sets Educeet apart is the community and mentorship. I not only learned new skills but also connected with professionals in my field. It's been invaluable for my career growth.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-20 px-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-teal-600 border-dashed rounded-full opacity-20"></div>
      <div className="absolute top-20 left-40 w-40 h-40 border-4 border-teal-600 border-dashed rounded-full opacity-20"></div>

      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-6 py-2 rounded-full bg-teal-100 text-teal-700 font-medium text-sm border border-teal-200">
            Testimonial
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20 leading-tight">
          What Our Learners Say About
          <br />
          <span className="text-teal-600">Educeet's Impact and Value</span>
        </h2>

        {/* Testimonial Card */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Image Section */}
              <div className="md:col-span-2 relative h-96 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800"></div>
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover mix-blend-overlay opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <Quote className="w-16 h-16 text-teal-600 mb-6 opacity-50" />

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                  {currentTestimonial.text}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-teal-600 font-medium">
                      {currentTestimonial.role}
                    </p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
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
            onClick={prevTestimonial}
            className="absolute left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-12 h-3 bg-teal-600"
                  : "w-3 h-3 bg-gray-300 hover:bg-teal-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
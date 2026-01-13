import React, { useEffect, useState } from "react";
import Graph from "../Career/Graph";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ChevronLeft, ChevronRight, Quote, University } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Career = () => {
  const [open, setOpen] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);

  const faqQuestions = [
    "What is the Graphothon Career Program?",
    "Who can apply for roles on the career page?",
    "Do I need technical skills to join the Graphothon team?",
    "What types of roles are available?",
    "Are these roles paid or unpaid?",
    "Will I receive a certificate for volunteering or mentoring?",
    "What is the time commitment?",
    "Can I apply while also participating in the hackathon?",
    "Will training or orientation be provided?",
    "How will I know if I am selected?",
    "Do mentors need previous hackathon experience?",
    "Can I work remotely as a volunteer or mentor?",
    "What benefits do I get from joining the Graphothon team?",
    "How long does the recruitment process take?",
    "How do I apply?",
  ];

  const faqAnswers = [
    "The Graphothon Career Program offers opportunities for students and professionals to contribute as volunteers, mentors, coordinators, and organizers during the hackathon.",

    "Anyone with enthusiasm for innovation, event management, mentoring, or community building—whether technical or non-technical—can apply.",

    "Not at all. We offer roles for both tech and non-tech applicants, including operations, design, marketing, content, mentor support, logistics, and more.",

    "You can apply as: Volunteer, Mentor, Event Coordinator, Technical Support, Social Media Handler, Judge (expert-level), Community Ambassador, or Sponsorship & Partnerships Assistant.",

    "Most roles are voluntary, but selected key positions may include perks such as certificates, goodies, networking opportunities, and priority access to future Graphothon events.",

    "Yes, all selected volunteers, mentors, and coordinators receive an official Graphothon Experience Certificate recognizing their contribution.",

    "Time requirements vary based on your role. Volunteers generally commit 3–5 hours per week before the event, while mentors and coordinators have flexible schedules.",

    "You must choose either team participation or event volunteering/mentoring to avoid conflicts of interest.",

    "Yes, all selected applicants receive training, documentation, and onboarding sessions to clearly understand their responsibilities.",

    "Once you submit your application, our team will review your profile. Shortlisted applicants will receive an email or call from the Graphothon organizing committee.",

    "Not required, but prior experience in tech, business, or creative fields helps with guiding participants effectively.",

    "Yes. Many roles—such as social media, content creation, and mentoring—are fully remote and flexible.",

    "Benefits include certificates, LinkedIn credibility, networking with industry experts, priority access to future events, mentorship experience, behind-the-scenes exposure to hackathon management, and leadership opportunities.",

    "The recruitment process usually takes 3–7 days after application, depending on the role and number of applicants.",

    "Simply click the Apply Now button on the career page, select your preferred role, and fill out the application form.",
  ];

  const logos = [
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700392/Hindustan_times_slsorl",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700392/Deewal_aa6obw",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700378/Accenture_bfsucq",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700378/Bajaj_sgqhky",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700377/TheAstroTalk_ztw8sq",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700377/Leans_Kart_tbzjbu",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700377/myntra_b6ov9v",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767700378/4.policy_bazar_luk32a",
  ];

  //getting testimonial reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/review");
        setReviews(res.data.review);
      } catch (err) {
        console.error("error fetching reviews", err);
      }
    };
    fetchReviews();
  }, []);

  const internshipRoles = [
    {
      title: "Front-end Developer Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767275491/Gemini_Generated_Image_qe339nqe339nqe33_jbuke1.png",
      desc: "Craft engaging user interfaces with HTML, CSS, and JavaScript. Build responsive, interactive web experiences.",
    },
    {
      title: "Back-end Developer Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767276474/Gemini_Generated_Image_kxptt9kxptt9kxpt_kwqa0v.png",
      desc: "Building robust server-side applications, databases, and APIs to power dynamic web experiences.",
    },
    {
      title: "Data Analytics Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767425709/Gemini_Generated_Image_p7syonp7syonp7sy_wbpmwj.png",
      desc: "Building robust server-side applications, databases, and APIs to power dynamic web experiences.",
    },
    {
      title: "Graphic Design Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767425885/Gemini_Generated_Image_wga88gwga88gwga8_fvfimt.png",
      desc: "Building robust server-side applications, databases, and APIs to power dynamic web experiences.",
    },
    {
      title: "Sales & Marketing Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767425991/Gemini_Generated_Image_fm1tijfm1tijfm1t_wrp74z.png",
      desc: "Building robust server-side applications, databases, and APIs to power dynamic web experiences.",
    },
    {
      title: "Content Creators Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767426125/Gemini_Generated_Image_z988f4z988f4z988_qd6xxk.png",
      desc: "Building robust server-side applications, databases, and APIs to power dynamic web experiences.",
    },
    {
      title: "Content Writers Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767426125/Gemini_Generated_Image_z988f4z988f4z988_qd6xxk.png",
      desc: "Building robust server-side applications, databases, and APIs to power dynamic web experiences.",
    },
    {
      title: "Human Resource Internship",
      img: "https://res.cloudinary.com/drq2a0262/image/upload/v1767276525/Gemini_Generated_Image_a8moe3a8moe3a8mo_gy1e7y.png",
      desc: "Dedicated to understanding people, strengthening teams, and driving organizational success.",
    },
  ];

  // for testimonial/reviews
  const nextReview = () => {
    setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const currentReviews = reviews[currentReview];

  const universities = [
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767859754/brand1-2_w5p2l5.svg",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767859753/brand1-1_ioex5l.svg",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767859752/brand1-3_w0wikb.svg",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767859753/brand1-4_edfuqd.svg",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767859752/brand2-2_lkvyci.svg",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1768289838/brand2-3_km6bbb.svg",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1768290009/brand2-4_vsdtxg.svg",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1768290009/brand2-5_bj0zix.svg"
  ];
  const navigate = useNavigate();
  return (
    <div className="pb-15 overflow-hidden">
      <Navbar />
      {/* hero section */}
      <section className="pt-18 bg-linear-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] flex justify-center">
        <div className="relative px-4 lg:px-8 pt-15 pb-35 md:pb-40 lg:pb-50 flex flex-col gap-3 lg:gap-5 items-center w-full max-w-[1280px] animate-fading-in">
          <h1 className="text-[#F8C62F] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center ">
            <span className="text-white">Start Your</span>
            <br /> Career with Graphura
          </h1>
          <p className="text-white font-medium text-center max-w-[800px] lg:text-lg">
            Graphura Hackathon is your launchpad to real opportunities—where
            talent meets innovation, skills turn into impact, and careers take
            shape through challenges that matter.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="text-[#F8C62F] border border-[#F8C62F] px-5 py-2 rounded-md cursor-pointer hover:bg-[#fab031] hover:text-white active:bg-[#fab031] active:text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            Get Free Consultation
          </button>

          {/* As seen on section */}
          <div className="mt-10">
            <h2 className="w-full text-center text-[#fab031] font-bold text-lg">
              AS SEEN ON
            </h2>
            <div className="w-full overflow-hidden py-6">
            <div className="logo-slider">
              {[...universities, ...universities].map((logo, index) => (
                <div
                  key={index}
                  className="mx-10 flex items-center cursor-pointer"
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="h-20 w-auto object-contain transition"
                  />
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* hero section image */}
          <div className="border-4 border-white absolute bottom-[-8%] sm:bottom-[-20%] w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] rounded-xl overflow-hidden floating">
            <img
              src="https://res.cloudinary.com/drq2a0262/image/upload/v1767178175/estee-janssens-zEqkUMiMxMI-unsplash_wqosou.jpg"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* current inters graph and departemnt */}
      <section className="flex justify-center">
        <div className="mt-30 sm:mt-50 md:mt-60 flex flex-col items-center gap-5 lg:flex-row lg:items-start justify-around mx-4 lg:mx-8 w-full max-w-[1280px]">
          <Graph />
          <div className="px-4 max-w-[400px]">
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
              Grow with Data-Driven Opportunities
            </h2>
            <p className="text-gray-500 mt-2">
              At Graphura, we believe in transparency and growth. Our internship
              programs are designed to provide real-world experience across
              various high-demand technical and creative fields. Join a
              community that is rapidly expanding and making a significant
              impact.
            </p>
            <button
              onClick={() => navigate("/all-blog")}
              className="border border-[#fab031] text-[#fab031] hover:bg-[#fab031] py-2 px-4 rounded-md hover:text-white font-medium mt-5 cursor-pointer active:bg-[#fab031] active:text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              Learn more about Career
            </button>
          </div>
        </div>
      </section>

      {/* About internship section */}
      <section className="flex justify-center">
        <div className="mt-16 mx-4 lg:mx-8 w-full max-w-[1280px] relative">
          <h1 className="text-xl font-extrabold text-center md:text-2xl lg:text-3xl">
            Transform your career with our internship program
          </h1>

          {/* LEFT ARROW */}
          <button
            className="
        results-prev
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        z-20
        w-12 h-12
        rounded-full
        bg-white
        border
        shadow-md
        flex items-center justify-center
        text-2xl
        text-[#03594E]
        hover:bg-[#E6F4F1]
      "
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            className="
        results-next
        absolute
        right-0
        top-1/2
        -translate-y-1/2
        z-20
        w-12 h-12
        rounded-full
        bg-white
        border
        shadow-md
        flex items-center justify-center
        text-2xl
        text-[#03594E]
        hover:bg-[#E6F4F1]
      "
          >
            ›
          </button>

          <Swiper
            modules={[Navigation]}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={40}
            initialSlide={1}
            navigation={{
              prevEl: ".results-prev",
              nextEl: ".results-next",
            }}
            className="mt-10 overflow-visible"
          >
            {internshipRoles.map((card, index) => (
              <SwiperSlide
                key={index}
                className="results-slide flex justify-center"
              >
                {/* CARD */}
                <div className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden w-[320px] h-100 shadow-lg border border-gray-200 pb-5 bg-white mb-5 ml-5">
                  <div className="h-50 overflow-hidden">
                    <img
                      className="object-cover group-hover:scale-110 duration-200 transition-transform"
                      src={card.img}
                      alt={card.title}
                    />
                  </div>

                  <h3 className="mt-2 mx-6 font-bold text-xl group-hover:text-green-800">
                    {card.title}
                  </h3>

                  <p className="mx-6 mt-2 text-gray-500">{card.desc}</p>

                  <Link
                    to="https://graphura.online/internship.html"
                    className="mx-8 mt-auto text-[#fab031] font-medium"
                  >
                    More about internship →
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* SCALE EFFECT (IMPORTANT) */}
          <style>{`
      .results-slide {
        width: 360px;
        padding: 25px 0;
        transform: scale(0.8);
        opacity: 0.45;
        transition: transform 0.5s ease, opacity 0.5s ease;
      }

      .swiper-slide-prev.results-slide,
      .swiper-slide-next.results-slide {
        transform: scale(0.9);
        opacity: 0.75;
      }

      .swiper-slide-active.results-slide {
        transform: scale(1.08);
        opacity: 1;
      }
    `}</style>
        </div>
      </section>

      {/* Our Recruiters section */}
      <section>
        <div className="mt-20">
          <h1 className="text-xl font-extrabold w-full text-center md:text-2xl lg:text-3xl">
            Our Recruiters
          </h1>
          <p className="text-center mt-2 text-gray-500 font-medium">
            Top companies trust Graphura talent. Join us and get noticed by
            industry leaders.
          </p>
          <div className="w-full overflow-hidden py-6 relative">
            {/* left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-15 sm:w-20 md:w-35 lg:50 xl:w-100 bg-gradient-to-r from-white to-transparent z-20" />

            {/* RIGHT fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-15 sm:w-20 md:w-35 lg:50 xl:w-100 bg-gradient-to-l from-white to-transparent z-20" />

            <div className="logo-slider">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="mx-10 flex items-center cursor-pointer"
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="h-20 w-35 w-auto object-contain transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section>
        <div className="mt-20">
          <h1 className="text-xl font-extrabold w-full text-center md:text-2xl lg:text-3xl">
            What Our Interns Say
          </h1>
          {/* card */}
          <div className="relative max-w-6xl mx-auto mt-15">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
              <div className="grid md:grid-cols-5 gap-8 h-100">
                {/* Image Section */}
                <div className="md:col-span-2 relative h-96 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800"></div>
                  <img
                    src={currentReviews?.user?.image}
                    alt={currentReviews?.user?.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-between">
                  <Quote className="w-16 h-16 text-teal-600 mb-6 opacity-50" />

                  <p className="md:text-lg text-gray-700 leading-relaxed mb-8 line-clamp-5">
                    {currentReviews?.text}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-1">
                        {currentReviews?.user?.name}
                      </h4>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1">
                        <svg
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentReview
                    ? "w-12 h-3 bg-teal-600"
                    : "w-3 h-3 bg-gray-300 hover:bg-teal-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="mt-15 flex justify-center">
        <div className="w-full max-w-[1280px]">
          <h1 className="w-full text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6 px-6 mt-10 flex flex-col items-center">
            {faqQuestions.map((question, index) => (
              <div
                key={index}
                className="border-x-4 border-green-700 rounded-lg px-4 py-2 md:py-4 shadow-lg w-full max-w-[800px] cursor-pointer hover:scale-105 hover:shadow:xl transition-transform duration-300"
              >
                <h3
                  className="group font-semibold text-lg flex justify-between"
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <span className="group-hover:text-yellow-400">
                    {question}
                  </span>
                  <span className="cursor-pointer">
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={`transition-transform duration-300 ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </h3>
                <p
                  className={`text-gray-600 mt-2 overflow-hidden transition-all duration-500 ease-in-out
    ${open === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
  `}
                >
                  {faqAnswers[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Career;

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
    "What is Graphura Hackathon?",
    "Who can participate in Graphura Hackathon?",
    "Do I need prior hackathon experience?",
    "Can I participate individually or in a team?",
    "Is Graphura Hackathon conducted online or offline?",
    "What is the duration of the hackathon?",
    "What domains or themes are covered?",
    "How are projects evaluated?",
  ];

  const faqAnswers = [
   "Graphura Hackathon is a multi-domain innovation hackathon where participants collaborate to solve real-world problems using technology, creativity, and strategic thinking.",
  
    "Students, freshers, professionals, developers, designers, marketers, and innovators from any background are welcome to participate.",

    "No prior experience is required. Beginners are highly encouraged to participate and learn through hands-on collaboration and mentorship.",

    "You can register as an individual or as a team. Team size requirements may vary depending on the hackathon edition.",

    "Graphura Hackathon can be conducted online, offline, or in a hybrid format. Event details are clearly mentioned on the respective hackathon page.",

    "Most Graphura Hackathon events run for 24 to 72 hours, depending on the challenge and format.",

    "Graphura Hackathon covers multiple domains including Web & App Development, AI / ML, Cybersecurity, UI/UX Design, Business & Marketing, Social Impact, and Open Innovation.",

    "Projects are judged based on innovation, problem-solving, execution, feasibility, presentation, and real-world impact.",
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
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561171/0a8d0497-ecca-4135-b047-393bc52ed5e4_removalai_preview_yzpaog",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/bb2bd7b7-dd7e-4e4c-ad9c-482cea8861dc_removalai_preview_pylvja",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/b094f29e-2783-466f-a6da-35c05910ed3c_removalai_preview_w8cj70",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/80e54548-ab6b-4c6d-8c32-e377aa4272f1_removalai_preview_so2ubo",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/74951467-33d0-4bfd-8b69-0844ea367f08_removalai_preview_qbgzgl",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/857a49f3-5eeb-4c65-9f96-b3d8f7393fe9_removalai_preview_akhaxb",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/Jigyasa_University_Logo_-_Color__1_n8jokp",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/VIT_pbfcph",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/11c98e03-0279-411f-8abf-832e2c05ea47_removalai_preview_rwcg0v",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561288/89d84749-b44e-486a-b14e-16bb1a3de50d_removalai_preview_amds5h",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/6c2c4609-ffda-4183-99dc-ba34f3de9e64_removalai_preview_oir4np",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/mu-logo_fri1x0_ytedpe",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561287/2d-logo-miet-comp_mtdoi2",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/Vellore_Institute_of_Technology_seal_2017.svg_yljl5k",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/logo_pn22s9",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/latest_logo-CERg6eCh_xbuthi",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561286/National_Institute_of_Technology__Kurukshetra_Logo_cqzp8f",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561285/InstituteLogo_Colour_ftmshg",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561284/Indian_Institute_of_Technology_Delhi_Logo_1_rg5kdx",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561281/bhartilogo_lltuk8",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561284/iitp_logo_sdjfps",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561284/d0cf9993-b4cf-430b-bd83-cce09b67a726_kovpvw",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561283/cc75ce0b-e8ba-4b13-a971-5f1255a5b46d_removalai_preview_1_peiilg",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561283/f4cb457d-bff7-44e8-a156-6f48fdae60b0_removalai_preview_k2sy6h",
    "https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768561283/IIIT_Gwalior_Simply_modern_logo_qe9eqq",
  ];
  const navigate = useNavigate();
  return (
    <div className=" overflow-hidden">
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
<section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4">
    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16">
      What Our Interns Say
    </h2>

    {/* Testimonial Card */}
    <div className="relative max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
        <div className="grid md:grid-cols-5 gap-8 h-full">
          {/* Image Section */}
          <div className="md:col-span-2 relative h-96 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800"></div>
            <img
              src={currentReviews?.user?.image}
              alt={currentReviews?.user?.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-between">
            <Quote className="w-16 h-16 text-teal-600 mb-6 opacity-50" />

            <p className="md:text-lg text-gray-700 leading-relaxed mb-8 line-clamp-6">
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

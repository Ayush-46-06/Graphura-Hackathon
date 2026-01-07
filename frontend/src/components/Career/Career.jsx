import React, { useState } from "react";
import Graph from "../Career/Graph";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar";

const Career = () => {
  const [open, setOpen] = useState(null);
  const [current, setCurrent] = useState(1);

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
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
    "https://res.cloudinary.com/drq2a0262/image/upload/v1767278224/505c8f5f-76ae-49ea-a429-5b5902377c50_ymmnuu.png",
  ];

  const reviews = [
    {
      name: "Tanush Mukherjee",
      department: "Frontend Development",
      image: "https://i.pravatar.cc/150?img=1",
      review:
        "“This was a great oportunity for me to learn about how this industry works and with this i have improved a lot in this few weeks. I am thankfull for this oportunity.”",
    },
    {
      name: "Shruti Chhetri",
      department: "Data Analytics",
      image: "https://i.pravatar.cc/150?img=2",
      review:
        "“The overall experience was OKAY, the seniors were cooperative and also helpful, they did guide us whenever we faced an issue. I would like to thank all my seniors.”",
    },
    {
      name: "Ariyan Dibakar Mahanta",
      department: "Backend Development",
      image: "https://i.pravatar.cc/150?img=3",
      review:
        "“My internship at Renusharma founfation was a great learning experience. I improved my design skills, explored new tools, and learned from a talented, supportive team.”",
    },
    {
      name: "Shivam dubey",
      department: "Graphic Design",
      image: "https://i.pravatar.cc/150?img=4",
      review:
        "“It was great experience with graphura india private limited I learn so much in that intership great guidance with senior members of Graphura.“",
    },
    {
      name: "Raj Sharma",
      department: "Graphic Design",
      image: "https://i.pravatar.cc/150?img=4",
      review:
        "“I gained hands-on experience in MERN stack backend projects and improved my teamwork skills by collaborating with colleagues.”",
    },
  ];

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
  const cardsPerPage = 3;

  const totalPages = Math.ceil(internshipRoles.length / cardsPerPage);

  const startIndex = (current - 1) * cardsPerPage;
  const currentCards = internshipRoles.slice(
    startIndex,
    startIndex + cardsPerPage
  );

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
          <button className="text-[#F8C62F] border border-[#F8C62F] px-5 py-2 rounded-md cursor-pointer hover:bg-[#fab031] hover:text-white active:bg-[#fab031] active:text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            Get Free Consultation
          </button>

          {/* As seen on section */}
          <div className="mt-10">
            <h2 className="w-full text-center text-[#fab031] font-bold text-lg">
              AS SEEN ON
            </h2>
            <div className="flex flex-wrap justify-center gap-x-10">
              <div className="max-w-[150px]">
                <img
                  src="https://res.cloudinary.com/drq2a0262/image/upload/v1767256564/Gemini_Generated_Image_j8qi18j8qi18j8qi-removebg-preview_n6aqfb.png"
                  alt=""
                />
              </div>
              <div className="max-w-[150px]">
                <img
                  src="https://res.cloudinary.com/drq2a0262/image/upload/v1767256564/Gemini_Generated_Image_j8qi18j8qi18j8qi-removebg-preview_n6aqfb.png"
                  alt=""
                />
              </div>
              <div className="max-w-[150px]">
                <img
                  src="https://res.cloudinary.com/drq2a0262/image/upload/v1767256564/Gemini_Generated_Image_j8qi18j8qi18j8qi-removebg-preview_n6aqfb.png"
                  alt=""
                />
              </div>
              <div className="max-w-[150px]">
                <img
                  src="https://res.cloudinary.com/drq2a0262/image/upload/v1767256564/Gemini_Generated_Image_j8qi18j8qi18j8qi-removebg-preview_n6aqfb.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* hero section image */}
          <div className="border-4 border-white absolute bottom-[-15%] sm:bottom-[-25%] md:bottom-[-28%] w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] rounded-xl overflow-hidden animate-float">
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
            <button className="border border-[#fab031] text-[#fab031] hover:bg-[#fab031] py-2 px-4 rounded-md hover:text-white font-medium mt-5 cursor-pointer active:bg-[#fab031] active:text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              Learn more about Career
            </button>
          </div>
        </div>
      </section>

      {/* About internship section */}
      <section className="flex justify-center">
        <div className="mt-16 mx-4 lg:mx-8 w-full max-w-[1280px]">
          <h1 className="text-xl font-extrabold text-center md:text-2xl lg:text-3xl">
            Transform your career with our internship program
          </h1>

          {/* cards */}
          <div className="flex flex-wrap justify-center mt-10 gap-10">
            {currentCards.map((card, index) => (
              <div
                key={index}
                className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden w-full max-w-[320px] h-100 shadow-lg border border-gray-200 pb-5 hover:scale-105 hover:shadow-xl duration-200 transition-transform"
              >
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
                  More about internship <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center mt-12 gap-3">
            {/* previous */}
            <button
              onClick={() => setCurrent((p) => Math.max(p - 1, 1))}
              disabled={current === 1}
              className={`px-4 py-2 rounded-lg border font-semibold transition
      ${
        current === 1
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
            >
              ← Prev
            </button>

            {/* Numbering */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold border
        ${current === i + 1 ? "bg-[#03594E] text-white" : "hover:bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}

            {/* next */}
            <button
              onClick={() => setCurrent((p) => Math.min(p + 1, totalPages))}
              disabled={current === totalPages}
              className={`px-4 py-2 rounded-lg border font-semibold transition
      ${
        current === totalPages
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
            >
              Next →
            </button>
          </div>
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
                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition"
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
          <div className="w-full overflow-hidden py-12 space-y-10 relative">
            {/* LEFT fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-15 sm:w-20 md:w-35 lg:50 xl:w-100 bg-gradient-to-r from-white to-transparent z-20" />

            {/* RIGHT fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-15 sm:w-20 md:w-35 lg:50 xl:w-100 bg-gradient-to-l from-white to-transparent z-20" />

            <div className="review-scroll-left">
              {[...reviews, ...reviews].map((item, index) => (
                <div
                  key={index}
                  className="w-[320px] bg-white rounded-xl shadow-md p-5 mx-4"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.department}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.review}
                  </p>
                </div>
              ))}
            </div>
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
                <h3 className="font-semibold text-lg flex justify-between">
                  <span>{question}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => setOpen(open === index ? null : index)}
                  >
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={`transition-transform duration-300 ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </h3>
                <p
                  className={`text-gray-600 mt-2 ${
                    open === index ? "block" : "hidden"
                  }`}
                >
                  {faqAnswers[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;

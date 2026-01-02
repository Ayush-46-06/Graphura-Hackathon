import React, { useState } from "react";
import Graph from "../Career/Graph";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Career = () => {
  const [open, setOpen] = useState(null);
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

  return (
    <div className="pb-15 overflow-hidden">
      {/* hero section */}
      <section className="mt-18">
        <div className="relative px-4 lg:px-8 pt-15 pb-35 md:pb-40 lg:pb-50 flex flex-col gap-3 lg:gap-5 items-center bg-linear-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
          <h1 className="text-[#fab031] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center">
            <span className="text-black">Start Your</span>
            <br /> Career with Graphura
          </h1>
          <p className="text-white font-medium text-center max-w-[800px] lg:text-lg">
            Graphura Hackathon is your launchpad to real opportunities—where
            talent meets innovation, skills turn into impact, and careers take
            shape through challenges that matter.
          </p>
          <button className="text-[#fab031] border border-[#fab031] px-5 py-2 rounded-md cursor-pointer hover:bg-[#fab031] hover:text-white active:bg-[#fab031] active:text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            Get Free Consultation
          </button>

          {/* As seen on section */}
          <div className="mt-10">
            <h2 className="w-full text-center text-[#fab031] font-semibold text-lg">
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
          <div className="absolute bottom-[-15%] sm:bottom-[-25%] md:bottom-[-28%] w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] rounded-xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/drq2a0262/image/upload/v1767178175/estee-janssens-zEqkUMiMxMI-unsplash_wqosou.jpg"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* current inters graph and departemnt */}
      <section>
        <div className="mt-30 sm:mt-50 md:mt-60 flex flex-col items-center gap-5 lg:flex-row lg:items-start mx-4 lg:mx-8">
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
      <section>
        <div className="mt-15 mx-4 lg:mx-8">
          <h1 className="text-xl font-extrabold w-full text-center md:text-2xl lg:text-3xl">
            Transform your career with our internship program
          </h1>
          <div className="flex flex-wrap justify-center mt-10 gap-10">
            <div className="cursor-pointer flex flex-col rounded-2xl overflow-hidden w-full max-w-[320px] shadow-lg border border-gray-200 pb-5 hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <div className="h-50 overflow-hidden">
                <img
                  className="object-cover"
                  src="https://res.cloudinary.com/drq2a0262/image/upload/v1767275491/Gemini_Generated_Image_qe339nqe339nqe33_jbuke1.png"
                  alt="front-end image"
                />
              </div>
              <h3 className="mt-2 mx-6 font-semibold text-xl">
                Front-end Developer Internship
              </h3>
              <p className="mx-6 mt-2 text-gray-500">
                Craft engaging user interfaces with HTML, CSS, and JavaScript.
                Build responsive, interactive web experiences.
              </p>
              <Link
                to="https://graphura.online/internship.html"
                className="mx-8 text-[#fab031] mt-auto font-medium"
              >
                More about internship <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
            <div className="cursor-pointer flex flex-col rounded-2xl overflow-hidden w-full max-w-[320px] shadow-lg border border-gray-200 pb-5 hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <div className="h-50 overflow-hidden">
                <img
                  className="object-cover"
                  src="https://res.cloudinary.com/drq2a0262/image/upload/v1767276474/Gemini_Generated_Image_kxptt9kxptt9kxpt_kwqa0v.png"
                  alt="front-end image"
                />
              </div>
              <h3 className="mt-2 mx-6 font-semibold text-xl">
                Back-end Developer Internship
              </h3>
              <p className="mx-6 mt-2 text-gray-500">
                Building robust server-side applications, databases, and APIs to
                power dynamic web experiences.
              </p>
              <Link
                to="https://graphura.online/internship.html"
                className="mx-8 text-[#fab031] mt-auto font-medium"
              >
                More about internship <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
            <div className="cursor-pointer flex flex-col rounded-2xl overflow-hidden w-full max-w-[320px] shadow-lg border border-gray-200 pb-5 hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <div className="h-50 overflow-hidden">
                <img
                  className="object-cover"
                  src="https://res.cloudinary.com/drq2a0262/image/upload/v1767276525/Gemini_Generated_Image_a8moe3a8moe3a8mo_gy1e7y.png"
                  alt="front-end image"
                />
              </div>
              <h3 className="mt-2 mx-6 font-semibold text-xl">
                Human Resource Internship
              </h3>
              <p className="mx-6 mt-2 text-gray-500">
                Dedicated to understanding people, strengthening teams, and
                driving organizational success.
              </p>
              <Link
                to="https://graphura.online/internship.html"
                className="mx-8 text-[#fab031] mt-auto font-medium"
              >
                More about internship <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
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
            {/* LEFT fade */}
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
            
            {/* ROW 1 → LEFT TO RIGHT */}
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

            {/* ROW 2 → RIGHT TO LEFT */}
            <div className="review-scroll-right">
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
      <section className="mt-15">
        <div>
          <h1 className="w-full text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6 px-6 mt-10 flex flex-col items-center">
            {faqQuestions.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg px-4 py-2 md:py-4 shadow-lg w-full max-w-[800px]">
                <h3 className="font-semibold text-lg flex justify-between"><span>{question}</span><span className="cursor-pointer" onClick={()=>setOpen(open === index ? null : index)}><FontAwesomeIcon icon={faAngleDown} className={`transition-transform duration-300 ${open === index ? "rotate-180" : ""}`} /></span></h3>
                <p className={`text-gray-600 mt-2 ${open === index ? 'block' : 'hidden'}`}>{faqAnswers[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;

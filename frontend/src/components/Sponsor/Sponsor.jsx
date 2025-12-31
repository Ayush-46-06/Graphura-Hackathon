import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faComments,
  faEye,
  faGem,
  faHandshake,
  faLeaf,
  faRocket,
  faSliders,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const Sponsor = () => {
   const formRef = useRef(null);
  return (
    <div>
      {/* hero section */}
      <section>
        <div className="px-4 lg:px-8 pt-20 pb-10 mt-10 flex flex-col gap-10 items-center lg:flex-row lg:justify-between bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
          <div className="max-w-[500px]">
            <div className="flex flex-wrap justify-center lg:justify-start">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
                Invest in Ideas.
              </h1>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#fab031]">
                Invest in the Future.
              </h1>
            </div>
            <p className="my-4 text-white lg:text-lg">
              As a Graphothon sponsor, you support meaningful challenges that
              spark creativity, inspire problem-solving, and empower
              future-ready innovators. Your involvement drives real, measurable
              impact.
            </p>
            <Link className="w-full flex justify-center lg:justify-start" onClick={()=>formRef.current?.scrollIntoView({behavior: "smooth"})}>
              <button className="bg-gradient-to-br from-[#F8C62F] to-[#FE8235] rounded-lg text-md max-w-[350px] font-bold w-full py-3 hover:scale-105 hover:shadow-lg duration-200 transition-transform">
                Join as a Sponsor
              </button>
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden max-w-[500px] max-h-[300px]">
            <img
              src="https://res.cloudinary.com/drq2a0262/image/upload/v1766732772/Gemini_Generated_Image_5mb56e5mb56e5mb5_zrimij.png"
              alt="Graphothon-Event"
            />
          </div>
        </div>
      </section>

      {/* Our Sponsors */}
      <section>
        <div className="mx-4 lg:mx-8"></div>
      </section>

      {/* Benefits of Sponsoring Us section */}
      <section>
        <div className="mx-4 lg:mx-8 mt-[100px] pb-5 flex flex-col gap-10 lg:gap-20">
          <h1 className="text-xl font-extrabold w-full text-center mb-4 md:text-2xl lg:text-3xl">
            Benefits of Sponsoring Us section
          </h1>
          <div className="flex flex-col items-center lg:flex-row lg:justify-between">
            <div className="max-w-[700px] lg:max-w-[400px] xl:max-w-[500px]">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faBullhorn}
                  className="text-green-500 text-xl py-3 px-2.5 rounded-full bg-green-200"
                />
              </span>
              <h2 className="text-lg font-bold md:text-2xl lg:text-3xl">
                Amplified Brand Visibility
              </h2>
              <p className="text-gray-700 my-2">
                Your brand is highlighted across all Graphothon platforms,
                promotional campaigns, digital assets, and event experiences.
                Sponsoring with Graphura positions you directly in front of
                thousands of innovators, students, mentors, and industry
                leaders, boosting your reach and credibility.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden max-w-[500px] max-h-[300px]">
              <img
                src="https://res.cloudinary.com/drq2a0262/image/upload/v1766745498/Gemini_Generated_Image_pdxa4npdxa4npdxa_fevl3n.png"
                alt="brand-visibility-image"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:flex-row-reverse lg:justify-between">
            <div className="max-w-[700px] lg:max-w-[400px] xl:max-w-[500px]">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="text-green-500 text-xl py-3 px-2.5 rounded-full bg-green-200"
                />
              </span>
              <h2 className="text-lg font-bold md:text-2xl lg:text-3xl">
                Direct Access to Emerging Talent
              </h2>
              <p className="text-gray-700 my-2">
                Engage closely with young creators who bring fresh perspectives
                and problem-solving skills.As a sponsor, you gain early access
                to top performers, potential hires, and future changemakers
                ready to contribute to real-world innovation.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden max-w-[500px] max-h-[300px]">
              <img
                src="https://res.cloudinary.com/drq2a0262/image/upload/v1766746360/Gemini_Generated_Image_sqbl4sqbl4sqbl4s_twd3uo.png"
                alt="emerging-talent-image"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:justify-between">
            <div className="max-w-[700px] lg:max-w-[400px] xl:max-w-[500px]">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faRocket}
                  className="text-green-500 text-xl py-3 px-2.5 rounded-full bg-green-200"
                />
              </span>
              <h2 className="text-lg font-bold md:text-2xl lg:text-3xl">
                Meaningful Impact Through Innovation
              </h2>
              <p className="text-gray-700 my-2">
                Your sponsorship fuels real-world problem-solving by supporting
                impactful challenges and collaborative learning. Together, we
                enable participants to build transformative solutions, shaping
                both community growth and the future of technology.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden max-w-[500px] max-h-[300px]">
              <img
                src="https://res.cloudinary.com/drq2a0262/image/upload/v1766746974/Gemini_Generated_Image_hfpvb8hfpvb8hfpv_ppoglk.png"
                alt="innovation-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsors Love Working With Us */}
      <section className="bg-gray-200 mt-20 pb-10">
        <div className="mx-4 lg:mx-8">
          <h1 className="text-xl font-extrabold w-full text-center pt-10 mb-8 md:text-2xl lg:text-3xl">
            Why Sponsors Love Working With Us
          </h1>
          <div className="mt-5 flex flex-wrap gap-8 justify-center">
            <div className="bg-white p-5 rounded-2xl w-full max-w-[350px] shadow-md cursor-pointer hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faHandshake}
                  className="text-green-500 bg-green-200 py-3 px-2.5 rounded-full"
                />
              </span>
              <h2 className="text-lg font-bold">
                Trusted Collaboration Experience
              </h2>
              <p className="text-gray-700 my-2">
                Sponsors appreciate our seamless communication, transparent
                processes, and well-structured event workflow.
              </p>
              <p className="text-gray-700 my-2">
                We make partnership smooth, predictable, and
                value-driven—ensuring your brand enjoys a professional and
                effortless collaboration.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl w-full max-w-[350px] shadow-md cursor-pointer hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-green-500 bg-green-200 py-3 px-2.5 rounded-full"
                />
              </span>
              <h2 className="text-lg font-bold">High-Impact Brand Exposure</h2>
              <p className="text-gray-700 my-2">
                Your brand receives meaningful visibility across campaigns,
                digital platforms, and event spaces. Sponsors love the strong
                positioning and recognition they gain among students,
                institutions, and industry leaders.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl w-full max-w-[350px] shadow-md cursor-pointer hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faGem}
                  className="text-green-500 bg-green-200 py-3 px-2.5 rounded-full"
                />
              </span>
              <h2 className="text-lg font-bold">
                Access to Exceptional Talent
              </h2>
              <p className="text-gray-700 my-2">
                Our hackathons attract passionate creators, innovators, and
                problem-solvers from diverse backgrounds. Sponsors value early
                access to these emerging talents for internships, mentoring, and
                future hiring opportunities.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl w-full max-w-[350px] shadow-md cursor-pointer hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faLeaf}
                  className="text-green-500 bg-green-200 py-3 px-2.5 rounded-full"
                />
              </span>
              <h2 className="text-lg font-bold">
                Purpose-Driven Innovation Ecosystem
              </h2>
              <p className="text-gray-700 my-2">
                Every challenge we design reflects real-world needs, making your
                sponsorship truly impactful. Sponsors appreciate that their
                support directly empowers students to build solutions with
                long-term value.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl w-full max-w-[350px] shadow-md cursor-pointer hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faComments}
                  className="text-green-500 bg-green-200 py-3 px-2.5 rounded-full"
                />
              </span>
              <h2 className="text-lg font-bold">Strong Community Engagement</h2>
              <p className="text-gray-700 my-2">
                We bring together students, institutions, mentors, and industry
                experts into one collaborative environment. Sponsors enjoy
                engaging with this dynamic community, creating lasting
                connections and networking opportunities.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl w-full max-w-[350px] shadow-md cursor-pointer hover:scale-105 hover:shadow-xl duration-200 transition-transform">
              <span className="block w-full">
                <FontAwesomeIcon
                  icon={faSliders}
                  className="text-green-500 bg-green-200 py-3 px-2.5 rounded-full"
                />
              </span>
              <h2 className="text-lg font-bold">
                Flexible & Customized Partnership Models
              </h2>
              <p className="text-gray-700 my-2">
                Whether you're a startup, enterprise, or educational
                institution, we tailor sponsorship benefits to fit your
                goals.Sponsors love that Graphura provides personalized
                experiences that maximize both brand engagement and impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Sponsor Today - Form */}
      <section ref={formRef}>
        <div className="pt-10 px-4 pb-5 flex justify-center bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
          <form className="p-4 rounded-xl shadow-green-700 shadow-md border border-gray-200 max-w-[700px] lg:max-w-[900px] flex flex-col items-center bg-white">
            <h1 className="text-xl font-extrabold w-full text-center pt-5 md:text-2xl lg:text-3xl">
              Become a Sponsor Today
            </h1>
            <p className="text-gray-700 text-center mt-2 mb-8">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>
            <div className="flex flex-col gap-6 items-center lg:flex-row lg:flex-wrap lg:justify-between">
              <div className="flex flex-col w-full max-w-[400px]">
                <label
                  htmlFor="firstname"
                  className="font-semibold text-gray-800 p-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="John"
                  className="border border-gray-300 py-2.5 px-4 bg-gray-100 rounded-xl focus:outline-green-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full max-w-[400px]">
                <label
                  htmlFor="lastname"
                  className="font-semibold text-gray-800 p-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Doe"
                  className="border border-gray-300 py-2.5 px-4 bg-gray-100 rounded-xl focus:outline-green-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full max-w-[400px]">
                <label
                  htmlFor="email"
                  className="font-semibold text-gray-800 p-1"
                >
                  Work Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  className="border border-gray-300 py-2.5 px-4 bg-gray-100 rounded-xl focus:outline-green-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full max-w-[400px]">
                <label
                  htmlFor="companyHQ"
                  className="font-semibold text-gray-800 p-1"
                >
                  Company HQ
                </label>
                <input
                  type="text"
                  name="companyHQ"
                  placeholder="City, Country"
                  className="border border-gray-300 py-2.5 px-4 bg-gray-100 rounded-xl focus:outline-green-500"
                  required
                />
              </div>
            </div>
            <div className="mt-5 w-full">
              <label
                htmlFor="textarea"
                className="font-semibold text-gray-800 p-1"
              >
                What do you expect from your collaboration with us?
              </label>
              <textarea
                name="textarea"
                placeholder="We are Looking for talent acquisition opportunities..."
                className="mt-1 border w-full h-40 border-gray-300 py-2.5 px-4 bg-gray-100 rounded-xl focus:outline-green-500"
                required
              ></textarea>
            </div>
            <button className="mt-5 bg-gradient-to-br from-[#F8C62F] to-[#FE8235] hover:scale-105 hover:shadow-lg duration-200 transition-transform rounded-lg text-md max-w-[350px] font-bold w-full py-3">
              Apply to Sponsor
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Sponsor;

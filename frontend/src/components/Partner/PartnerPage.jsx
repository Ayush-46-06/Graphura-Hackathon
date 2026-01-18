import React from "react";
import { useState } from "react";
import axios from "axios";
// import heroImage1 from "../../assets/partnerPage/Hero-image-Partners.avif";
import innovationAndImpact from "../../assets/partnerPage/innovationAndImpact.avif";
import collaboration from "../../assets/partnerPage/Collaboration.avif";
import brandVisibility from "../../assets/partnerPage/BrandVisibility.avif";
import Navbar from "../Navbar";
import heroMain from "/hero-section-1.jpg";
import heroCardTop from "/hero-section-2.jpg";
import heroCardBottom from "/hero-section-3.jpeg";
import Footer from "../Footer";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    companyHQ: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/partner/apply", formData);

      alert("Partnership request submitted successfully");

      setFormData({
        firstName: "",
        lastName: "",
        workEmail: "",
        companyHQ: "",
        message: "",
      });
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white text-gray-900">
      <Navbar />
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] pt-10">
        {/* floating circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-14 left-10 w-72 h-72 bg-[#1AB69D]/25 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-14 right-10 w-96 h-96 bg-[#F8C62F]/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div className="space-y-6 text-white">
            <span className="text-[#F8C62F] font-semibold uppercase tracking-wide">
              Partner Program
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Become a Graphura’s Partner
            </h1>

            <p className="text-white/80 text-lg leading-relaxed">
              Join Graphura’s trusted circle of partners and empower the next
              generation of innovators through impactful challenges and
              meaningful collaboration.
            </p>

            <button className="px-8 py-4 bg-[#F8C62F] text-[#0C121D] rounded-xl font-semibold hover:bg-[#e0b429] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#F8C62F]/40">
              Join our network
            </button>
          </div>

          {/* RIGHT HERO IMAGES */}
          <div className="relative grid grid-cols-4 gap-4">
            {/* Main tall image (narrower now) */}
            <div className="col-span-2">
              <img
                src={heroMain}
                alt="Partner collaboration"
                className="w-full h-[420px] object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Right stacked images */}
            <div className="flex flex-col gap-4 col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-3">
                <img
                  src={heroCardTop}
                  alt="Growth insights"
                  className="w-full h-[180px] object-cover rounded-xl"
                />
              </div>

              <div className="overflow-hidden rounded-xl">
                <img
                  src={heroCardBottom}
                  alt="Team collaboration"
                  className="w-full h-[200px] object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH US */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Block 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Innovation & Impact</h2>
            <p className="text-gray-600 leading-relaxed">
              Partnering with Graphura means becoming a catalyst for innovation
              at scale. Through Graphura hackathon, your brand contributes
              directly to shaping young creators who are solving real-world
              challenges. We curate meaningful, purpose-driven hackathons that
              encourage experimentation, creativity, and rapid problem-solving.
              Your involvement empowers thousands of emerging innovators to
              build solutions that matter. Together, we turn bold ideas into
              impactful outcomes that drive long-term change.
            </p>
          </div>

          <div className="w-full h-[340px] bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={innovationAndImpact}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 w-full h-[340px] bg-gray-100 rounded-2xl overflow-hidden">
            <img src={collaboration} className="w-full h-full object-cover" />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4">
              Collaboration & Community
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Graphura partners join a powerful network of educators, industry
              leaders, and creative thinkers. By collaborating with us, your
              brand becomes part of a vibrant community built on knowledge
              sharing and mutual growth. Our hackathons bring participants,
              mentors, and partners into one unified ecosystem of learning and
              innovation. We enable authentic connections that strengthen your
              brand’s presence among future professionals. With Graphura,
              partnership is not just sponsorship—it’s meaningful collaboration
              with lasting value.
            </p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Brand Visibility & Future Talent
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Graphura hackathon gives partners unparalleled visibility across a
              dynamic, youth-driven innovation landscape. Your brand stands at
              the forefront as participants develop high-impact solutions
              inspired by your challenges and domain. Through workshops,
              mentorship, and judging roles, partners gain direct access to
              exceptional emerging talent. This engagement helps identify future
              leaders, innovators, and potential hires early in their journey.
              Together with Graphura, you shape the future workforce while
              enhancing your brand’s credibility and reach.
            </p>
          </div>

          <div className="w-full h-[340px] bg-gray-100 rounded-2xl overflow-hidden">
            <img src={brandVisibility} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* WHAT OUR PARTNERS GET */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Partners Get
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Elevated Brand Visibility",
              "Access to Emerging Talent",
              "Custom Innovation Challenges",
              "Co-Branding & Marketing Opportunities",
              "Networking With Leaders & Educators",
              "Impact-Driven Contribution",
            ].map((title, idx) => (
              <div key={idx} className="bg-white shadow rounded-xl p-6">
                <h3 className="font-semibold text-xl mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your partnership supports innovation, increases trust, and
                  connects your brand with the next generation of creators.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Become a Partner Today
        </h2>

        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-lg p-3"
            placeholder="First name"
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-lg p-3"
            placeholder="Last name"
          />

          <input
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            className="border rounded-lg p-3"
            placeholder="Work e-mail"
          />

          <input
            name="companyHQ"
            value={formData.companyHQ}
            onChange={handleChange}
            className="border rounded-lg p-3"
            placeholder="Company HQ"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="border rounded-lg p-3 md:col-span-2"
            placeholder="What do you expect from your collaboration with us?"
          ></textarea>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="mt-4 px-10 py-4 bg-[#F8C62F] text-[#0C121D] rounded-xl font-semibold hover:bg-[#e0b429] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#F8C62F]/40"
            >
              Apply
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
}
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      phone: formData.phone.replace(/\D/g, "")
    };

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) {
        alert(data.message || "Body validation failed");
        return;
      }

      alert("Message sent successfully ✅");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Placeholder */}
     <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] px-4  py-16 md:py-20 lg:py-29">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#fab031] mb-4">
                Contact Us
              </h1>
              <p className="text-white text-lg md:text-xl opacity-90">
                We'd love to hear from you
              </p>
            </div>

            <div className="w-full md:w-auto md:max-w-[350px] lg:max-w-[440px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://ordainit.com/html/educeet/educeet/assets/img/breadcrumb/contact.jpg"
                alt="contact"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Form Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                We are here to support your mission.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Whether you have doubts, partnership ideas, sponsorship proposals,
                or want to launch a hackathon with us — connect anytime.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Contact Info
              </h3>
              
              <ul className="space-y-4">
                {/* Address */}
                <li className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <span className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl border-r-4 border-b-4 border-[#03594E] flex-shrink-0">
                    <MapPin className="w-7 h-7 text-gray-700" />
                  </span>
                  <span className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg flex-1">
                    Graphura India Private Limited.
                  </span>
                </li>

                {/* Phone */}
                <li className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <span className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl border-r-4 border-b-4 border-[#03594E] flex-shrink-0">
                    <Phone className="w-7 h-7 text-gray-700" />
                  </span>
                  <a href="tel:+91-7378021327" className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg flex-1">
                    +91-7378021327
                  </a>
                </li>

                {/* Email */}
                <li className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <span className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl border-r-4 border-b-4 border-[#03594E] flex-shrink-0">
                    <Mail className="w-7 h-7 text-gray-700" />
                  </span>
                  <div className="flex flex-col gap-1 flex-1">
                    <a href="mailto:Hackthon@graphura.in" className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg break-all">
                     join@graphura.in 
                    </a>
                    {/* <a href="mailto:team@graphura.online" className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg break-all">
                      join@graphura.in 
                    </a> */}
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Social Media
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/19nKAMTopZ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-[#03594E] transition-all group border border-gray-200"
                >
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://share.google/w9KeZZ72v8KQxGpFn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-[#03594E] transition-all group border border-gray-200"
                >
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/graphura.in?igsh=MXNqNmtidzljNDJlag=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-[#03594E] transition-all group border border-gray-200"
                >
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* <a
                  href="https://www.facebook.com/share/19nKAMTopZ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-[#03594E] transition-all group border border-gray-200"
                >
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a> */}
              </div>
            </div>
          </div>

          {/* Submit Your Query Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-4 border-r-8 border-b-8 border-[#03594E]">
            <h4 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
              Submit Your Query
            </h4>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg bg-gray-50 px-4 py-3 text-base focus:outline-none focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E] focus:ring-opacity-20 transition-all"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg bg-gray-50 px-4 py-3 text-base focus:outline-none focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E] focus:ring-opacity-20 transition-all"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="phone">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg bg-gray-50 px-4 py-3 text-base focus:outline-none focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E] focus:ring-opacity-20 transition-all"
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border-2 border-gray-300 rounded-lg bg-gray-50 px-4 py-3 text-base focus:outline-none focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E] focus:ring-opacity-20 transition-all"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="General Query">General Query</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Host a Hackathon">Host a Hackathon</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border-2 border-gray-300 rounded-lg bg-gray-50 px-4 py-3 text-base focus:outline-none focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E] focus:ring-opacity-20 transition-all resize-none"
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#03594E] to-[#1AB69D] text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
     <Footer />
    </div>
  );
};

export default ContactUs;
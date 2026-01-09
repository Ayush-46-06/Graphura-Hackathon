import React, { useState } from "react";
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

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
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

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] px-4 py-16 md:py-20 lg:py-24">
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
                    <svg width="28" height="34" viewBox="0 0 35 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.25 33.25C3.59214 34.0734 1.25 35.3386 1.25 36.7574C1.25 39.2386 8.41344 41.25 17.25 41.25C26.0866 41.25 33.25 39.2386 33.25 36.7574C33.25 35.3386 30.9078 34.0734 27.25 33.25" stroke="#ABB2C5" strokeWidth="2.5" strokeLinecap="round"></path>
                      <path d="M22.25 15.25C22.25 18.0114 20.0114 20.25 17.25 20.25C14.4886 20.25 12.25 18.0114 12.25 15.25C12.25 12.4886 14.4886 10.25 17.25 10.25C20.0114 10.25 22.25 12.4886 22.25 15.25Z" stroke="#1F2432" strokeWidth="2.5"></path>
                      <path d="M19.7648 32.2372C19.0902 32.8868 18.1886 33.25 17.2504 33.25C16.312 33.25 15.4104 32.8868 14.7358 32.2372C8.5586 26.2516 0.28038 19.565 4.31742 9.85746C6.5002 4.60864 11.7399 1.25 17.2504 1.25C22.7608 1.25 28.0004 4.60866 30.1832 9.85746C34.2152 19.5528 25.9572 26.2722 19.7648 32.2372Z" stroke="#ABB2C5" strokeWidth="2.5"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg flex-1">
                    Graphura India Private Limited.
                  </span>
                </li>

                {/* Phone */}
                <li className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <span className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl border-r-4 border-b-4 border-[#03594E] flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.3" d="M10.3056 6.93945L11.4134 8.92446C12.4131 10.7158 12.0118 13.0658 10.4372 14.6404C10.4372 14.6404 8.52731 16.5503 11.9902 20.0132C15.453 23.476 17.363 21.5661 17.363 21.5661C18.9375 19.9915 21.2875 19.5902 23.0789 20.5899L25.0639 21.6977C27.7689 23.2074 28.0883 27.0008 25.7107 29.3785C24.282 30.8071 22.5318 31.9188 20.5971 31.9922C17.3401 32.1156 11.8088 31.2913 6.26042 25.7429C0.711997 20.1945 -0.112289 14.6633 0.011183 11.4063C0.0845292 9.47152 1.1962 7.72132 2.62489 6.29264C5.00252 3.915 8.79597 4.23446 10.3056 6.93945Z" fill="#1F2432"></path>
                      <path d="M15.8053 1.07506C15.9182 0.377126 16.578 -0.0963256 17.276 0.0166671C17.3192 0.0249367 17.4582 0.0509164 17.531 0.0671365C17.6766 0.0995731 17.8798 0.149513 18.1331 0.223296C18.6397 0.370846 19.3474 0.613917 20.1968 1.00332C21.8973 1.78296 24.1604 3.14678 26.5087 5.49514C28.8571 7.8435 30.2209 10.1065 31.0005 11.8071C31.39 12.6565 31.633 13.3642 31.7806 13.8707C31.8544 14.124 31.9043 14.3272 31.9367 14.4729C31.953 14.5457 31.9648 14.6042 31.9731 14.6474L31.9829 14.7006C32.0959 15.3986 31.6267 16.0856 30.9288 16.1986C30.2329 16.3113 29.5772 15.8401 29.4615 15.1455C29.4579 15.1268 29.4481 15.0767 29.4376 15.0294C29.4165 14.9349 29.3801 14.785 29.3224 14.5867C29.2069 14.1902 29.0062 13.6007 28.6731 12.8741C28.0077 11.4227 26.8112 9.4185 24.6983 7.30559C22.5854 5.19268 20.5811 3.99615 19.1298 3.33074C18.4032 2.99763 17.8137 2.79701 17.4171 2.6815C17.2189 2.62375 16.9697 2.56655 16.8751 2.5455C16.1805 2.42973 15.6926 1.771 15.8053 1.07506Z" fill="#1F2432"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M16.1914 6.96297C16.3857 6.28315 17.0942 5.8895 17.7741 6.08374L17.4224 7.31466C17.7741 6.08374 17.7741 6.08374 17.7741 6.08374L17.7765 6.08444L17.7791 6.0852L17.7848 6.08686L17.7981 6.09081L17.8318 6.10133C17.8576 6.10956 17.8897 6.12028 17.928 6.13388C18.0047 6.16108 18.106 6.19977 18.2303 6.25303C18.4789 6.3596 18.8187 6.52418 19.2361 6.77119C20.0716 7.26565 21.2121 8.08698 22.552 9.42685C23.8918 10.7667 24.7132 11.9072 25.2076 12.7427C25.4546 13.1601 25.6192 13.4999 25.7258 13.7485C25.779 13.8728 25.8177 13.9741 25.8449 14.0508C25.8585 14.0891 25.8692 14.1212 25.8775 14.147L25.888 14.1808L25.8919 14.194L25.8936 14.1997L25.8944 14.2023C25.8944 14.2023 25.8951 14.2047 24.6641 14.5564L25.8951 14.2047C26.0893 14.8846 25.6957 15.5931 25.0158 15.7874C24.3418 15.9799 23.6395 15.5946 23.4383 14.9254L23.432 14.907C23.4229 14.8813 23.404 14.8308 23.3724 14.7571C23.3093 14.6097 23.1947 14.3687 23.0042 14.0468C22.6236 13.4037 21.9363 12.432 20.7415 11.2373C19.5468 10.0425 18.5751 9.35516 17.932 8.97457C17.6101 8.78406 17.3691 8.66953 17.2217 8.60637C17.148 8.57476 17.0975 8.55593 17.0718 8.54683L17.0534 8.54052C16.3842 8.33932 15.9989 7.63701 16.1914 6.96297Z" fill="#1F2432"></path>
                    </svg>
                  </span>
                  <a href="tel:+91-7378021327" className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg flex-1">
                    +91-7378021327
                  </a>
                </li>

                {/* Email */}
                <li className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <span className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl border-r-4 border-b-4 border-[#03594E] flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.3" d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 16.2396 0.525864 18.3563 1.46085 20.2335C1.70931 20.7323 1.79201 21.3025 1.64797 21.8409L0.814116 24.9573C0.452137 26.3102 1.68982 27.5479 3.04269 27.1859L6.15914 26.352C6.69751 26.208 7.26769 26.2907 7.76654 26.5392C9.64371 27.4741 11.7604 28 14 28Z" fill="#1F2432"></path>
                      <path d="M8.155 15.1893C7.51711 15.1893 7 15.7064 7 16.3443C7 16.9822 7.51711 17.4993 8.155 17.4993H16.625C17.2629 17.4993 17.78 16.9822 17.78 16.3443C17.78 15.7064 17.2629 15.1893 16.625 15.1893H8.155Z" fill="#1F2432"></path>
                      <path d="M8.155 9.79932C7.51711 9.79932 7 10.3164 7 10.9543C7 11.5922 7.51711 12.1093 8.155 12.1093H20.475C21.1129 12.1093 21.63 11.5922 21.63 10.9543C21.63 10.3164 21.1129 9.79932 20.475 9.79932H8.155Z" fill="#1F2432"></path>
                    </svg>
                  </span>
                  <div className="flex flex-col gap-1 flex-1">
                    <a href="mailto:Hackthon@graphura.in" className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg break-all">
                      Hackthon@graphura.in
                    </a>
                    <a href="mailto:team@graphura.online" className="text-gray-700 hover:text-[#03594E] transition-colors text-base md:text-lg break-all">
                      team@graphura.online
                    </a>
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
                  <i className="fa-brands fa-facebook-f text-xl text-gray-700 group-hover:text-white transition-colors"></i>
                </a>
                <a
                  href="https://share.google/w9KeZZ72v8KQxGpFn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-[#03594E] transition-all group border border-gray-200"
                >
                  <i className="fa-brands fa-twitter text-xl text-gray-700 group-hover:text-white transition-colors"></i>
                </a>
                <a
                  href="https://www.instagram.com/graphura.in?igsh=MXNqNmtidzljNDJlag=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-[#03594E] transition-all group border border-gray-200"
                >
                  <i className="fa-brands fa-instagram text-xl text-gray-700 group-hover:text-white transition-colors"></i>
                </a>
                <a
                  href="https://www.facebook.com/share/19nKAMTopZ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-[#03594E] transition-all group border border-gray-200"
                >
                  <i className="fa-brands fa-youtube text-xl text-gray-700 group-hover:text-white transition-colors"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Submit Your Query Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-4 border-r-8 border-b-8 border-[#03594E]">
            <h4 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
              Submit Your Query
            </h4>

            <div className="space-y-6">
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
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    <option value="Certificate">Certificate</option>
                    <option value="Date">Date</option>
                    <option value="Time Period">Time Period</option>
                    <option value="Other">Other</option>
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
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#03594E] to-[#1AB69D] text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  Send Message
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
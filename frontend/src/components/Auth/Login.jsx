import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Phone, MapPin, GraduationCap, Building2, BookOpen, Calendar } from 'lucide-react';
import Navbar from "../Navbar";

const SlidingAuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchColleges = async () => {
    try {
      const res = await axios.get(
        "/api/public/colleges"
      );

      if (res.data.success) {
        setColleges(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch colleges");
    }
  };

  fetchColleges();
}, []);

  // Login Form State
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Signup Form State
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    contactNumber: "",
    university: "",
    college: "",
    courseName: "",
    yearOfStudy: "",
    role: "user",
    adminSecret: "",
    judgeSecret: "",
    agree: false,
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/login",
        loginForm
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.role === "judge") {
        navigate("/judge/dashboard");
      } else if (data.role === "college") {
        navigate("/college/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!signupForm.agree) {
      alert("Please agree to terms");
      return;
    }

    if (signupForm.role === "admin" && !signupForm.adminSecret) {
      alert("Admin secret required");
      return;
    }

    if (signupForm.role === "judge" && !signupForm.judgeSecret) {
      alert("Judge secret required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: `${signupForm.firstName} ${signupForm.lastName}`,
        email: signupForm.email,
        password: signupForm.password,
        address: signupForm.address,
        contactNumber: signupForm.contactNumber,
        university: signupForm.university,
        collegeName: signupForm.college,
        courseName: signupForm.courseName,
        yearOfStudy: signupForm.yearOfStudy,
      };

      let apiUrl = "";

      if (signupForm.role === "admin") {
        payload.role = "admin";
        payload.adminSecret = signupForm.adminSecret;
        apiUrl = "/api/auth/register";
      } else if (signupForm.role === "judge") {
        payload.judgeSecret = signupForm.judgeSecret;
        apiUrl = "/api/auth/judge-register";
      } else {
        payload.role = "user";
        apiUrl = "/api/auth/register";
      }

      const res = await axios.post(apiUrl, payload);

      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] flex items-center justify-center p-4 md:pt-20 relative overflow-hidden">
      {/* Background Effects */}
      <Navbar />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl md:h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Mobile Toggle Buttons - Only visible on mobile */}
        <div className="md:hidden flex w-full border-b border-gray-200">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-4 font-bold transition-all ${
              !isSignUp
                ? "bg-gradient-to-br from-[#F8C62F] to-[#FE8235] text-white"
                : "bg-white text-gray-600"
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-4 font-bold transition-all ${
              isSignUp
                ? "bg-gradient-to-br from-[#F8C62F] to-[#FE8235] text-white"
                : "bg-white text-gray-600"
            }`}
          >
            SIGN UP
          </button>
        </div>

        {/* Form Container - Slides on desktop, switches on mobile */}
        <div
          className={`w-full md:absolute md:top-0 md:w-1/2 h-full transition-all duration-700 ease-in-out ${
            isSignUp ? "md:left-1/2" : "md:left-0"
          }`}
        >
          {/* LOGIN FORM */}
          <div
            className={`${
              isSignUp ? "hidden md:absolute" : "block md:absolute"
            } inset-0 p-6 md:p-12 flex flex-col justify-center transition-opacity duration-300 ${
              isSignUp ? "md:opacity-0 md:pointer-events-none" : "md:opacity-100"
            }`}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#F8C62F] to-[#FE8235] rounded-full mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                Sign In
              </h2>
              {/* <p className="text-gray-500 text-sm md:text-base">Join us today - it only takes a minute</p> */}
            </div>

            <div className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="Enter mail"
                  className="w-full bg-gray-100 border-0 rounded-lg p-3.5 pl-12 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#03594E] outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="Enter Password"
                  className="w-full bg-gray-100 border-0 rounded-lg p-3.5 pl-12 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#03594E] outline-none"
                />
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password">
                  <button type="button" className="text-sm text-[#C2B067]">
                    Forgot password?
                  </button>
                </Link>
              </div>

              <button
                onClick={handleLoginSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-br from-[#F8C62F] to-[#FE8235] py-3.5 rounded-lg font-bold text-white transition transform hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </div>
          </div>

          {/* SIGNUP FORM */}
          <div
            className={`${
              isSignUp ? "block md:absolute" : "hidden md:absolute"
            } inset-0 p-6 md:p-8 flex flex-col justify-start pt-6 overflow-y-auto transition-opacity duration-300 ${
              isSignUp ? "md:opacity-100" : "md:opacity-0 md:pointer-events-none"
            }`}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#F8C62F] to-[#FE8235] rounded-full mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Join us today - it only takes a minute</p>
            </div>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={signupForm.firstName}
                    onChange={handleSignupChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={signupForm.lastName}
                    onChange={handleSignupChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter E-mail"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Select Role</label>
                <select
                  name="role"
                  value={signupForm.role}
                  onChange={handleSignupChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 text-sm focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all cursor-pointer"
                >
                  <option value="user">👤 User</option>
                  <option value="admin">⚙️ Admin</option>
                  <option value="judge">⚖️ Judge</option>
                </select>
              </div>

              {/* Secret Keys */}
              {signupForm.role === "admin" && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                  <input
                    type="password"
                    name="adminSecret"
                    placeholder="Admin Secret Key"
                    value={signupForm.adminSecret}
                    onChange={handleSignupChange}
                    className="w-full bg-red-50 border border-red-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  />
                </div>
              )}

              {signupForm.role === "judge" && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <input
                    type="password"
                    name="judgeSecret"
                    placeholder="Judge Secret Key"
                    value={signupForm.judgeSecret}
                    onChange={handleSignupChange}
                    className="w-full bg-blue-50 border border-blue-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-blue-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
              )}

              {/* Contact & Address */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact"
                    value={signupForm.contactNumber}
                    onChange={handleSignupChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={signupForm.address}
                    onChange={handleSignupChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Education Details */}
              <div className="pt-3 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#03594E]" />
                  Education Details
                </h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="university"
                        placeholder="University"
                        value={signupForm.university}
                        onChange={handleSignupChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
  <select
    name="college"
    value={signupForm.college}
    onChange={handleSignupChange}
    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all cursor-pointer"
  >
    <option value="">Select College</option>

    {colleges.map((college) => (
      <option key={college._id} value={college.name}>
        {college.name}
        {college.shortName ? ` (${college.shortName})` : ""}
      </option>
    ))}
  </select>
</div>

                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="courseName"
                        placeholder="Course"
                        value={signupForm.courseName}
                        onChange={handleSignupChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="yearOfStudy"
                        placeholder="Year"
                        value={signupForm.yearOfStudy}
                        onChange={handleSignupChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:bg-white focus:border-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors group">
                <input
                  type="checkbox"
                  name="agree"
                  checked={signupForm.agree}
                  onChange={handleSignupChange}
                  className="mt-0.5 w-4 h-4 rounded border-2 border-gray-300 text-[#03594E] focus:ring-2 focus:ring-[#03594E]/20 cursor-pointer"
                />
                <span className="text-xs text-gray-700 group-hover:text-gray-900 transition-colors">
                  I agree to <span className="font-semibold text-[#03594E]">Terms & Conditions</span>
                </span>
              </label>

              {/* Submit Button */}
              <button
                onClick={handleSignupSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-br from-[#F8C62F] to-[#FE8235] py-3 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    CREATING...
                  </span>
                ) : (
                  "SIGN UP"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Overlay Panel - Hidden on mobile, slides on desktop */}
        <div
          className={`hidden md:block absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out ${
            isSignUp ? "left-0" : "left-1/2"
          }`}
        >
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: isSignUp ? 'url("/signup.jpg")' : 'url("/login.jpg")',
              filter: "brightness(0.7)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#03594E]/80 to-[#1AB69D]/80"></div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-12">
              {!isSignUp ? (
                <>
                  <h2 className="text-5xl font-bold mb-4">Get Started</h2>
                  <p className="text-lg mb-8">Sign up now and if you don't have a account</p>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="px-12 py-3 border-2 border-white rounded-full font-bold hover:bg-white hover:text-[#03594E] transition"
                  >
                    SIGN UP
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-5xl font-bold mb-4">Welcome Back</h2>
                  <p className="text-lg mb-8">Sign in with Email & Password</p>
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="px-12 py-3 border-2 border-white rounded-full font-bold hover:bg-white hover:text-[#03594E] transition"
                  >
                    SIGN IN
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingAuthPage;
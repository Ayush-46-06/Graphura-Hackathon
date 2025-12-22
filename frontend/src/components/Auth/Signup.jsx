import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001/api/auth/register";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    contactNumber: "",
    university: "",
    college: "",
    role: "user",
    secretKey: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    if (form.role === "admin" && !form.secretKey) {
      alert("Secret key is required for admin registration");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        address: form.address,
        contactNumber: form.contactNumber,
        university: form.university,
        college: form.college,
        role: form.role,
      };

      if (form.role === "admin") {
        payload.secretKey = form.secretKey;
      }

      const res = await axios.post(API_URL, payload);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === "ERR_NETWORK" || err.message.includes("Network Error")) {
        alert("❌ Cannot connect to server. Please make sure the backend is running on port 5001.");
      } else {
        alert(err.response?.data?.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex pt-15 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

     
      <div className="w-1/2 hidden md:flex relative items-center justify-center p-12">
        <div
          className="absolute inset-0 m-8 rounded-3xl bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200')",
            filter: "brightness(0.6)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-purple-600/40 rounded-3xl" />
        </div>

        <div className="relative z-10 text-center px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
              Lorem, ipsum dolor. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">lorem</span>
            </h2>
            <p className="text-gray-200 text-lg mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex items-center justify-center gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-gray-300">lorem</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-300">lorem</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-gray-300">lorem</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 relative z-10">
        <div className="w-full max-w-lg">

          <div className="text-center mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm">
              <span className="text-indigo-300 font-semibold text-sm">✨ Get Started Free</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
              Create an account
            </h1>

            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">
                Login
              </Link>
            </p>
          </div>

        
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">

             
              <div className="flex gap-3">
                <div className="relative w-full group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                  />
                </div>
                <div className="relative w-full group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                  />
                </div>
              </div>

       
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 pl-10 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>

          
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min. 8 characters)"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 pl-10 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>

              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 pl-10 text-white transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none cursor-pointer"
                >
                  <option value="user" className="bg-gray-800">User</option>
                  <option value="admin" className="bg-gray-800">Admin</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
              </div>

             
              {form.role === "admin" && (
                <div className="relative group animate-slideDown">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400">🔑</span>
                  <input
                    type="password"
                    name="secretKey"
                    placeholder="Admin Secret Key"
                    value={form.secretKey}
                    onChange={handleChange}
                    required
                    className="w-full bg-red-500/10 border border-red-500 focus:border-red-400 rounded-xl p-3 pl-10 text-white placeholder-red-300/70 transition duration-300 focus:ring-2 focus:ring-red-500/30 outline-none"
                  />
                  <p className="text-xs text-red-400 mt-1 ml-1">⚠️ Admin access requires secret key</p>
                </div>
              )}

          
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="📱 Contact Number"
                  value={form.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="📍 Address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="university"
                  placeholder="🎓 University"
                  value={form.university}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />

                <input
                  type="text"
                  name="college"
                  placeholder="🏫 College"
                  value={form.college}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>

              
              <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                />
                <span className="group-hover:text-white transition">
                  I agree to the <span className="text-indigo-400 font-semibold">Terms & Conditions</span> and <span className="text-indigo-400 font-semibold">Privacy Policy</span>
                </span>
              </label>

           
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>

            </form>
          </div>

         
          <p className="text-center text-xs text-gray-500 mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Signup;
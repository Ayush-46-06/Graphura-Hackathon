import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001/api/auth/login";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(API_URL, form);
    const data = response.data;

    console.log("LOGIN RESPONSE:", data);

    if (!data.success) {
      throw new Error(data.message);
    }

    // Save auth info
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    // Navigate based on role
    if (data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }

  } catch (err) {
    console.error("Login error:", err);
    alert(err.response?.data?.message || err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex pt-15 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] relative overflow-hidden">
      
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 relative z-10">
        <div className="w-full max-w-md">

          
          <div className="text-center mb-8">
            <div className="inline-block mb-4 px-4 py-2  bg-gradient-to-br from-[#F8C62F] to-[#FE8235] rounded-full border border-indigo-500/30 backdrop-blur-sm">
              <span className="text-white font-semibold text-sm">👋 Welcome Back</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
              Sign in to your account
            </h1>
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-[#C2B067] hover:scale-3d font-semibold transition"
              >
                Sign up
              </a>
            </p>
          </div>

          
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📧</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3.5 pl-11 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>

              
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full bg-white/5 border border-gray-600 focus:border-indigo-500 rounded-xl p-3.5 pl-11 text-white placeholder-gray-400 transition duration-300 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                />
              </div>

             
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-[#C2B067] hover:scale-3d transition">
                  Forgot password?
                </a>
              </div>

             
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-[#F8C62F] to-[#FE8235] hover:scale-3d py-3.5 rounded-xl font-bold text-white shadow-sm shadow-yellow-100 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>

            </form>

           

            
            
          </div>

          
        </div>
      </div>

     
      <div className="w-1/2 relative overflow-hidden hidden md:flex items-center justify-center p-12">
        <div
          className="absolute inset-0 m-8 rounded-3xl bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200')",
            filter: "brightness(0.6)",
          }}
        >
          <div className="absolute inset-0  rounded-3xl" />
        </div>

        <div className="relative z-10 text-center px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 shadow-2xl">
            <h2 className="text-5xl font-extrabold text-white mb-5 leading-tight">
              Lorem, ipsum.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">LOrem</span>
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Login to continue your journey with us.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white text-sm">✨ lorem</span>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white text-sm">Lorem, ipsum dolor.</span>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white text-sm">Lorem, ipsum.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
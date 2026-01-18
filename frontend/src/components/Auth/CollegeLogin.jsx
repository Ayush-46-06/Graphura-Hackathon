import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "/api/college/login";

const CollegeLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API_URL, form);
      const data = res.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      // 🔐 Save auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🎓 Redirect to college dashboard
      navigate("/college/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#03594E] to-[#1AB69D] p-6">

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">

        <h2 className="text-3xl font-extrabold text-white mb-2 text-center">
          College Login
        </h2>

        <p className="text-gray-300 text-sm mb-6 text-center">
          Login using credentials sent to your official email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-[#F8C62F] to-[#FE8235] py-3 rounded-xl font-bold text-white transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-6 text-center">
          © {new Date().getFullYear()} Graphura
        </p>
      </div>
    </div>
  );
};

export default CollegeLogin;

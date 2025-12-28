// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENTS, DEPARTMENT_ROLES } from "../../utils/constants";
import { loginUser } from "../../services/authApi";
import { useCaptcha } from "../../hooks/useCaptcha";
import { roleRedirectMap } from "../../utils/roleRedirect";
const LoginForm = () => {
  const navigate = useNavigate();
  const { captcha, regenerate } = useCaptcha();

  const [form, setForm] = useState({
    department: "",
    role: "",
    email: "",
    password: "",
    captchaInput: "",
  });
  const [error, setError] = useState("");

  const roleKey = data.user.role.toLowerCase();
  const redirectPath = roleRedirectMap[roleKey] || "/login";

  navigate(redirectPath, { replace: true });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "department") {
        return { ...prev, department: value, role: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.captchaInput.trim() !== captcha) {
      setError("Captcha is incorrect.");
      regenerate();
      setForm((f) => ({ ...f, captchaInput: "" }));
      return;
    }

    const payload = {
      email: form.email, // must be "email"
      password: form.password,
      department: form.department,
      role: form.role,
    };

    const { ok, data } = await loginUser(payload);

    if (!ok) {
      setError(
        data.message ||
          "Login failed. Please register first for this department and role."
      );
      regenerate();
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("department", data.user.department);
    localStorage.setItem("user", JSON.stringify(data.user));

    const deptSlug = data.user.department.toLowerCase().replace(/\s+/g, "-");
    const roleSlug = data.user.role.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${deptSlug}/${roleSlug}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white py-4 text-center">
          <h1 className="text-xl font-semibold tracking-wide">GRAPURA</h1>
          <p className="text-xs mt-1">Graphura India Private Limited</p>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Login</h2>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <select
              name="department"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              name="role"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.role}
              onChange={handleChange}
              required
              disabled={!form.department}
            >
              <option value="">Select Role</option>
              {form.department &&
                DEPARTMENT_ROLES[form.department].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
            </select>

            <input
              type="email"
              name="email"
              placeholder="Email Id"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 bg-gray-100 border rounded font-mono tracking-widest text-sm select-none">
                  {captcha}
                </div>
                <button
                  type="button"
                  onClick={regenerate}
                  className="text-xs text-blue-600"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                name="captchaInput"
                placeholder="Enter Captcha"
                className="border px-3 py-2 rounded text-xs w-32"
                value={form.captchaInput}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="mt-2 text-xs text-center">
              New user?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600"
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

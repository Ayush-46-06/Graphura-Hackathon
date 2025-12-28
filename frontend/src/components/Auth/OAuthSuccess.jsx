import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const role = params.get("role"); // 👈 IMPORTANT

    if (token) {
      localStorage.setItem("token", token);

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, params]);

  return <p className="text-white text-center mt-20">Signing you in...</p>;
};

export default OAuthSuccess;

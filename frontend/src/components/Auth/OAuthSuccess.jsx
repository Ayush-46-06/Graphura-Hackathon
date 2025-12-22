import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <p className="text-white text-center mt-20">Signing you in...</p>;
};

export default OAuthSuccess;

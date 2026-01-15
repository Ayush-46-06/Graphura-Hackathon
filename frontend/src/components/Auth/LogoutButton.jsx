import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LogoutButton = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Optional: Clear any other stored data
    // localStorage.clear();

    // Add a small delay for better UX
    setTimeout(() => {
      setIsLoggingOut(false);
      navigate("/login");
    }, 500);
  };

 
  const variants = {
    default: "bg-yellow-300",
    outline: "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    ghost: "text-red-500 hover:bg-red-500/10",
    navbar: "text-gray-700 hover:text-red-500 hover:bg-red-50",
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`
        ${variants[variant]}
        px-6 py-2.5 rounded-xl font-semibold
        transition duration-300 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center gap-2
      `}
    >
      {isLoggingOut ? (
        <>
          <span className="w-4 h-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          Logging out...
        </>
      ) : (
        <>
          <span>🚪</span>
          Logout
        </>
      )}
    </button>
  );
};

export default LogoutButton;






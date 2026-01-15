import { useState } from "react";
import {
  User,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Award,
  ClipboardList,
  LogOut,
  Settings,
  Bell,
  Home,
  Menu,
  X
} from "lucide-react";

const menu = [
  { key: "profile", label: "Profile", icon: User, badge: null },
  { key: "explore", label: "Explore Hackathons", icon: Trophy, badge: null },
  { key: "myHackathons", label: "My Hackathons", icon: ClipboardList, badge: null },
  { key: "Testimonial", label: "Testimonial", icon: ClipboardList, badge: null },
];

const UserSidebar = ({ active, setActive }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        style={{ color: "#03594E" }}
      >
        <Menu size={24} strokeWidth={2.5} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 h-screen transition-all duration-300 flex flex-col shadow-lg
          md:relative fixed top-0 left-0 z-50
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <img 
                  src="/Hackathon_.svg" 
                  alt="Hackathon Logo" 
                  className="h-8 object-contain transform hover:scale-105 transition-transform"
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm active:scale-95"
                style={{ color: "#03594E" }}
              >
                <X size={18} />
              </button>

              {/* Collapse Button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm active:scale-95"
                style={{ color: "#03594E" }}
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menu.map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => {
                setActive(key);
                setIsMobileOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 relative group
                ${active === key
                  ? "text-white shadow-lg transform scale-[1.02]"
                  : "hover:bg-white hover:shadow-md text-gray-700"}
              `}
              style={active === key ? { 
                backgroundColor: "#03594E",
                boxShadow: "0 4px 12px rgba(3, 89, 78, 0.25)"
              } : {}}
              data-label={isCollapsed ? label : ""}
            >
              <Icon 
                size={20} 
                className={`${active === key ? "" : "group-hover:scale-110 transition-transform"}`}
                strokeWidth={active === key ? 2.5 : 2}
              />
              
              {!isCollapsed && (
                <>
                  <span className="font-semibold text-sm">{label}</span>
                  {badge && (
                    <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-bold shadow-sm
                      ${active === key 
                        ? "bg-white text-gray-800" 
                        : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"}
                    `}>
                      {badge}
                    </span>
                  )}
                </>
              )}

              {isCollapsed && badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* BACK TO HOME BUTTON */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <button
            onClick={() => {
              handleGoHome();
              setIsMobileOpen(false);
            }}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-semibold transition-all duration-200 group
              ${isCollapsed ? 'justify-center' : ''}
              bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-95
            `}
            data-label={isCollapsed ? "Back to Home" : ""}
          >
            <Home 
              size={20} 
              className="group-hover:-translate-x-1 transition-transform duration-200"
              strokeWidth={2.5}
            />
            {!isCollapsed && <span className="text-sm">Back to Home</span>}
          </button>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => {
              handleLogout();
              setIsMobileOpen(false);
            }}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-semibold transition-all duration-200 group
              ${isCollapsed ? 'justify-center' : ''}
              bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-500 hover:to-red-600 hover:text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-95
            `}
            data-label={isCollapsed ? "Logout" : ""}
          >
            <LogOut 
              size={20} 
              className="group-hover:rotate-12 transition-transform duration-200"
              strokeWidth={2.5}
            />
            {!isCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>

        {/* COLLAPSED TOOLTIP */}
        {isCollapsed && (
          <style>{`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in {
              animation: fade-in 0.3s ease-out;
            }
            aside button[data-label]:hover::after {
              content: attr(data-label);
              position: absolute;
              left: 100%;
              margin-left: 12px;
              background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
              color: white;
              padding: 8px 14px;
              border-radius: 8px;
              font-size: 13px;
              font-weight: 600;
              white-space: nowrap;
              z-index: 50;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              animation: fade-in 0.2s ease-out;
            }
          `}</style>
        )}
      </aside>
    </>
  );
};

export default UserSidebar;
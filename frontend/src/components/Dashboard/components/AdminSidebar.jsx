import { useState } from "react";
import {
  Home,
  Trophy,
  FileText,
  Users,
  CreditCard,
  PlusCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  BarChart3,
  Menu,
  User
} from "lucide-react";
import LogoutButton from "../../Auth/LogoutButton";

const menu = [
  { key: "dashboard", label: "Dashboard", icon: Home, badge: null },
  { key: "transactions", label: "Transactions", icon: CreditCard, badge: "12" },
  { key: "hackathons", label: "Hackathons", icon: Trophy, badge: null },
  { key: "blogs", label: "Blogs", icon: FileText, badge: null },
  { key: "users", label: "Users", icon: Users, badge: "3" },
  
];

const AdminSidebar = ({ active, setActive }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      
    }
  };

  return (
    <aside 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r h-screen transition-all duration-300 flex flex-col shadow-sm`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* HEADER */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: "#03594E" }}>
                A
              </div>
              <div>
                <h1 className="text-lg font-bold" style={{ color: "#0C121D" }}>
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500">DevTools Platform</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "#03594E" }}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* ADMIN PROFILE */}
      {/* {!isCollapsed && (
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: "#03594E" }}>
              AD
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: "#0C121D" }}>Admin User</p>
              <p className="text-xs text-gray-500">admin@devtools.com</p>
            </div>
          </div>
        </div>
      )} */}

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menu.map(({ key, label, icon: Icon, badge }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 relative group
              ${active === key
                ? "text-white shadow-md"
                : "hover:bg-gray-50 text-gray-700"}
            `}
            style={active === key ? { backgroundColor: "#03594E" } : {}}
          >
            <Icon size={20} className={active === key ? "" : "group-hover:scale-110 transition-transform"} />
            
            {!isCollapsed && (
              <>
                <span className="font-medium">{label}</span>
                {badge && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold
                    ${active === key 
                      ? "bg-white text-gray-700" 
                      : "bg-yellow-100 text-yellow-700"}
                  `}>
                    {badge}
                  </span>
                )}
              </>
            )}

            {isCollapsed && badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* QUICK ADD SECTION */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all shadow-md"
            style={{ backgroundColor: "#F8C62F" }}
          >
            <PlusCircle size={18} />
            Quick Add
          </button>
          
          {showQuickAdd && (
            <div className="mt-2 space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 text-gray-700 transition-colors">
                + New Hackathon
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 text-gray-700 transition-colors">
                + New Blog Post
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 text-gray-700 transition-colors">
                + New User
              </button>
            </div>
          )}
        </div>
      )}

      {/* BOTTOM ACTIONS */}
      {/* <div className="p-4 border-t border-gray-100 space-y-1">
        <button
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left hover:bg-gray-50 text-gray-700 transition-colors
            ${isCollapsed ? 'justify-center' : ''}
          `}
        > */}
          {/* <Bell size={20} />
          {!isCollapsed && <span className="font-medium">Notifications</span>}
        </button> */}

        {/* <button
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left hover:bg-gray-50 text-gray-700 transition-colors
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <Settings size={20} />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </button> */}

        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left hover:bg-red-50 text-red-600 transition-colors
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          
          <LogoutButton />
          
        </button>
    

      {/* COLLAPSED TOOLTIP */}
      {isCollapsed && (
        <style>{`
          aside button:hover::after {
            content: attr(data-label);
            position: absolute;
            left: 100%;
            margin-left: 10px;
            background: #1F2937;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 50;
          }
        `}</style>
      )}
    </aside>
  );
};

export default AdminSidebar;
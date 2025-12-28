import { useState } from "react";
import { User, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import LogoutButton from "../../Auth/LogoutButton";

const menu = [
  { key: "profile", label: "Profile", icon: User }
];

const UserSidebar = ({ active, setActive }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r h-screen transition-all duration-300 flex flex-col`}
    >
      {/* HEADER */}
      <div className="p-5 border-b flex justify-between items-center">
        {!isCollapsed && (
          <h1 className="text-lg font-bold text-gray-800">
            User Panel
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-3 space-y-1">
        {menu.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition
              ${
                active === key
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }
            `}
          >
            <Icon size={20} />
            {!isCollapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default UserSidebar;

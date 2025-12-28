import { useState } from "react";
import UserSidebar from "./UserComponents/UserSidebar";
import Profile from "./UserComponents/Profile";

const UserDashboard = () => {
  const [active, setActive] = useState("profile");

  const renderSection = () => {
    switch (active) {
      case "profile":
        return <Profile />;
      default:
        return (
          <div className="p-6 text-gray-600">
            Coming soon...
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <UserSidebar active={active} setActive={setActive} />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default UserDashboard;

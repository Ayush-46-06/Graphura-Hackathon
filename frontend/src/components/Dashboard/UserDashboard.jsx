import { useState } from "react";
import UserSidebar from "./UserComponents/UserSidebar";
import Profile from "./UserComponents/Profile";
import ExploreEvents from "./UserComponents/AllHackathon";
import MyHackathons from "./UserComponents/MyHackathons";
import Certificates from "./UserComponents/Certificates";
import Testimonials from "./UserComponents/Testimonial";


const UserDashboard = () => {
  const [active, setActive] = useState("profile");

 const renderSection = () => {
  switch (active) {
    case "profile":
      return <Profile />;

    case "explore":
      return <ExploreEvents />;

    case "myHackathons":
      return <MyHackathons />;

    case "certificates":
      return <Certificates />;

    case "testimonials":
      return <Testimonials />;

    default:
       return <Testimonials />;

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

import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import Transactions from "./components/TransactionsTable";
import Hackathons from "./components/Hackathons";
import Blogs from "./components/Blog";
import Users from "./components/User";
import DashboardHome from "./components/DashboardHome";
import AdminUserRegistrations from "./components/AdminUserRegistrations";
import HackathonRegistrationStats from "./components/HackathonRegistrationStats";
import DeclareResult from "./components/DeclareResult";

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");

  const renderSection = () => {
  switch (active) {
    case "transactions":
      return <Transactions />;
    case "hackathons":
      return <Hackathons />;
    case "blogs":
      return <Blogs />;
    case "users":
      return <AdminUserRegistrations />;
    case "Result":
      return <HackathonRegistrationStats />;
    case "declare-result":            
      return <DeclareResult />;       
    default:
      return <DashboardHome />;
  }
};


  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar active={active} setActive={setActive} />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;

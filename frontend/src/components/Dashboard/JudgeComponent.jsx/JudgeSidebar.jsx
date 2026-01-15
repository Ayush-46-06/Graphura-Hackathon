const JudgeSidebar = ({ active, setActive }) => {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6 text-xl font-bold">Judge Panel</div>

      <nav className="space-y-2 px-4">
        <button
          onClick={() => setActive("dashboard")}
          className={`sidebar-btn ${active === "dashboard" && "active"}`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActive("hackathons")}
          className={`sidebar-btn ${active === "hackathons" && "active"}`}
        >
          Hackathons
        </button>
      </nav>
    </aside>
  );
};

export default JudgeSidebar;

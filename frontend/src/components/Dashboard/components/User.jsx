import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [college, setCollege] = useState("");

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(`${API_BASE}/admin/users`);
        setUsers(usersRes.data.data || []);

        // ⚠️ Using registrations to derive hackathon participation
        const regRes = await axios.get(`${API_BASE}/admin/registrations`);
        setRegistrations(regRes.data.data || []);
      } catch (err) {
        console.error("FETCH USERS ERROR:", err);
      }
    };

    fetchData();
  }, []);

  /* ================= MAP USER → HACKATHONS ================= */
  const getUserHackathons = (userId) => {
    const participated = registrations.filter(
      (r) => r.user?._id === userId
    );

    if (participated.length === 0) return null;

    return participated
      .map((r) => r.hackathon?.title)
      .filter(Boolean)
      .join(", ");
  };

  /* ================= FILTER ================= */
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      (college ? u.university === college : true)
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <h2 className="text-xl font-bold">All Users</h2>

      {/* Filters */}
      <div className="flex gap-4">
        <input
          placeholder="Search by name"
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        >
          <option value="">All Colleges</option>
          <option value="MDU">MDU</option>
          <option value="DU">DU</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">College</th>
            <th className="text-left p-2">Hackathons Participated</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u) => {
            const hackathons = getUserHackathons(u._id);

            return (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.university || "—"}</td>
                <td className="p-2 text-sm text-gray-600">
                  {hackathons || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

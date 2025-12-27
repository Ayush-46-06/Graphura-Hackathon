import { useState } from "react";

const usersData = [
  { name: "Ayush", email: "ayush@gmail.com", college: "MDU" },
  { name: "Neha", email: "neha@gmail.com", college: "DU" },
  { name: "Rohit", email: "rohit@gmail.com", college: "MDU" },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [college, setCollege] = useState("");

  const filtered = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      (college ? u.college === college : true)
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">

      <h2 className="text-xl font-bold">All Users</h2>

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

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>College</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.college}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Users;

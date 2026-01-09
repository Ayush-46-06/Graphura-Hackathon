import { useState } from "react";

const usersData = [
  { name: "Ayush", email: "ayush@gmail.com", collegeName: "MDU" },
  { name: "Neha", email: "neha@gmail.com", collegeName: "DU" },
  { name: "Rohit", email: "rohit@gmail.com", collegeName: "MDU" },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [collegeName, setCollegeName] = useState("");

  const filtered = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      (collegeName ? u.collegeName === collegeName : true)
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
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
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
              <td>{u.collegeName}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Users;

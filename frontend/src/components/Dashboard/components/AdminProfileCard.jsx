const AdminProfileCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold">Welcome Back, Admin 👋</h2>
        <p className="text-gray-500 mt-1">
          Here’s what’s happening with your hackathons today
        </p>

        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">
          View Profile
        </button>
      </div>

      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-16 h-16 rounded-full border"
        />
      </div>

    </div>
  );
};

export default AdminProfileCard;

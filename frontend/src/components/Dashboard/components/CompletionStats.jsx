const CompletionStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Growth */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Registration Growth (Tomorrow)</p>
        <h3 className="text-3xl font-bold text-green-600 mt-2">+12%</h3>
      </div>

      {/* Completion */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-6">
        <div className="w-20 h-20 rounded-full border-8 border-indigo-600 flex items-center justify-center">
          <span className="font-bold">67%</span>
        </div>
        <div>
          <h4 className="font-semibold">Completion Rate</h4>
          <p className="text-gray-500">
            67 out of 100 students completed registration
          </p>
        </div>
      </div>

    </div>
  );
};

export default CompletionStats;

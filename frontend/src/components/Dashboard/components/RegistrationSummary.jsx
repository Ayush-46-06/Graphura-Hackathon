const RegistrationSummary = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">

      <h3 className="text-lg font-semibold">Registration Summary</h3>

      <div>
        <p className="text-gray-500">Total Registration</p>
        <h4 className="text-xl font-bold">1450</h4>
      </div>

      <div>
        <p className="text-gray-500">Current Registration</p>
        <h4 className="text-xl font-bold">320</h4>
      </div>

      <div>
        <p className="text-gray-500">This Month Registration</p>
        <h4 className="text-xl font-bold">680</h4>
      </div>

    </div>
  );
};

export default RegistrationSummary;

const stats = [
  { title: "Total Hackathons", value: 12 },
  { title: "Completed Hackathons", value: 8 },
  { title: "Total Registrations", value: 1450 },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <p className="text-gray-500">{item.title}</p>
          <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default StatCards;

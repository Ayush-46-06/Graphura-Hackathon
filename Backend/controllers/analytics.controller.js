import Registration from "../model/Registration.model.js";
import Transaction from "../model/Transaction.model.js";
import Hackathon from "../model/Hackathon.model.js";

export const adminDashboardOverview = async (req, res) => {
  const totalHackathons = await Hackathon.countDocuments();
  const totalRegistrations = await Registration.countDocuments();
  const completedHackathons = await Hackathon.countDocuments({ status: "completed" });

  res.json({
    success: true,
    data: {
      totalHackathons,
      completedHackathons,
      totalRegistrations
    }
  });
};

export const hackathonGraphData = async (req, res) => {
  const { filter } = req.query;

  const groupBy =
    filter === "day"
      ? { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
      : filter === "year"
      ? { $year: "$createdAt" }
      : { $month: "$createdAt" };

  const data = await Registration.aggregate([
    { $group: { _id: groupBy, count: { $sum: 1 } } }
  ]);

  res.json({ success: true, data });
};

export const transactionStats = async (req, res) => {
  const stats = await Transaction.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  res.json({ success: true, data: stats });
};

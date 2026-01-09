import Registration from "../models/Registration.model.js";
import Transaction from "../models/Transaction.model.js";
import Hackathon from "../models/Hackathon.model.js";
import User from "../models/User.model.js";
import Certificate from "../models/Certificate.model.js";


export const adminDashboardOverview = async (req, res) => {
  try {
    const [
      totalHackathons,
      completedHackathons,
      totalRegistrations,
      totalUsers
    ] = await Promise.all([
      Hackathon.countDocuments(),
      Hackathon.countDocuments({ status: "completed" }),
      Registration.countDocuments(),
      User.countDocuments()
    ]);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const currentMonthRegistrations = await Registration.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    res.json({
      success: true,
      data: {
        totalHackathons,
        completedHackathons,
        totalRegistrations,
        currentMonthRegistrations,
        totalUsers
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard overview"
    });
  }
};


export const registrationGrowth = async (req, res) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayCount = await Registration.countDocuments({
    createdAt: { $gte: new Date(today.setHours(0,0,0,0)) }
  });

  const yesterdayCount = await Registration.countDocuments({
    createdAt: {
      $gte: new Date(yesterday.setHours(0,0,0,0)),
      $lt: new Date(today.setHours(0,0,0,0))
    }
  });

  const growth =
    yesterdayCount === 0
      ? 100
      : Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);

  res.json({
    success: true,
    data: {
      today: todayCount,
      yesterday: yesterdayCount,
      growthPercentage: growth
    }
  });
};


export const registrationCompletion = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const registeredUsers = await Registration.distinct("user");

  const completion =
    totalUsers === 0
      ? 0
      : Math.round((registeredUsers.length / totalUsers) * 100);

  res.json({
    success: true,
    data: {
      completionPercentage: completion
    }
  });
};


export const hackathonGraphData = async (req, res) => {
  try {
    const { filter = "month" } = req.query;

    let match = {};
    let groupBy;
    let labels = [];

    const now = new Date();

    // 1️⃣ LAST 7 DAYS
    if (filter === "day") {
      const start = new Date();
      start.setDate(start.getDate() - 6);

      match = { createdAt: { $gte: start } };

      groupBy = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };

      labels = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d.toISOString().split("T")[0];
      });
    }

    // 2️⃣ THIS YEAR (GROUP BY MONTH)
    else if (filter === "month") {
      const start = new Date(now.getFullYear(), 0, 1);

      match = { createdAt: { $gte: start } };

      groupBy = { $month: "$createdAt" };

      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    }

    // 3️⃣ LAST 5 YEARS (GROUP BY YEAR)
    else if (filter === "year") {
      const start = new Date(now.getFullYear() - 4, 0, 1);

      match = { createdAt: { $gte: start } };

      groupBy = { $year: "$createdAt" };

      labels = Array.from({ length: 5 }).map(
        (_, i) => now.getFullYear() - 4 + i
      );
    }

    const rawData = await Registration.aggregate([
      { $match: match },
      { $group: { _id: groupBy, count: { $sum: 1 } } },
    ]);

    const data = labels.map((label, idx) => {
      const match =
        filter === "year"
          ? rawData.find((d) => d._id === label)
          : rawData.find((d) => d._id === idx + 1 || d._id === label);

      return { label, count: match ? match.count : 0 };
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load graph data",
    });
  }
};

export const transactionStats = async (req, res) => {
  const stats = await Transaction.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const statuses = ["pending", "success", "rejected"];

  res.json({
    success: true,
    data: statuses.map(s => ({
      label: s,
      count: stats.find(x => x._id === s)?.count || 0
    }))
  });
};


export const allTransactions = async (req, res) => {
  const transactions = await Transaction.find()
    .populate("user", "name email")
    .populate("hackathon", "title");

  res.json({ success: true, data: transactions });
};


export const hackathonDetailsAdmin = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate("participants", "name email")
      .populate("winnerDetails.user", "name email university");

    res.json({
      success: true,
      data: hackathons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const userDashboardOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({ user: userId })
      .populate("hackathon", "title status");

    const completedHackathons = registrations.filter(
      r => r.hackathon && r.hackathon.status === "completed"
    ).length;

    const certificates = await Certificate.find({ user: userId });

    res.json({
      success: true,
      data: {
        totalHackathons: registrations.length,
        completedHackathons,
        certificates
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const suggestedHackathons = async (req, res) => {
  const hackathons = await Hackathon.find({ status: "upcoming" }).limit(5);
  res.json({ success: true, data: hackathons });
};



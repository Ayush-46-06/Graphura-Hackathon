import Registration from "../models/Registration.model.js";
import Transaction from "../models/Transaction.model.js";
import Hackathon from "../models/Hackathon.model.js";

export const adminDashboardOverview = async (req, res) => {
  try {
    const [
      totalHackathons,
      completedHackathons,
      totalRegistrations
    ] = await Promise.all([
      Hackathon.countDocuments(),
      Hackathon.countDocuments({ status: "completed" }),
      Registration.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        totalHackathons,
        completedHackathons,
        totalRegistrations
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard overview"
    });
  }
};

export const hackathonGraphData = async (req, res) => {
  try {
    const { filter = "month" } = req.validatedQuery || req.query;

    let groupBy;
    let labels = [];

    if (filter === "day") {
      groupBy = {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt",
          timezone: "Asia/Kolkata"
        }
      };

      labels = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split("T")[0];
      });

    } else if (filter === "year") {
      groupBy = { $year: "$createdAt" };

      const currentYear = new Date().getFullYear();
      labels = Array.from({ length: 5 }, (_, i) => currentYear - (4 - i));

    } else {
      groupBy = { $month: "$createdAt" };

      labels = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];
    }

    const rawData = await Registration.aggregate([
      { $group: { _id: groupBy, count: { $sum: 1 } } }
    ]);

    const data = labels.map((label, index) => {
      let match;

      if (filter === "month") {
        match = rawData.find(d => d._id === index + 1);
      } else {
        match = rawData.find(d => d._id == label);
      }

      return {
        label,
        count: match ? match.count : 0
      };
    });

    res.json({ success: true, data });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load graph data"
    });
  }
};

export const transactionStats = async (req, res) => {
  try {
    const rawStats = await Transaction.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const statuses = ["pending", "success", "rejected"];

    const data = statuses.map(status => {
      const found = rawStats.find(s => s._id === status);
      return {
        label: status,
        count: found ? found.count : 0
      };
    });

    res.json({ success: true, data });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transaction stats"
    });
  }
};

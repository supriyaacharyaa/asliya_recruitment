import Visit from "../models/VisitModel.js";
import Enquiry from "../models/EnquiryModel.js";
import JobView from "../models/JobView.js";

// GET /api/stats/overview
export const getOverview = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    const [
      totalVisits,
      visitsThisMonth,
      visitsLastMonth,
      totalEnquiries,
      enquiriesThisMonth,
      enquiriesLastMonth,
    ] = await Promise.all([
      Visit.countDocuments(),
      Visit.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Visit.countDocuments({
        createdAt: { $gte: lastMonth, $lte: endOfLastMonth },
      }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Enquiry.countDocuments({
        createdAt: { $gte: lastMonth, $lte: endOfLastMonth },
      }),
    ]);

    const visitChange =
      visitsLastMonth > 0
        ? (((visitsThisMonth - visitsLastMonth) / visitsLastMonth) * 100).toFixed(1)
        : 0;

    const enquiryChange =
      enquiriesLastMonth > 0
        ? (((enquiriesThisMonth - enquiriesLastMonth) / enquiriesLastMonth) * 100).toFixed(1)
        : 0;

    res.json({
      totalVisits,
      visitsThisMonth,
      visitChangePercent: Number(visitChange),
      totalEnquiries,
      enquiriesThisMonth,
      enquiryChangePercent: Number(enquiryChange),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/stats/visits-daily  — last 7 days
export const getDailyVisits = async (req, res) => {
  try {
    const days = 7;
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const count = await Visit.countDocuments({
        createdAt: { $gte: start, $lt: end },
      });

      result.push({
        date: start.toISOString().split("T")[0],
        day: start.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/stats/enquiry-sources
export const getEnquirySources = async (req, res) => {
  try {
    const sources = await Enquiry.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const total = sources.reduce((sum, s) => sum + s.count, 0);

    const result = sources.map((s) => ({
      source: s._id || "direct",
      count: s.count,
      percent: total > 0 ? Math.round((s.count / total) * 100) : 0,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/stats/top-job-views
export const getTopJobViews = async (req, res) => {
  try {
    const topJobs = await JobView.aggregate([
      {
        $group: {
          _id: "$jobId",
          views: { $sum: 1 },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      {
        $project: {
          _id: 0,
          jobId: "$_id",
          title: "$job.title",
          country: "$job.country",
          status: "$job.status",
          views: 1,
        },
      },
    ]);

    res.json(topJobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/stats/recent-activity
export const getRecentActivity = async (req, res) => {
  try {
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name source createdAt");

    const activity = recentEnquiries.map((e) => ({
      type: "enquiry",
      message: `New enquiry from ${e.name}`,
      source: e.source,
      time: e.createdAt,
    }));

    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
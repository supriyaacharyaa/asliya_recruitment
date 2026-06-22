import mongoose from "mongoose";
import JobView from "../models/JobView.js";

// POST /api/job-views
// Body: { jobId }
export const trackJobView = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Valid jobId is required" });
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    await JobView.create({ jobId, ip });

    res.status(201).json({ tracked: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
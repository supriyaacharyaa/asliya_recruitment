import mongoose from "mongoose";

const jobViewSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("JobView", jobViewSchema);
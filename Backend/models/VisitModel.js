import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  ip: { type: String },
  userAgent: { type: String },
  path: { type: String, default: "/" },
  referer: { type: String, default: "direct" },
  source: { type: String, default: "direct" }, // google, facebook, direct, etc.
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Visit", visitSchema);
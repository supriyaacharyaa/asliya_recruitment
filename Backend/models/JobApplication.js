import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    coverLetter: {
      type: String,
      trim: true,
    },

    cvFileName: String,
    cvUrl: String,

    sentTo: String,

    status: {
      type: String,
      enum: [
        "received",
        "reviewed",
        "shortlisted",
        "rejected",
        "hired",
      ],
      default: "received",
    },
  },
  {
    timestamps: true,
  }
);

jobApplicationSchema.index({ job: 1 });
jobApplicationSchema.index({ status: 1 });
jobApplicationSchema.index({ createdAt: -1 });

export default mongoose.model("JobApplication", jobApplicationSchema);
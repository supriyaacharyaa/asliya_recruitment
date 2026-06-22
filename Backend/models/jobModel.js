import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    company: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    locationType: {
      type: String,
      enum: ["onsite", "remote", "hybrid"],
      default: "onsite",
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "temporary"],
      default: "full-time",
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "lead", "executive"],
      default: "mid",
    },
    salaryMin: { type: Number, default: null },
    salaryMax: { type: Number, default: null },
    salaryCurrency: { type: String, default: "USD", uppercase: true },
    salaryPeriod: {
      type: String,
      enum: ["hourly", "monthly", "yearly"],
      default: "yearly",
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
      default: "",
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    category: { type: String, trim: true, default: "General" },
    department: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    applicationDeadline: { type: Date, default: null },
    applicationEmail: { type: String, trim: true, lowercase: true, default: "" },
    applicationUrl: { type: String, trim: true, default: "" },
    metaTitle: {
      type: String,
      maxlength: [60, "Meta title cannot exceed 60 characters"],
      default: "",
    },
    metaDescription: {
      type: String,
      maxlength: [160, "Meta description cannot exceed 160 characters"],
      default: "",
    },
    views: { type: Number, default: 0 },
    applicationsCount: { type: Number, default: 0 },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

jobSchema.pre("save", async function () {
  if (this.isModified("status") && this.status === "active" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

jobSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  const newStatus = update?.status ?? update?.$set?.status;

  if (newStatus === "active") {
    this.setUpdate({
      ...update,
      $set: {
        ...(update.$set || {}),
        publishedAt: new Date(),
      },
    });
  }
});

jobSchema.index({ title: "text", description: "text", skills: "text", category: "text" });
jobSchema.index({ status: 1, publishedAt: -1 });

const Job = mongoose.model("Job", jobSchema);

export default Job;
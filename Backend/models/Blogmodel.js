import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    heroImage: {
      type: String,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxLength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    sections: [sectionSchema],
    faqs: [faqSchema],
    category: {
      type: String,
      index: true,
      default: "General",
    },
    tags: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    metaTitle: { type: String, maxLength: 60 },
    metaDescription: { type: String, maxLength: 160 },
    canonicalUrl: { type: String },
    focusKeyword: { type: String },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ title: "text", content: "text" });

blogSchema.pre("save", async function () {
  if (
    this.isModified("status") &&
    this.status === "published" &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }
});

export default mongoose.model("Blog", blogSchema);
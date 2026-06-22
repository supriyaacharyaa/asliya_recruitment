import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    phone: {
      type: String,
      trim: true,
      match: /^[0-9+\-() ]{7,20}$/,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },

    message: { type: String },

    source: {
      type: String,
      default: "direct",
      enum: ["direct", "whatsapp", "facebook", "google", "instagram", "referral"],
    },

    type: {
      type: String,
      enum: ["contact", "quote", "job", "other"],
      default: "contact",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
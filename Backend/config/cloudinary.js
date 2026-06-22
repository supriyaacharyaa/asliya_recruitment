// backend/src/config/cloudinary.js

import cloudinary from "cloudinary";
import multer from "multer";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer stores file temporarily in local server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type"), false);
  },
});

// Upload helper function
export const uploadToCloudinary = async (filePath, folder = "asliya") => {
  const result = await cloudinary.v2.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });

  fs.unlinkSync(filePath); // delete local file after upload
  return result;
};

export default cloudinary;
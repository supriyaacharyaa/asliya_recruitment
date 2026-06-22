import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Adminuser.js";

dotenv.config();

const updatePassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "info@asliyarecruitment.com";
    const newPassword = "asliya2018";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await Admin.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!admin) {
      console.log("Admin not found");
      process.exit(1);
    }

    console.log("✅ Password updated successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updatePassword();
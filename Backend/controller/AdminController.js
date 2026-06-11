import Admin from "../models/Adminuser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

export const Adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

   
    return res.status(200).json({
      message: "Login successful",
      token, 
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
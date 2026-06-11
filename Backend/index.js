import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminRoute from './routes/AdminRoute.js';
import blogRoutes from "./routes/blogRoutes.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/admin", AdminRoute);
app.use("/api/blog",blogRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
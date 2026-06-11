import express from "express";
import { Adminlogin } from "../controller/AdminController.js";

const AdminRouter = express.Router();

AdminRouter.post("/login", Adminlogin);

export default AdminRouter;
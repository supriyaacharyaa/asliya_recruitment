import express from "express";
import { trackJobView } from "../controller/jobViewController.js";

const router = express.Router();

router.post("/", trackJobView);

export default router;
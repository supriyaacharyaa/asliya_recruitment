import express from "express";
import {
  getOverview,
  getDailyVisits,
  getEnquirySources,
  getTopJobViews,
  getRecentActivity,
} from "../controller/statsController.js";

const router = express.Router();

router.get("/overview", getOverview);
router.get("/visits-daily", getDailyVisits);
router.get("/enquiry-sources", getEnquirySources);
router.get("/top-job-views", getTopJobViews);
router.get("/recent-activity", getRecentActivity);

export default router;
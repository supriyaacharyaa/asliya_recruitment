import express from "express";
import {
  getPublicJobs,
  getPublicJobBySlug,
  adminGetAllJobs,
  adminGetJobById,
  createJob,
  updateJob,
  closeJob,
  toggleFeatured,
  deleteJob,
} from "../controller/jobController.js";

// Import your auth middleware here once ready:
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ── Admin routes  (must come BEFORE /:id wildcards) ──────────────────────────
router.get("/admin/all", adminGetAllJobs);
router.get("/admin/:id", adminGetJobById);

// ── Public routes ─────────────────────────────────────────────────────────────
router.get("/", getPublicJobs);
router.get("/slug/:slug", getPublicJobBySlug);

// ── CRUD ──────────────────────────────────────────────────────────────────────
router.post("/", createJob);
router.put("/:id", updateJob);
router.patch("/:id/close", closeJob);
router.patch("/:id/feature", toggleFeatured);
router.delete("/:id", deleteJob);

export default router;
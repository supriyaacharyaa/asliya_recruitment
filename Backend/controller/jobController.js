import Job from "../models/jobModel.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// const parseArray = (value) => {
//   if (Array.isArray(value)) return value.filter(Boolean);
//   if (typeof value === "string") {
//     try {
//       const parsed = JSON.parse(value);
//       if (Array.isArray(parsed)) return parsed.filter(Boolean);
//     } catch {
//       // comma-separated fallback
//       return value.split(",").map((v) => v.trim()).filter(Boolean);
//     }
//   }
//   return [];
// };
const parseArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) return value.filter(Boolean);

  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

// ─── Public Controllers ───────────────────────────────────────────────────────

/**
 * GET /api/jobs
 * Public listing — only active jobs
 */
export const getPublicJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category = "",
      locationType = "",
      employmentType = "",
      experienceLevel = "",
      featured = "",
    } = req.query;

    const query = { status: "active" };

    if (search) {
      query.$text = { $search: search };
    }
    if (category) query.category = { $regex: category, $options: "i" };
    if (locationType) query.locationType = locationType;
    if (employmentType) query.employmentType = employmentType;
    if (experienceLevel) query.experienceLevel = experienceLevel;
    if (featured === "true") query.featured = true;

    const skip = (Number(page) - 1) * Number(limit);

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .sort({ featured: -1, publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("-__v -metaTitle -metaDescription"),
      Job.countDocuments(query),
    ]);

    res.json({
      jobs,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};

/**
 * GET /api/jobs/:slug
 * Public single job by slug — increments view count
 */
export const getPublicJobBySlug = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
  { slug: req.params.slug, status: "active" },
  { $inc: { views: 1 } },
  { returnDocument: "after" }
).select("-__v");

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ job });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job", error: err.message });
  }
};

// ─── Admin Controllers ────────────────────────────────────────────────────────

/**
 * GET /api/jobs/admin/all
 * Admin — all jobs with filtering, search, pagination
 */
export const adminGetAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 8,
      search = "",
      status = "",
      category = "",
      featured = "",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;
    if (category) query.category = { $regex: category, $options: "i" };
    if (featured === "true") query.featured = true;

    const skip = (Number(page) - 1) * Number(limit);

    const [jobs, total, activeCount, draftCount, closedCount] = await Promise.all([
      Job.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("-__v"),
      Job.countDocuments(query),
      Job.countDocuments({ status: "active" }),
      Job.countDocuments({ status: "draft" }),
      Job.countDocuments({ status: "closed" }),
    ]);

    res.json({
      jobs,
      count: total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      activeCount,
      draftCount,
      closedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};

/**
 * GET /api/jobs/admin/:id
 * Admin — single job by ID
 */
export const adminGetJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select("-__v");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ job });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job", error: err.message });
  }
};

/**
 * POST /api/jobs
 * Admin — create job
 */
export const createJob = async (req, res) => {
  try {
    const body = req.body;

    // Check slug uniqueness
    const exists = await Job.findOne({ slug: body.slug });
    if (exists) return res.status(400).json({ message: "A job with this slug already exists" });

    const jobData = {
      title: body.title,
      slug: body.slug,
      company: body.company || "",
      location: body.location || "",
      locationType: body.locationType || "onsite",
      employmentType: body.employmentType || "full-time",
      experienceLevel: body.experienceLevel || "mid",
      salaryMin: body.salaryMin ? Number(body.salaryMin) : null,
      salaryMax: body.salaryMax ? Number(body.salaryMax) : null,
      salaryCurrency: body.salaryCurrency || "USD",
      salaryPeriod: body.salaryPeriod || "yearly",
      excerpt: body.excerpt || "",
      description: body.description,
      requirements: parseArray(body.requirements),
      responsibilities: parseArray(body.responsibilities),
      benefits: parseArray(body.benefits),
      skills: parseArray(body.skills),
      category: body.category || "General",
      department: body.department || "",
      status: body.status || "draft",
      featured: body.featured === "true" || body.featured === true,
      applicationDeadline: body.applicationDeadline || null,
      applicationEmail: body.applicationEmail || "",
      applicationUrl: body.applicationUrl || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
    };

    const job = await Job.create(jobData);

    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
  console.log("CREATE JOB ERROR:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      error: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "A job with this slug already exists",
    });
  }

  res.status(500).json({
    message: "Failed to create job",
    error: err.message,
  });
}
};

/**
 * PUT /api/jobs/:id
 * Admin — update job
 */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Check slug uniqueness (exclude current doc)
    if (body.slug) {
      const conflict = await Job.findOne({ slug: body.slug, _id: { $ne: id } });
      if (conflict) return res.status(400).json({ message: "A job with this slug already exists" });
    }

    const updateData = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.company !== undefined && { company: body.company }),
      ...(body.location !== undefined && { location: body.location }),
      ...(body.locationType !== undefined && { locationType: body.locationType }),
      ...(body.employmentType !== undefined && { employmentType: body.employmentType }),
      ...(body.experienceLevel !== undefined && { experienceLevel: body.experienceLevel }),
      ...(body.salaryMin !== undefined && { salaryMin: body.salaryMin ? Number(body.salaryMin) : null }),
      ...(body.salaryMax !== undefined && { salaryMax: body.salaryMax ? Number(body.salaryMax) : null }),
      ...(body.salaryCurrency !== undefined && { salaryCurrency: body.salaryCurrency }),
      ...(body.salaryPeriod !== undefined && { salaryPeriod: body.salaryPeriod }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.requirements !== undefined && { requirements: parseArray(body.requirements) }),
      ...(body.responsibilities !== undefined && { responsibilities: parseArray(body.responsibilities) }),
      ...(body.benefits !== undefined && { benefits: parseArray(body.benefits) }),
      ...(body.skills !== undefined && { skills: parseArray(body.skills) }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.department !== undefined && { department: body.department }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.featured !== undefined && { featured: body.featured === "true" || body.featured === true }),
      ...(body.applicationDeadline !== undefined && { applicationDeadline: body.applicationDeadline || null }),
      ...(body.applicationEmail !== undefined && { applicationEmail: body.applicationEmail }),
      ...(body.applicationUrl !== undefined && { applicationUrl: body.applicationUrl }),
      ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
      ...(body.metaDescription !== undefined && { metaDescription: body.metaDescription }),
    };

    const job = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Job updated successfully", job });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "A job with this slug already exists" });
    }
    res.status(500).json({ message: "Failed to update job", error: err.message });
  }
};

/**
 * PATCH /api/jobs/:id/close
 * Admin — close a job listing
 */
export const closeJob = async (req, res) => {
  try {
   const job = await Job.findByIdAndUpdate(
  req.params.id,
  { status: "closed" },
  { returnDocument: "after" }
);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job closed", job });
  } catch (err) {
    res.status(500).json({ message: "Failed to close job", error: err.message });
  }
};

/**
 * PATCH /api/jobs/:id/feature
 * Admin — toggle featured status
 */
export const toggleFeatured = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.featured = !job.featured;
    await job.save();

    res.json({ message: `Job ${job.featured ? "featured" : "unfeatured"}`, job });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle featured", error: err.message });
  }
};

/**
 * DELETE /api/jobs/:id
 * Admin — permanently delete job
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted permanently" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job", error: err.message });
  }
};
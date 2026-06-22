import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Job from "../models/jobModel.js"; // adjust path/name to match your existing Job model
import JobApplication from "../models/JobApplication.js";

const router = express.Router();

/* ---------- Multer setup (in-memory, so we can attach buffer directly) ---------- */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, or DOCX files are allowed"));
    }
  },
});

/* ---------- POST /api/jobs/:jobIdOrSlug/apply ---------- */
router.post("/:jobIdOrSlug/apply", upload.single("cv"), async (req, res) => {
  try {
    const { jobIdOrSlug } = req.params;
    const { name, email, phone, coverLetter } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    /* Find the job by slug first, fallback to ID */
    let job = await Job.findOne({ slug: jobIdOrSlug });
    if (!job && mongoose.Types.ObjectId.isValid(jobIdOrSlug)) {
      job = await Job.findById(jobIdOrSlug);
    }

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    /* Destination: job's own application email if set, else default company inbox */
    const recipient = job.applicationEmail || process.env.EMAIL_USER;

    /* ---------- Save application record ---------- */
    const application = await JobApplication.create({
      job: job._id,
      jobTitle: job.title,
      name,
      email,
      phone,
      coverLetter,
      cvFileName: req.file?.originalname,
      sentTo: recipient,
    });

    /* ---------- Send email ---------- */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      replyTo: email,
      subject: `New Job Application: ${job.title}`,
      html: `
        <h2>New Job Application</h2>
        <p><b>Position:</b> ${job.title}</p>
        ${job.company ? `<p><b>Company:</b> ${job.company}</p>` : ""}
        ${job.location ? `<p><b>Location:</b> ${job.location}</p>` : ""}
        <hr/>
        <p><b>Applicant Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "—"}</p>
        <p><b>Cover Letter / Message:</b></p>
        <p>${(coverLetter || "—").replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="font-size:12px;color:#888;">Sent via Asliya Recruitment Jobs Portal</p>
      `,
      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              content: req.file.buffer,
              contentType: req.file.mimetype,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Application submitted successfully.",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Job application error:", error);

    if (error.message?.includes("Only PDF, DOC, or DOCX")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Max size is 5MB.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while submitting application.",
    });
  }
});

export default router;
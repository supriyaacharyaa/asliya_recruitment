// // import express from "express";
// // import { sendContactForm } from "../controller/enquiryController.js";

// // const router = express.Router();

// // router.post("/contact", sendContactForm);

// // export default router;

// import express from "express";
// import nodemailer from "nodemailer";

// const router = express.Router();

// router.post("/enquiry", async (req, res) => {
//   try {
//     const data = req.body;
//     const { type } = data;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // ---------- CONTACT EMAIL ----------
//     if (type === "contact") {
//       const mailOptions = {
//         from: data.email,
//         to: process.env.EMAIL_USER,
//         subject: `New Contact Message - ${data.fullName || "User"}`,
//         html: `
//           <h2>Contact Form Submission</h2>
//           <p><b>Name:</b> ${data.fullName}</p>
//           <p><b>Email:</b> ${data.email}</p>
//           <p><b>Phone:</b> ${data.phone}</p>
//           <p><b>Company:</b> ${data.company}</p>
//           <p><b>Message:</b> ${data.message}</p>
//         `,
//       };

//       await transporter.sendMail(mailOptions);

//       return res.json({ success: true, message: "Contact sent" });
//     }

//     // ---------- QUOTE EMAIL ----------
//     if (type === "quote") {
//       const mailOptions = {
//         from: data.email,
//         to: process.env.EMAIL_USER,
//         subject: `New Free Quote Request - ${data.companyName}`,
//         html: `
//           <h2>Quote Request</h2>
//           <p><b>Company:</b> ${data.companyName}</p>
//           <p><b>Contact Person:</b> ${data.contactName}</p>
//           <p><b>Email:</b> ${data.email}</p>
//           <p><b>Phone:</b> ${data.phone}</p>
//           <p><b>Country:</b> ${data.country}</p>
//           <p><b>Company Size:</b> ${data.companySize}</p>
//           <p><b>Services:</b> ${(data.services || []).join(", ")}</p>
//           <p><b>Preferred Contact:</b> ${data.preferredContact}</p>
//           <p><b>Message:</b> ${data.message}</p>
//         `,
//       };

//       await transporter.sendMail(mailOptions);

//       return res.json({ success: true, message: "Quote sent" });
//     }

//     return res.status(400).json({
//       success: false,
//       message: "Invalid enquiry type",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });





// export default router;

// import express from "express";
// import { sendContactForm } from "../controller/enquiryController.js";

// const router = express.Router();

// router.post("/contact", sendContactForm);

// export default router;

import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/enquiry", async (req, res) => {
  try {
    const data = req.body;
    const { type } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ---------- CONTACT EMAIL ----------
    if (type === "contact") {
      const mailOptions = {
        from: data.email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Message - ${data.fullName || "User"}`,
        html: `
          <h2>Contact Form Submission</h2>
          <p><b>Name:</b> ${data.fullName}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Company:</b> ${data.company}</p>
          <p><b>Workers Needed:</b> ${data.workers || "Not specified"}</p>
          <p><b>Message:</b> ${data.message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.json({ success: true, message: "Contact sent" });
    }

    // ---------- QUOTE EMAIL ----------
    if (type === "quote") {
      const mailOptions = {
        from: data.email,
        to: process.env.EMAIL_USER,
        subject: `New Free Quote Request - ${data.companyName}`,
        html: `
          <h2>Quote Request</h2>
          <p><b>Company:</b> ${data.companyName}</p>
          <p><b>Contact Person:</b> ${data.contactName}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Country:</b> ${data.country}</p>
          <p><b>Company Size:</b> ${data.companySize}</p>
          <p><b>Services:</b> ${(data.services || []).join(", ")}</p>
          <p><b>Preferred Contact:</b> ${data.preferredContact}</p>
          <p><b>Message:</b> ${data.message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.json({ success: true, message: "Quote sent" });
    }

    // ---------- NEWSLETTER SUBSCRIPTION ----------
    if (type === "newsletter") {
      if (!data.email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      // Notify the company that someone subscribed
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: data.email,
        subject: `New Newsletter Subscriber`,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Subscribed At:</b> ${new Date().toLocaleString()}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Optional: send a confirmation email back to the subscriber
      const confirmationMail = {
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: `You're subscribed!`,
        html: `
          <h2>Thanks for subscribing</h2>
          <p>You'll now receive recruitment insights, job alerts, and industry news straight to your inbox.</p>
        `,
      };

      await transporter.sendMail(confirmationMail);

      return res.json({ success: true, message: "Newsletter subscription sent" });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid enquiry type",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
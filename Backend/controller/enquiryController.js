import Enquiry from "../models/EnquiryModel.js";

export const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, message, source } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const enquiry = await Enquiry.create({ name, phone, email, message, source });
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Enquiry.countDocuments(filter);
    res.json({ data: enquiries, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: "Not found" });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
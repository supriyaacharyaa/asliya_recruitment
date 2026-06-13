// import Blog from "../models/Blogmodel.js";
// import cloudinary from "../config/condinary.js";

// const uploadToCloudinary = (buffer, folder = "blogs") =>
//   new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder },
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result.secure_url);
//       },
//     );
//     stream.end(buffer);
//   });

// const deleteFromCloudinary = async (imageUrl) => {
//   if (!imageUrl) return;
//   try {
//     const url = new URL(imageUrl);

//     const parts = url.pathname.split("/");
//     const uploadIdx = parts.indexOf("upload");
//     if (uploadIdx === -1) return;

//     let afterUpload = parts.slice(uploadIdx + 1);

//     if (/^v\d+$/.test(afterUpload[0])) afterUpload = afterUpload.slice(1);

//     afterUpload = afterUpload.filter((seg) => !/^[a-z_]+_/.test(seg));

//     const publicId = afterUpload.join("/").replace(/\.[^/.]+$/, "");
//     await cloudinary.uploader.destroy(publicId);
//   } catch (err) {
//     console.error("Cloudinary delete error:", err.message);
//   }
// };

// export const createBlog = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     if (typeof data.sections === "string")
//       data.sections = JSON.parse(data.sections);
//     if (typeof data.faqs === "string") data.faqs = JSON.parse(data.faqs);
//     if (typeof data.tags === "string") data.tags = JSON.parse(data.tags);

//     if (req.file) {
//       data.heroImage = await uploadToCloudinary(req.file.buffer);
//     }

//     if (data.status === "published" && !data.publishedAt) {
//       data.publishedAt = new Date();
//     }

//     const blog = await Blog.create(data);
//     res
//       .status(201)
//       .json({ success: true, message: "Blog created successfully", blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllBlogs = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search, category } = req.query;

//     const query = { status: "published" };
//     if (category) query.category = category;
//     if (search) query.$text = { $search: search };

//     const [blogs, count] = await Promise.all([
//       Blog.find(query)
//         .sort({ publishedAt: -1 })
//         .limit(Number(limit))
//         .skip((Number(page) - 1) * Number(limit))
//         .select("-content -sections")
//         .exec(),
//       Blog.countDocuments(query),
//     ]);

//     res.status(200).json({
//       success: true,
//       count,
//       totalPages: Math.ceil(count / Number(limit)),
//       currentPage: Number(page),
//       blogs,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllBlogsAdmin = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search, category, status } = req.query;

//     const query = {};
//     if (status) query.status = status;
//     if (category) query.category = category;
//     if (search) query.$text = { $search: search };

//     const statsQuery = {};
//     if (category) statsQuery.category = category;
//     if (search) statsQuery.$text = { $search: search };

//     const [blogs, count, publishedCount, draftCount] = await Promise.all([
//       Blog.find(query)
//         .sort({ createdAt: -1 })
//         .limit(Number(limit))
//         .skip((Number(page) - 1) * Number(limit))
//         .select("-content -sections")
//         .exec(),
//       Blog.countDocuments(query),
//       Blog.countDocuments({ ...statsQuery, status: "published" }),
//       Blog.countDocuments({ ...statsQuery, status: "draft" }),
//     ]);

//     res.status(200).json({
//       success: true,
//       count,
//       totalPages: Math.ceil(count / Number(limit)),
//       currentPage: Number(page),
//       publishedCount,
//       draftCount,
//       blogs,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getBlogBySlug = async (req, res) => {
//   try {
//     const blog = await Blog.findOne({
//       slug: req.params.slug,
//       status: "published",
//     });
//     if (!blog)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateBlog = async (req, res) => {
//   try {
//     const existing = await Blog.findById(req.params.id);
//     if (!existing)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });

//     const data = { ...req.body };

//     if (typeof data.sections === "string")
//       data.sections = JSON.parse(data.sections);
//     if (typeof data.faqs === "string") data.faqs = JSON.parse(data.faqs);
//     if (typeof data.tags === "string") data.tags = JSON.parse(data.tags);

//     if (data.status === "published" && !existing.publishedAt) {
//       data.publishedAt = new Date();
//     }

//     if (data.removeHeroImage === "true") {
//       await deleteFromCloudinary(existing.heroImage);

//       delete data.removeHeroImage;
//       delete data.heroImage;
//       await Blog.findByIdAndUpdate(req.params.id, {
//         $unset: { heroImage: "" },
//       });
//     } else if (req.file) {
//       await deleteFromCloudinary(existing.heroImage);
//       data.heroImage = await uploadToCloudinary(req.file.buffer);
//     } else {
//       delete data.heroImage;
//     }

//     const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//       runValidators: true,
//     });

//     res
//       .status(200)
//       .json({ success: true, message: "Blog updated successfully", blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { status: "archived" },
//       { new: true },
//     );
//     if (!blog)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     res
//       .status(200)
//       .json({ success: true, message: "Blog archived successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const hardDeleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
//     if (!blog)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     await deleteFromCloudinary(blog.heroImage);
//     res
//       .status(200)
//       .json({ success: true, message: "Blog permanently deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import Blog from "../models/Blogmodel.js";
import cloudinary from "../config/condinary.js";

// ── Cloudinary helpers ─────────────────────────────────────────

const uploadToCloudinary = (buffer, folder = "blogs") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;
  try {
    const url      = new URL(imageUrl);
    const parts    = url.pathname.split("/");
    const uploadIdx = parts.indexOf("upload");
    if (uploadIdx === -1) return;

    let afterUpload = parts.slice(uploadIdx + 1);

    // Strip version segment (e.g. "v1234567890")
    if (/^v\d+$/.test(afterUpload[0])) afterUpload = afterUpload.slice(1);

    // Strip transformation segments (e.g. "w_500,h_300")
    afterUpload = afterUpload.filter((seg) => !/^[a-z_]+_/.test(seg));

    const publicId = afterUpload.join("/").replace(/\.[^/.]+$/, "");
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};

// ── Parse stringified JSON fields sent via FormData ────────────

const parseFormDataFields = (data) => {
  if (typeof data.sections === "string") data.sections = JSON.parse(data.sections);
  if (typeof data.faqs     === "string") data.faqs     = JSON.parse(data.faqs);
  if (typeof data.tags     === "string") data.tags     = JSON.parse(data.tags);
  return data;
};

// ── Controllers ────────────────────────────────────────────────

/**
 * POST /api/blog
 * Create a new blog post.
 */
export const createBlog = async (req, res) => {
  try {
    const data = parseFormDataFields({ ...req.body });

    if (req.file) {
      data.heroImage = await uploadToCloudinary(req.file.buffer);
    }

    if (data.status === "published" && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    const blog = await Blog.create(data);

    res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/blog
 * Public listing — returns only published posts.
 * Query: page, limit, search, category
 */
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;

    const query = { status: "published" };
    if (category) query.category = category;
    if (search)   query.$text    = { $search: search };

    const [blogs, count] = await Promise.all([
      Blog.find(query)
        .sort({ publishedAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .select("-content -sections")
        .exec(),
      Blog.countDocuments(query),
    ]);

    res.status(200).json({
      success:     true,
      count,
      totalPages:  Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/blog/admin/all
 * Admin listing — returns all statuses with per-status counts.
 * Query: page, limit, search, category, status
 */
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, status } = req.query;

    const query = {};
    if (status)   query.status   = status;
    if (category) query.category = category;
    if (search)   query.$text    = { $search: search };

    // Stats are scoped to category/search but NOT to the current status filter
    const statsQuery = {};
    if (category) statsQuery.category = category;
    if (search)   statsQuery.$text    = { $search: search };

    const [blogs, count, publishedCount, draftCount] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .select("-content -sections")
        .exec(),
      Blog.countDocuments(query),
      Blog.countDocuments({ ...statsQuery, status: "published" }),
      Blog.countDocuments({ ...statsQuery, status: "draft" }),
    ]);

    res.status(200).json({
      success:        true,
      count,
      totalPages:     Math.ceil(count / Number(limit)),
      currentPage:    Number(page),
      publishedCount,
      draftCount,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/blog/slug/:slug
 * Public — fetch a single published post by slug.
 */
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: "published" });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/blog/:id
 * Admin — fetch any post by MongoDB ID regardless of status.
 */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUT /api/blog/:id
 * Update an existing post. Handles hero image upload/removal.
 */
export const updateBlog = async (req, res) => {
  try {
    const existing = await Blog.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const data = parseFormDataFields({ ...req.body });

    // Set publishedAt the first time a post goes live
    if (data.status === "published" && !existing.publishedAt) {
      data.publishedAt = new Date();
    }

    if (data.removeHeroImage === "true") {
      // Client explicitly removed the image
      await deleteFromCloudinary(existing.heroImage);
      delete data.removeHeroImage;
      delete data.heroImage;
      await Blog.findByIdAndUpdate(req.params.id, { $unset: { heroImage: "" } });
    } else if (req.file) {
      // New image uploaded — replace the old one
      await deleteFromCloudinary(existing.heroImage);
      data.heroImage = await uploadToCloudinary(req.file.buffer);
    } else {
      // No image change — prevent accidental overwrite with empty string
      delete data.heroImage;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new:          true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PATCH /api/blog/:id/archive
 * Soft-delete — sets status to "archived".
 */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "archived" },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog archived successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /api/blog/:id
 * Hard-delete — permanently removes the document and its Cloudinary image.
 */
export const hardDeleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    await deleteFromCloudinary(blog.heroImage);

    res.status(200).json({ success: true, message: "Blog permanently deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
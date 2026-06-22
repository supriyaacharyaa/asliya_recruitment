// import Blog from "../models/Blogmodel.js";
// import cloudinary from "../config/cloudinary.js";

// // ── Cloudinary helpers ─────────────────────────────────────────

// const uploadToCloudinary = (buffer, folder = "blogs") =>
//   new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder },
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result.secure_url);
//       }
//     );
//     stream.end(buffer);
//   });

// /**
//  * Extracts the public_id from a Cloudinary secure_url and destroys it.
//  * Handles URLs with or without version segments (v1234567890/).
//  * Example URL:
//  *   https://res.cloudinary.com/<cloud>/image/upload/v1700000000/blogs/my-image.jpg
//  *   → public_id: blogs/my-image
//  */
// const deleteFromCloudinary = async (imageUrl) => {
//   if (!imageUrl) return;
//   try {
//     const url = new URL(imageUrl);
//     // pathname: /demo/image/upload/v1700000000/blogs/my-image.jpg
//     const parts = url.pathname.split("/");
//     const uploadIdx = parts.indexOf("upload");
//     if (uploadIdx === -1) return;

//     let afterUpload = parts.slice(uploadIdx + 1);

//     // Drop version segment if present (starts with "v" followed by digits)
//     if (/^v\d+$/.test(afterUpload[0])) afterUpload = afterUpload.slice(1);

//     // Drop transformation segments (e.g. "w_800,c_fill") — they contain commas or underscores with letters
//     afterUpload = afterUpload.filter(seg => !/^[a-z_]+_/.test(seg));

//     const publicId = afterUpload.join("/").replace(/\.[^/.]+$/, ""); // strip extension
//     await cloudinary.uploader.destroy(publicId);
//   } catch (err) {
//     console.error("Cloudinary delete error:", err.message);
//   }
// };

// // ── Controllers ────────────────────────────────────────────────

// export const createBlog = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     if (typeof data.sections === "string") data.sections = JSON.parse(data.sections);
//     if (typeof data.faqs === "string")     data.faqs     = JSON.parse(data.faqs);
//     if (typeof data.tags === "string")     data.tags     = JSON.parse(data.tags);

//     if (req.file) {
//       data.heroImage = await uploadToCloudinary(req.file.buffer);
//     }

//     // publishedAt is also set by the pre-save hook, but set here too so the
//     // returned document has it immediately without a second round-trip.
//     if (data.status === "published" && !data.publishedAt) {
//       data.publishedAt = new Date();
//     }

//     const blog = await Blog.create(data);
//     res.status(201).json({ success: true, message: "Blog created successfully", blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllBlogs = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search, category } = req.query;

//     const query = { status: "published" };
//     if (category) query.category = category;
//     if (search)   query.$text = { $search: search };

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

//     // Paginated list query — respects all filters including status
//     const query = {};
//     if (status)   query.status   = status;
//     if (category) query.category = category;
//     if (search)   query.$text    = { $search: search };

//     // Stats query — same filters EXCEPT status, so stat cards always show
//     // global published/draft totals regardless of which tab is active.
//     const statsQuery = {};
//     if (category) statsQuery.category = category;
//     if (search)   statsQuery.$text    = { $search: search };

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
//     const blog = await Blog.findOne({ slug: req.params.slug, status: "published" });
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateBlog = async (req, res) => {
//   try {
//     const existing = await Blog.findById(req.params.id);
//     if (!existing) return res.status(404).json({ success: false, message: "Blog not found" });

//     const data = { ...req.body };

//     if (typeof data.sections === "string") data.sections = JSON.parse(data.sections);
//     if (typeof data.faqs === "string")     data.faqs     = JSON.parse(data.faqs);
//     if (typeof data.tags === "string")     data.tags     = JSON.parse(data.tags);

//     // Only stamp publishedAt the very first time the post goes live
//     if (data.status === "published" && !existing.publishedAt) {
//       data.publishedAt = new Date();
//     }

//     // Hero image handling — three cases:
//     //   1. Client wants the image removed entirely
//     //   2. Client is uploading a new image (replaces the old one)
//     //   3. No change — leave heroImage field untouched
//     if (data.removeHeroImage === "true") {
//       await deleteFromCloudinary(existing.heroImage);
//       // Use $unset to actually clear the field in MongoDB, not just set it to ""
//       delete data.removeHeroImage;
//       delete data.heroImage; // don't let a stale value from req.body win
//       await Blog.findByIdAndUpdate(req.params.id, { $unset: { heroImage: "" } });
//     } else if (req.file) {
//       await deleteFromCloudinary(existing.heroImage);
//       data.heroImage = await uploadToCloudinary(req.file.buffer);
//     } else {
//       // Prevent an accidental blank heroImage from req.body overwriting the real URL
//       delete data.heroImage;
//     }

//     const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({ success: true, message: "Blog updated successfully", blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Soft-delete: sets status → "archived". Cloudinary image is kept.
// export const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { status: "archived" },
//       { new: true }
//     );
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, message: "Blog archived successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// export const hardDeleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     await deleteFromCloudinary(blog.heroImage);
//     res.status(200).json({ success: true, message: "Blog permanently deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import Blog from "../models/Blogmodel.js";
import cloudinary from "../config/cloudinary.js";

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

/**
 * Extracts the public_id from a Cloudinary secure_url and destroys it.
 * Handles URLs with or without version segments (v1234567890/).
 * Example URL:
 *   https://res.cloudinary.com/<cloud>/image/upload/v1700000000/blogs/my-image.jpg
 *   → public_id: blogs/my-image
 */
const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;
  try {
    const url = new URL(imageUrl);
    // pathname: /demo/image/upload/v1700000000/blogs/my-image.jpg
    const parts = url.pathname.split("/");
    const uploadIdx = parts.indexOf("upload");
    if (uploadIdx === -1) return;

    let afterUpload = parts.slice(uploadIdx + 1);

    // Drop version segment if present (starts with "v" followed by digits)
    if (/^v\d+$/.test(afterUpload[0])) afterUpload = afterUpload.slice(1);

    // Drop transformation segments (e.g. "w_800,c_fill") — they contain commas or underscores with letters
    afterUpload = afterUpload.filter(seg => !/^[a-z_]+_/.test(seg));

    const publicId = afterUpload.join("/").replace(/\.[^/.]+$/, ""); // strip extension
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};

// Escapes regex special characters in user-supplied search input so things
// like "C++" or "node.js" don't throw or behave unexpectedly as a regex.
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Builds a case-insensitive "search across multiple fields" filter.
// Used instead of $text so no text index needs to exist on the collection.
const buildSearchFilter = (search) => {
  const regex = new RegExp(escapeRegex(search), "i");
  return {
    $or: [
      { title: regex },
      { slug: regex },
      { excerpt: regex },
      { category: regex },
      { tags: regex },
    ],
  };
};

// ── Controllers ────────────────────────────────────────────────

export const createBlog = async (req, res) => {
  try {
    const data = { ...req.body };

    if (typeof data.sections === "string") data.sections = JSON.parse(data.sections);
    if (typeof data.faqs === "string")     data.faqs     = JSON.parse(data.faqs);
    if (typeof data.tags === "string")     data.tags     = JSON.parse(data.tags);

    if (req.file) {
      data.heroImage = await uploadToCloudinary(req.file.buffer);
    }

    // publishedAt is also set by the pre-save hook, but set here too so the
    // returned document has it immediately without a second round-trip.
    if (data.status === "published" && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    const blog = await Blog.create(data);
    res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;

    const query = { status: "published" };
    if (category) query.category = category;
    if (search)   query.$text = { $search: search };

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
      success: true,
      count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, status } = req.query;

    // Paginated list query — respects all filters including status
    const query = {};
    if (status)   query.status   = status;
    if (category) query.category = category;
    if (search)   Object.assign(query, buildSearchFilter(search));

    // Stats query — same filters EXCEPT status, so stat cards always show
    // global published/draft totals regardless of which tab is active.
    const statsQuery = {};
    if (category) statsQuery.category = category;
    if (search)   Object.assign(statsQuery, buildSearchFilter(search));

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
      success: true,
      count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      publishedCount,
      draftCount,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: "published" });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const existing = await Blog.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Blog not found" });

    const data = { ...req.body };

    if (typeof data.sections === "string") data.sections = JSON.parse(data.sections);
    if (typeof data.faqs === "string")     data.faqs     = JSON.parse(data.faqs);
    if (typeof data.tags === "string")     data.tags     = JSON.parse(data.tags);

    // Only stamp publishedAt the very first time the post goes live
    if (data.status === "published" && !existing.publishedAt) {
      data.publishedAt = new Date();
    }

    // Hero image handling — three cases:
    //   1. Client wants the image removed entirely
    //   2. Client is uploading a new image (replaces the old one)
    //   3. No change — leave heroImage field untouched
    if (data.removeHeroImage === "true") {
      await deleteFromCloudinary(existing.heroImage);
      // Use $unset to actually clear the field in MongoDB, not just set it to ""
      delete data.removeHeroImage;
      delete data.heroImage; // don't let a stale value from req.body win
      await Blog.findByIdAndUpdate(req.params.id, { $unset: { heroImage: "" } });
    } else if (req.file) {
      await deleteFromCloudinary(existing.heroImage);
      data.heroImage = await uploadToCloudinary(req.file.buffer);
    } else {
      // Prevent an accidental blank heroImage from req.body overwriting the real URL
      delete data.heroImage;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft-delete: sets status → "archived". Cloudinary image is kept.
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "archived" },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, message: "Blog archived successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const hardDeleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    await deleteFromCloudinary(blog.heroImage);
    res.status(200).json({ success: true, message: "Blog permanently deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
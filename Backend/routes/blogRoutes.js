// import express from "express";
// import { upload } from "../Middlerware/multer.js";
// import {
//   createBlog,
//   getAllBlogs,
//   getAllBlogsAdmin,
//   getBlogBySlug,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
//   hardDeleteBlog,
// } from "../controller/BlogController.js";

// const router = express.Router();

// router.get("/", getAllBlogs);
// router.get("/slug/:slug", getBlogBySlug);
// router.get("/admin/all", getAllBlogsAdmin);
// router.get("/:id", getBlogById);
// router.post("/", upload.single("heroImage"), createBlog);
// router.put("/:id", upload.single("heroImage"), updateBlog);
// router.patch("/:id/archive", deleteBlog);
// router.delete("/:id", hardDeleteBlog);

// export default router;
import express from "express";
import { upload } from "../Middlerware/multer.js";
import {
  createBlog,
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
  hardDeleteBlog,
} from "../controller/BlogController.js";

const router = express.Router();


router.get("/", getAllBlogs);


router.get("/admin/all", getAllBlogsAdmin);

router.get("/slug/:slug", getBlogBySlug);


router.get("/:id", getBlogById);


router.post("/", upload.single("heroImage"), createBlog);
router.put("/:id", upload.single("heroImage"), updateBlog);
router.patch("/:id/archive", deleteBlog);  
router.delete("/:id", hardDeleteBlog);      

export default router;
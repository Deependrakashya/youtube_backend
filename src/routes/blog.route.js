import { Router } from "express";
import { deleteBlog, getAllBlogs, uploadBlog } from "../controllers/blog.contorller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/upload-blog", upload.none()).post(uploadBlog);
router.route("/get-blogs", upload.none()).get(getAllBlogs);
router.route("/delete-blog", upload.none()).post(deleteBlog);
export default router;
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    LikeBlog
} from "../controllers/blogController.js";

const router = express.Router();

/* Public Routes */

router.get("/", getBlogs);

router.get("/:id", getBlogById);


/* Protected Routes */

router.post("/", authMiddleware, createBlog);

router.put("/:id", authMiddleware, updateBlog);

router.delete("/:id", authMiddleware, deleteBlog);

router.post("/:id/like", authMiddleware, LikeBlog)

export default router;
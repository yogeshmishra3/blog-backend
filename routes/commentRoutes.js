import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    addComment,
    getComments
} from "../controllers/commentController.js";

const router = express.Router();

/* Get comments for blog */

router.get("/:blogId", getComments);

/* Add comment (Protected) */

router.post("/", authMiddleware, addComment);

export default router;
import express from "express";
import { getAllPosts, getAllUsers, deletePost } from "../controllers/admin";
import { verifyAdmin } from "../middleware/auth";
const router = express.Router();

router.get("/:id/post", verifyAdmin, getAllPosts);
router.get("/:id/user", verifyAdmin, getAllUsers);
router.delete("/:id/post/:pid", verifyAdmin, deletePost);

export default router;

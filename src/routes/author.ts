import express from "express";
import {
  addPost,
  getAuthorPosts,
  editPost,
  deletePost,
} from "../controllers/author";
import { verifyAuthor } from "../middleware/auth";
const router = express.Router();

router.get("/:id", verifyAuthor, getAuthorPosts);
router.post("/:id/post", verifyAuthor, addPost);
router.post("/:id/edit/:pid", verifyAuthor, editPost);
router.delete("/:id/post/:pid", verifyAuthor, deletePost);

export default router;

import express, { Express, Request, Response, Application } from "express";
import { AddPost, Post, EditPost, DeletePost } from "../controllers/admin";
import { verified } from "../middleware/user";
import { Profile } from "../controllers/auth";
import { verifyProfile } from "../middleware/profile";
const router = express.Router();

router.post("/profile", verified, Profile);
router.get("/:id", verified, verifyProfile, Post);
router.post("/:id/post", verifyProfile, verified, AddPost);
router.post("/:id/edit/:pid", verifyProfile, verified, EditPost);
router.delete("/:id/post/:pid", verifyProfile, verified, DeletePost);

export default router;

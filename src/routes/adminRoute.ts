import express, { Express, Request, Response, Application } from "express";
import { AddPost, Post, EditPost } from "../controllers/admin";
const router = express.Router();

router.post("/:id/post", AddPost);
router.get("/:id", Post);
router.post("/:id/edit/:pid", EditPost);

export default router;

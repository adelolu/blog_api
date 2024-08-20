import express from "express";
import {
  createAdmin,
  createUser,
  loginAdmin,
  loginUser,
  tokenVerification,
} from "../controllers/auth";
import { allposts, likes } from "../controllers/user";
import { verifyUser } from "../middleware/auth";
import { addcomment, getcomment } from "../controllers/user";

const router = express.Router();

router.get("/", allposts);
router.post("/signup", createUser);
router.post("/adminsignup", createAdmin);
router.post("/login", loginUser);
router.post("/adminlogin", loginAdmin);
router.get("/verifyuser", tokenVerification);
router.post("/:id/comment/:pid", verifyUser, addcomment);
router.get("/:id/comment/:pid", verifyUser, getcomment);
router.get("/:id/like/:pid", verifyUser, likes);

export default router;

import express, { Express, Request, Response, Application } from "express";
import { Signup, Login, VerifyUser, Logout } from "../controllers/auth";
import { Posts } from "../controllers/blog";
const router = express.Router();

router.get("/", Posts);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/verifyuser", VerifyUser);

export default router;

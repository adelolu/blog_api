import { Router } from "express";
import {
  createAdmin,
  createUser,
  forgotPassword,
  loginUser,
  resetPassword,
  tokenVerification,
} from "../controllers/auth";
import { verifyAccess } from "../middleware/auth";
import { UserRoles } from "../models/user";

const router = Router();

router.post("/signup", createUser);
router.post("/adminsignup", verifyAccess([UserRoles.admin]), createAdmin);
router.post("/login", loginUser);
router.post("/adminlogin", loginUser);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.get("/verifyuser", tokenVerification);
// export default router;

export default (app: Router) => app.use("/", router);

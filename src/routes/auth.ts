import { Router } from "express";
import {
  createAdmin,
  createUser,
  loginAdmin,
  loginUser,
  tokenVerification,
} from "../controllers/auth";
import { verifyAccess } from "../middleware/auth";
import { UserRoles } from "../models/user";

const router = Router();

router.post("/signup", createUser);
router.post("/adminsignup", verifyAccess([UserRoles.admin]), createAdmin);
router.post("/login", loginUser);
router.post("/adminlogin", loginAdmin);
router.get("/verifyuser", tokenVerification);
// export default router;

export default (app: Router) => app.use("/", router);

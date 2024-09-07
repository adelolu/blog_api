import { Router } from "express";
import { verifyAccess } from "../middleware/auth";
import { uploadCloudinary } from "../controllers/upload";
import { UserRoles } from "../models/user";
import upload from "../middleware/multer";

const router = Router();
router.post(
  "/profile-image",
  verifyAccess([UserRoles.user]),
  upload.single("file"),
  uploadCloudinary
);

export default (app: Router) => app.use("/upload", router);

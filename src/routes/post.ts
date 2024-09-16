import { Router } from "express";
import { emailVerified, verifyAccess } from "../middleware/auth";
import {
  addPost,
  getAuthorPosts,
  editPost,
  deletePost,
  getAllPosts,
  getOnePost,
} from "../controllers/post";
import { UserRoles } from "../models/user";

const router = Router();

router.get("/", getAllPosts);
router.get("/:postId", getOnePost);
router.get("/author/:_id", getAuthorPosts);
router.post("/", emailVerified, addPost);
router.post("/edit/:postId", verifyAccess([UserRoles.user]), editPost);
router.delete(
  "/:postId",
  verifyAccess([UserRoles.user, UserRoles.admin]),
  deletePost
);
// export default router;

export default (app: Router) => app.use("/post", router);

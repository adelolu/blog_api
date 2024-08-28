import { Router } from "express";
import { verifyAccess } from "../middleware/auth";
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
router.post("/", verifyAccess([UserRoles.author]), addPost);
router.post("/edit/:postId", verifyAccess([UserRoles.author]), editPost);
router.delete(
  "/:postId",
  verifyAccess([UserRoles.author, UserRoles.admin]),
  deletePost
);
// export default router;

export default (app: Router) => app.use("/post", router);

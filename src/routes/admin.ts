import { Router } from "express";
import { getAllPosts, deletePost } from "../controllers/post";
import { getAllUsers } from "../controllers/user";
import { verifyAccess } from "../middleware/auth";
import { UserRoles } from "../models/user";
const router = Router();

// router.get("/post", verifyAccess([UserRoles.admin]), getAllPosts);
// router.delete("/post/:postId", verifyAccess([UserRoles.admin]), deletePost);

// export default router;
// export default (app: Router) => app.use("/admin", router);

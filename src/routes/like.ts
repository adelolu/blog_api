import { Router } from "express";
import { likes } from "../controllers/post";
import { emailVerified, verifyAccess } from "../middleware/auth";
import { UserRoles } from "../models/user";

const router = Router();
// is logged in
router.get("/:postId", emailVerified, likes);

export default (app: Router) => app.use("/like", router);
// export default router;

import { Router } from "express";
import { getAllUsers, getOneUser } from "../controllers/user";
import { verifyAccess } from "../middleware/auth";
import { UserRoles } from "../models/user";
const router = Router();

router.get("/", getAllUsers);
router.get("/:_id", getOneUser);

// export default router;
export default (app: Router) => app.use("/user", router);

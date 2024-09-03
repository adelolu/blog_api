"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.post("/signup", auth_1.createUser);
router.post("/adminsignup", (0, auth_2.verifyAccess)([user_1.UserRoles.admin]), auth_1.createAdmin);
router.post("/login", auth_1.loginUser);
router.post("/adminlogin", auth_1.loginAdmin);
router.get("/verifyuser", auth_1.tokenVerification);
// export default router;
exports.default = (app) => app.use("/", router);
//# sourceMappingURL=auth.js.map
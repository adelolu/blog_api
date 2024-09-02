"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../controllers/post");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// is logged in
router.get("/:postId", auth_1.isLoggedin, post_1.likes);
exports.default = (app) => app.use("/like", router);
// export default router;
//# sourceMappingURL=like.js.map
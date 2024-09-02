"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_1 = require("../controllers/comment");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/:postId", auth_1.isLoggedin, comment_1.addComment);
router.get("/:postId", comment_1.getComments);
exports.default = (app) => app.use("/comment", router);
// export default router;
//# sourceMappingURL=comment.js.map
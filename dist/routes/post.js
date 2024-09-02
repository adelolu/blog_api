"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const post_1 = require("../controllers/post");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.get("/", post_1.getAllPosts);
router.get("/:postId", post_1.getOnePost);
router.get("/author/:_id", post_1.getAuthorPosts);
router.post("/", (0, auth_1.verifyAccess)([user_1.UserRoles.author]), post_1.addPost);
router.post("/edit/:postId", (0, auth_1.verifyAccess)([user_1.UserRoles.author]), post_1.editPost);
router.delete("/:postId", (0, auth_1.verifyAccess)([user_1.UserRoles.author, user_1.UserRoles.admin]), post_1.deletePost);
// export default router;
exports.default = (app) => app.use("/post", router);
//# sourceMappingURL=post.js.map
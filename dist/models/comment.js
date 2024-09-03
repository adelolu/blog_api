"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const post_1 = __importDefault(require("./post"));
const user_1 = __importDefault(require("./user"));
const commentSchema = new mongoose_1.Schema({
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: post_1.default },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: user_1.default },
    content: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("comment", commentSchema);
//# sourceMappingURL=comment.js.map
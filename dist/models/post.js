"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("./user"));
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    hashtags: [String],
    likes: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: user_1.default },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("post", postSchema);
//# sourceMappingURL=post.js.map
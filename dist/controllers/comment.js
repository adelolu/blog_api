"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.addComment = void 0;
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        let comment = {
            postId,
            userId: req.user._id,
            content,
        };
        let posts = yield post_1.default.findOne({ _id: postId });
        if (!posts) {
            return res.status(400).json({ message: "post not found", status: false });
        }
        let newcomment = new comment_1.default(comment);
        yield newcomment.save();
        return res
            .status(200)
            .json({ data: "comment added successfully", status: true });
    }
    catch (error) {
        return res.status(500).json({ message: error, status: false });
    }
});
exports.addComment = addComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        let post = yield post_1.default.findOne({ _id: postId });
        if (!post) {
            return res.status(400).json({ message: "post not found", status: false });
        }
        console.log(post);
        let comments = yield comment_1.default.find({ postId }).populate("userId");
        console.log(comments);
        return res.status(200).json({ data: comments, status: true });
    }
    catch (error) {
        return res.status(500).json({ message: error, status: false });
    }
});
exports.getComments = getComments;
//# sourceMappingURL=comment.js.map
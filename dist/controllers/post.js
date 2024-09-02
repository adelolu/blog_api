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
exports.likes = exports.getOnePost = exports.getAllPosts = exports.deletePost = exports.editPost = exports.getAuthorPosts = exports.addPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
const user_1 = require("../models/user");
//function to add post
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.user;
        let { title, content, hashtags } = req.body;
        // const author = req.user;
        // if (author.id !== id) {
        //   return res.status(401).json({ message: "unauthorized", status: false });
        // }
        if (!title) {
            return res
                .status(400)
                .json({ message: "title cannot be empty", status: false });
        }
        else if (!content) {
            return res
                .status(400)
                .json({ message: "content cannot be empty", status: false });
        }
        else if (!hashtags) {
            return res
                .status(400)
                .json({ message: "hashtags cannot be empty", status: false });
        }
        let hashT = hashtags.split(",");
        let newpost = yield post_1.default.create({
            title,
            content,
            hashtags: hashT,
            authorId: id,
        });
        if (!newpost) {
            return res
                .status(400)
                .json({ message: "post not created", status: false });
        }
        res
            .status(201)
            .json({ message: "post created successfully", status: true });
    }
    catch (error) {
        return res.status(500).json({ message: error, status: false });
    }
});
exports.addPost = addPost;
//function to display posts of an author
const getAuthorPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { _id } = req.params;
        //populate
        let myposts = yield post_1.default.find({ authorId: _id });
        res.status(200).json({ data: myposts, status: true });
    }
    catch (error) {
        return res.status(500).json({ message: error, status: false });
    }
});
exports.getAuthorPosts = getAuthorPosts;
//function to edit post
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, content, hashtags } = req.body;
        let { postId } = req.params;
        let user = req.user;
        if (!title) {
            return res
                .status(400)
                .json({ message: "title cannot be empty", status: false });
        }
        else if (!content) {
            return res
                .status(400)
                .json({ message: "content cannot be empty", status: false });
        }
        else if (!hashtags) {
            return res
                .status(400)
                .json({ message: "hashtags cannot be empty", status: false });
        }
        let hashT = hashtags.split(",");
        let editedpost = { title, content, hashtags: hashT };
        let editpost = yield post_1.default.findOneAndUpdate({ _id: postId }, editedpost);
        if (!editpost) {
            return res
                .status(400)
                .json({ message: "post not edited", status: false });
        }
        console.log(editpost.authorId);
        console.log(user.id);
        if (user.id !== editpost.authorId.toString()) {
            return res
                .status(403)
                .json({ message: "Action forbidden", status: false });
        }
        res.status(200).json({ message: "post edited successfully", status: true });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.editPost = editPost;
//function to delete post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { postId } = req.params;
        let user = req.user;
        let del = yield post_1.default.findOne({ _id: postId });
        if (!del) {
            return res
                .status(400)
                .json({ message: "post do not exist", status: false });
        }
        console.log(user);
        console.log(user.role !== user_1.UserRoles.admin);
        console.log(user.id !== del.authorId.toString());
        if (user.id !== del.authorId.toString()) {
            if (user.role !== user_1.UserRoles.admin) {
                return res
                    .status(403)
                    .json({ message: "Action forbidden", status: false });
            }
        }
        yield post_1.default.deleteOne({ _id: postId });
        yield comment_1.default.deleteMany({ postId });
        res
            .status(200)
            .json({ message: "post deleted successfully", status: true });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.deletePost = deletePost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allpost = yield post_1.default.find().populate("authorId");
        return res.status(200).json({ data: allpost, status: true });
    }
    catch (error) {
        return res.status(500).json({ message: error, status: false });
    }
});
exports.getAllPosts = getAllPosts;
const getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield post_1.default.findOne({ _id: postId }).populate("authorId");
        if (!post) {
            return res.status(400).json({ message: "post not found", status: false });
        }
        res.status(200).json({ data: post, status: true });
    }
    catch (error) {
        return res.status(500).json({ message: error, status: false });
    }
});
exports.getOnePost = getOnePost;
const likes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield post_1.default.findOne({ _id: postId });
        if (!post) {
            return res.status(400).json({ message: "post not found", status: false });
        }
        let like = post.likes;
        let liked = like.includes(req.user.id);
        console.log(liked);
        if (!liked) {
            like.push(req.user.id);
        }
        else {
            let index = like.indexOf(req.user.id);
            console.log(index);
            like.splice(index, 1);
        }
        post.save();
        res.status(200).json({ message: post.likes, status: false });
    }
    catch (error) {
        return res.status(500).json({ message: error, status: false });
    }
});
exports.likes = likes;
//# sourceMappingURL=post.js.map
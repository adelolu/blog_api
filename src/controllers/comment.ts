import { Request, Response } from "express";
import Post from "../models/post";
import Comment from "../models/comment";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    let comment = {
      postId,
      userId: req.user._id,
      content,
    };
    let posts = await Post.findOne({ _id: postId });
    if (!posts) {
      return res.status(400).json({ message: "post not found", status: false });
    }

    let newcomment = new Comment(comment);

    await newcomment.save();
    return res
      .status(200)
      .json({ data: "comment added successfully", status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    let post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(400).json({ message: "post not found", status: false });
    }
    console.log(post);

    let comments = await Comment.find({ postId }).populate("userId");
    console.log(comments);

    return res.status(200).json({ data: comments, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
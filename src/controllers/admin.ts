import { Request, Response } from "express";
import post from "../models/post";
import user from "../models/user";
import comment from "../models/comment";

//function to display posts of an author
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let posts = await post.find();

    res.status(200).json({ data: posts, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
//function to display all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let users = await user.find();

    res.status(200).json({ data: users, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
//function to delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    let { pid } = req.params;

    let del = await post.findOneAndDelete({ _id: pid });

    if (!del) {
      return res
        .status(400)
        .json({ message: "post do not exist", status: false });
    }
    await comment.deleteMany({ postid: pid });
    res
      .status(200)
      .json({ message: "post deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

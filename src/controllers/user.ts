import { Request, Response } from "express";
import post from "../models/post";
import comment from "../models/comment";
import commentModel from "../models/comment";

export const allposts = async (req: Request, res: Response) => {
  try {
    const allpost = await post.find({});

    if (!allpost) {
      return res
        .status(400)
        .json({ message: "posts not found", status: false });
    }
    return res.status(200).json({ data: allpost, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const addcomment = async (req: Request, res: Response) => {
  try {
    const { pid } = req.params;
    const { content } = req.body;
    let comment = {
      postid: pid,
      userid: req.user._id,
      content,
    };
    let posts = await post.findOne({ _id: pid });
    if (!posts) {
      return res.status(400).json({ message: "post not found", status: false });
    }

    let newcomment = new commentModel(comment);

    await newcomment.save();
    return res
      .status(200)
      .json({ data: "comment added successfully", status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const getcomment = async (req: Request, res: Response) => {
  try {
    const { pid } = req.params;

    let posts = await post.findOne({ postid: pid });
    if (!posts) {
      return res.status(400).json({ message: "post not found", status: false });
    }
    let comments = await comment.find({ postid: pid });

    return res.status(200).json({ data: comments, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const likes = async (req: Request, res: Response) => {
  try {
    const { pid } = req.params;

    const user = await post.findOne({ _id: pid });
    if (!user) {
      return res.status(400).json({ message: "post not found", status: false });
    }
    let like = user.likes;

    if (like.length === 0) {
      like.push(req.user.id);
    } else {
      for (let i = 0; i < like.length; i++) {
        if (like[i]?._id.toString() !== req.user.id) {
          user.likes.push(req.user.id);
          break;
        } else if (like[i]?._id.toString() === req.user.id) {
          like.splice(i, 1);
          break;
        }
      }
    }

    await user.save();
    return res.status(200).json({ data: user.likes, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

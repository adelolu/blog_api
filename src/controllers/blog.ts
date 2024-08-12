import { Request, Response } from "express";
import { postmodel } from "../models/postModel";

export const Posts = async (req: Request, res: Response) => {
  try {
    const post = await postmodel.find({});
    console.log(post);

    if (!post) {
      return res
        .status(400)
        .json({ message: "posts not found", status: false });
    }
    return res.status(200).json({ data: post, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

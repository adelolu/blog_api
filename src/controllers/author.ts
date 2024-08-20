import { Request, Response } from "express";
import post from "../models/post";
import user from "../models/user";
import comment from "../models/comment";

//function to add post
export const addPost = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { title, content, hashtags } = req.body;
    console.log(id);
    const author = req.user;
    console.log(author, "author");
    if (author.id !== id) {
      return res.status(401).json({ message: "unauthorized", status: false });
    }

    if (!title) {
      return res
        .status(400)
        .json({ message: "title cannot be empty", status: false });
    } else if (!content) {
      return res
        .status(400)
        .json({ message: "content cannot be empty", status: false });
    } else if (!hashtags) {
      return res
        .status(400)
        .json({ message: "hashtags cannot be empty", status: false });
    }

    let hashT = hashtags.split(",");

    let newpost = await post.create({
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
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
//function to display posts of an author
export const getAuthorPosts = async (req: Request, res: Response) => {
  try {
    console.log("getting author post");

    let { id } = req.params;
    const author = req.user;

    let myposts = await post.find({ authorId: id });

    res.status(200).json({ data: myposts, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
//function to edit post
export const editPost = async (req: Request, res: Response) => {
  try {
    let { title, content, hashtags } = req.body;
    let { id, pid } = req.params;
    const author = req.user;
    if (author.id !== id) {
      return res.status(401).json({ message: "unauthorized", status: false });
    }

    if (!title) {
      return res
        .status(400)
        .json({ message: "title cannot be empty", status: false });
    } else if (!content) {
      return res
        .status(400)
        .json({ message: "content cannot be empty", status: false });
    } else if (!hashtags) {
      return res
        .status(400)
        .json({ message: "hashtags cannot be empty", status: false });
    }

    let hashT = hashtags.split(",");
    let editedpost = { title, content, hashtags: hashT };
    let editpost = await post.findOneAndUpdate({ _id: pid }, editedpost);

    if (!editpost) {
      return res
        .status(400)
        .json({ message: "post not edited", status: false });
    }
    res.status(200).json({ message: "post edited successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

//function to delete post
// im not done, delete all comments related to post
export const deletePost = async (req: Request, res: Response) => {
  try {
    let { id, pid } = req.params;
    const author = req.user;

    let del = await post.findOneAndDelete({ _id: pid });
    console.log(del, "del");

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

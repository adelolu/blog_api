import express, { Request, Response } from "express";
import { postmodel } from "../models/postModel";

//function to add post
export const AddPost = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { title, content, hashtags, author } = req.body;

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
    } else if (!author) {
      return res
        .status(400)
        .json({ message: "author cannot be empty", status: false });
    }

    let hashT = hashtags.split(",");
    let authors = author.split(",");

    let post = {
      title,
      content,
      hashtags: hashT,
      author: authors,
      authorId: id,
    };
    let newpost = await postmodel.create(post);
    if (!newpost) {
      return res
        .status(400)
        .json({ message: "post not created", status: false });
    }
    res
      .status(201)
      .json({ message: "post created successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const Post = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    let userPost = await postmodel.find({ authorId: id });

    if (userPost.length === 0) {
      return res.status(400).json({ message: "post not found", status: false });
    }

    res.status(200).json({ data: userPost, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};
//function to edit post
export const EditPost = async (req: Request, res: Response) => {
  try {
    let { title, content, hashtags, author } = req.body;
    let { id, pid } = req.params;
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
    } else if (!author) {
      return res
        .status(400)
        .json({ message: "author cannot be empty", status: false });
    }

    let hashT = hashtags.split(",");
    let authors = author.split(",");

    let editedpost = { title, content, hashtags: hashT, author: authors };

    let post = await postmodel.findOneAndUpdate(
      { _id: pid, authorId: id },
      editedpost
    );
    if (!post) {
      res.status(400).json({ message: "post not edited", status: false });
    }
    res.status(200).json({ message: "post edited successfully", status: true });
  } catch (error: unknown) {
    return res.status(500).json({ message: error, status: false });
  }
};

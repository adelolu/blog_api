import { Request, Response } from "express";
import Post from "../models/post";
import Comment from "../models/comment";
import { UserRoles } from "../models/user";

//function to add post
export const addPost = async (req: Request, res: Response) => {
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

    let newpost = await Post.create({
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
    let { _id } = req.params;
    //populate

    let myposts = await Post.find({ authorId: _id });

    res.status(200).json({ data: myposts, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
//function to edit post
export const editPost = async (req: Request, res: Response) => {
  try {
    let { title, content, hashtags } = req.body;
    let { postId } = req.params;
    let user = req.user;

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
    let editpost = await Post.findOneAndUpdate({ _id: postId }, editedpost);

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
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

//function to delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    let { postId } = req.params;
    let user = req.user;

    let del = await Post.findOne({ _id: postId });

    if (!del) {
      return res
        .status(400)
        .json({ message: "post do not exist", status: false });
    }
    console.log(user);
    console.log(user.role !== UserRoles.admin);
    console.log(user.id !== del.authorId.toString());

    if (user.id !== del.authorId.toString()) {
      if (user.role !== UserRoles.admin) {
        return res
          .status(403)
          .json({ message: "Action forbidden", status: false });
      }
    }

    await Post.deleteOne({ _id: postId });
    await Comment.deleteMany({ postId });

    res
      .status(200)
      .json({ message: "post deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allpost = await Post.find();

    return res.status(200).json({ data: allpost, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
export const getOnePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(400).json({ message: "post not found", status: false });
    }
    res.status(200).json({ data: post, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const likes = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(400).json({ message: "post not found", status: false });
    }
    let like = post.likes;
    let liked = like.includes(req.user.id);
    console.log(liked);

    if (!liked) {
      like.push(req.user.id);
    } else {
      let index = like.indexOf(req.user.id);
      console.log(index);

      like.splice(index, 1);
    }
    post.save();
    res.status(200).json({ message: post.likes, status: false });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

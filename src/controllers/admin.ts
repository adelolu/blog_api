import express , {  Request, Response  }from 'express'
import { postmodel } from '../models/postModel';


export const AddPost = async (req:Request, res: Response) => {
    try {
        let { id } = req.params
    let { title, content,hashtags, author } = req.body;
     console.log(title, content, hashtags, author, id);
     if (!title||!content||!hashtags||!author) {
      return res.status(400).json({ message: "input cannot be empty", status: false });
     }
     
     let hashT = hashtags.split(',')
     let authors = author.split(',')
     
  let post = { title, content, hashtags:hashT, author:authors, authorId:id };
    await postmodel.create(post)
    .then((post) => {
     
        res.status(201).json({ message:"post created successfully", status: true });
      
    })
    .catch((error:any) => {
         res.status(400).json({ message: error.message, status: false });
      
    });
 } catch (error:any) {
     res.status(500).json({ message:error.message, status:false})
 }
};

export const Post = async (req:Request, res: Response) => {
    try {
        let { id } = req.params
        console.log(id);
        let userPost = await postmodel.find({ authorId: id })
        console.log(userPost);
    
    } catch (error:any) {
      return  res.status(500).json({ message:error.message, status:false})
    }
};

export const EditPost = async (req:Request, res: Response) => {
    try {
        let { _id, title,content, hashtags, author } = req.body
        let { id } = req.params
        console.log(req.body, id);
        
        let hashT = hashtags.split(',')
        let authors = author.split(',')
   
  let editedpost = { title, content, hashtags:hashT, author:authors};
     
  let post = await postmodel.findOneAndUpdate({_id:_id}, editedpost )
    // .then((post) => {
        console.log(post,'editpost');
        
        // res.status(201).json({ message:"post created successfully", status: true });
      
    // })
    // .catch((error:any) => {
    //      res.status(400).json({ message: error.message, status: false });
      
    // });
 } catch (error:any) {
   return  res.status(500).json({ message:error.message, status:false})
 }
};

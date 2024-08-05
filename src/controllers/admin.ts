import express , {  Request, Response  }from 'express'
import { postmodel } from '../db/authModel';


export const addpost = async (req:Request, res: Response) => {
 try {
    let { title, content,hashtags, author } = req.body;
     console.log(title, content, hashtags, author);
     if (!title||!content||!hashtags||!author) {
      return res.status(400).json({ message: "input cannot be empty", status: false });
      
     }
    
     let hashT = hashtags.split(',')
     let authors = author.split(',')
     
  let post = { title, content, hashtags:hashT, created_at: Date.now(), author:authors };
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
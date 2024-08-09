import express , {  Request, Response  }from 'express'
import { postmodel } from '../models/postModel';

//im not done
export const Home = async (req:Request, res: Response) => {
 try {
     const post: any = await postmodel.find({})
    if (!post) {
       return res.status(500).json({ message:"Error", status: false })
    }
    return res.status(200).json({ data: post, status: true })


 } catch (error) {
 console.log(error);
 
    return res.status(500).json({ message: "error", status:false})
 }
};
import express , {  Request, Response  }from 'express'
import { postmodel } from '../models/postModel';


export const Home = async (req:Request, res: Response) => {
 try {
     const post: any = await postmodel.find({})
    if (post) {
       return res.status(200).json({ data: post, status: true })
    }

 } catch (error:any) {
    return res.status(500).json({ message:error.message, status:false})
 }
};
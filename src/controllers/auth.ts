import express , { Express, Request, Response , Application }from 'express'
import { usermodel } from '../db/authModel';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const Signup = async (req:Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      res.status(400).json({ message: "input cannot be empty", status: false });
    }
    else {
      const existuser:object|null = await usermodel.findOne({ email: email });
      
      if (existuser) {
        res.status(400).json({ message: "user already exist", status: false });
      } else {
        let hashpassword = await bcrypt.hash(password, 10);
        
        const newuser = await usermodel.create({
          username,
          email,
          password: hashpassword
        });
        
        if (newuser) {
          res.status(201).json({ message: "signup successful", status: true });
        }
      }
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message , status: false });
  }
};

export const Login = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "input cannot be empty", status: false });
    } else {
      const existuser = await usermodel.findOne({ email: email });
      
      if (!existuser) {
        res
          .status(400)
          .json({ message: "Account does not exist", status: false });
      } else {

        let correctpassword = await bcrypt.compare(
          password,
          existuser.password
        );
        if (correctpassword === true) {
          const token = await jwt.sign({ email }, "secretKey", {
            expiresIn: "1d",
          });
        
 
          let query: {email:string}  ={ email: email}
          
           await usermodel.findOneAndUpdate(query, {token:token})
          res
            .status(200)
            .json({ message: "login successful", status: true, token});
        } else {
          res
            .status(400)
            .json({ message: "Incorrect password", status: false });
        }
      }
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message, status: false });
  }
};

export const verifyuser = async (req:Request, res:Response) => {
  try {
    const token: string |undefined = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      res.status(400).json({ message: "invalid token", status: false });
    } else {
      const verifyToken:any = await jwt.verify(token, "secretKey");
      

      const email = verifyToken.email;
      const verifyuser = await usermodel.findOne({ email });
      if (verifyuser) {
        res.status(200).json({ message: "user is verified", status: true });
      }
    }
  } catch (error:any) {
    if (error.message === "jwt malformed") {
      res.status(401).json({ message: "incorrect token", status: false });
    } else {
      res.status(500).json({ message: error.message, status: false });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { username } = req.body
    console.log(username);
    
    
      if (!username) {
      return  res.status(400).json({ message: "logout unsuccessful", status: false });
        
    }
    let query: {username:string}  ={ username: username}
      const user = await usermodel.findOneAndUpdate(query, {token: ''});
      console.log(user);
      
      if (user) {
        res.status(200).json({ message: "logout successful", status: true });
      }
   
  } catch (error:any) {
   
      res.status(500).json({ message: error.message, status: false });
    
  }
}

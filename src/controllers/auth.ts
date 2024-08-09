import express, { Express, Request, Response, Application } from "express";
import { usermodel } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "username cannot be empty", status: false });
    } else if (!email) {
      return res
        .status(400)
        .json({ message: "email cannot be empty", status: false });
    } else if (!password) {
      return res
        .status(400)
        .json({ message: "password cannot be empty", status: false });
    }

    const existuser = await usermodel.findOne({ email: email });

    if (existuser) {
      return res
        .status(400)
        .json({ message: "user already exist", status: false });
    }
    let hashpassword = await bcrypt.hash(password, 10);

    const newuser = await usermodel.create({
      username,
      email,
      password: hashpassword,
    });
    console.log(newuser);

    if (!newuser) {
      res.status(400).json({ message: "signup unsuccessful", status: false });
    }
    res.status(201).json({ message: "signup successful", status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "email cannot be empty", status: false });
    } else if (!password) {
      res
        .status(400)
        .json({ message: "password cannot be empty", status: false });
    }
    const existuser = await usermodel.findOne({ email: email });

    if (!existuser) {
      return res
        .status(400)
        .json({ message: "Account does not exist", status: false });
    }

    let correctpassword = await bcrypt.compare(password, existuser.password);
    console.log(correctpassword);

    if (!correctpassword) {
      return res
        .status(400)
        .json({ message: "Incorrect password", status: false });
    }
    const token = await jwt.sign({ email }, "secretKey", {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "login successful",
      status: true,
      token,
      id: existuser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const VerifyUser = async (req: Request, res: Response) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "invalid token", status: false });
    }
    const verifyToken: any = await jwt.verify(token, "secretKey");

    const email = verifyToken.email;
    const verifyuser = await usermodel.findOne({ email });
    if (verifyuser) {
      res.status(200).json({ message: "user is verified", status: true });
    }
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "logout unsuccessful", status: false });
    }

    res.status(200).json({ message: "logout successful", status: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message, status: false });
  }
};

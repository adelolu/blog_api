import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import user, { IUser, UserRoles } from "../models/user";
import mongoose from "mongoose";
import admin from "../models/admin";
export type MyToken = {
  _id: mongoose.Types.ObjectId;
  email: string;
};
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "login required", status: false });
    }
    const verifyToken = jwt.verify(token, "secretKey") as unknown as MyToken;

    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "Unauthorised Access", status: false });
    }

    const existuser = await user.findById(verifyToken._id);
    console.log(existuser);

    if (!existuser || existuser.id !== id) {
      return res.status(401).json({ message: "unauthorzied", status: false });
    }

    req.user = existuser;
    next();
  } catch (error) {
    res.status(401).json({ message: error, status: false });
  }
};

export const verifyAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id, "author id middleware");
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "login required", status: false });
    }
    const verifyToken = jwt.verify(token, "secretKey") as MyToken;
    console.log(verifyToken, "imp");
    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "Unauthorised Access", status: false });
    }

    const author = await user.findById(verifyToken._id);
    console.log(author, "ath");

    if (!author) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", status: false });
    }
    console.log(id);
    console.log(author.id);

    if (author.role !== UserRoles.author || author.id !== id) {
      return res
        .status(403)
        .json({ message: "action is forbidden", status: false });
    }
    req.user = author;
    next();
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "login required", status: false });
    }
    const verifyToken = jwt.verify(token, "secretKey") as MyToken;
    console.log(verifyToken, "imp");
    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "Unauthorised Access", status: false });
    }

    const adm = await admin.findById(verifyToken._id);

    if (!adm) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", status: false });
    }
    if (adm.role !== UserRoles.admin || adm.id !== id) {
      return res
        .status(403)
        .json({ message: "action is forbidden", status: false });
    }
    req.admin = adm;
    next();
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

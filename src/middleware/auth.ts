import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User, { IUser, UserRoles } from "../models/user";
import mongoose from "mongoose";

export type MyToken = {
  _id: mongoose.Types.ObjectId;
  email: string;
};

const verification = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "login required", status: false });
  }
  const verifyToken = jwt.verify(token, "secretKey") as unknown as MyToken;
  if (!verifyToken) {
    return res
      .status(401)
      .json({ message: "Unauthorised Access", status: false });
  }
  const existuser = await User.findOne({
    _id: verifyToken._id,
    emailVerified: true,
  });
  if (!existuser) {
    return res.status(401).json({ message: "unauthorzied", status: false });
  }
  req.user = existuser;
};

export const emailVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await verification(req, res);
    next();
  } catch (error) {
    res.status(401).json({ message: error, status: false });
  }
};

export const verifyAccess = (roles: string[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verification(req, res);
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Action is forbidden", status: false });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error, status: false });
    }
  };
};

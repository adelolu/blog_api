import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User, { IUser, UserRoles } from "../models/user";
import mongoose from "mongoose";

export type MyToken = {
  _id: mongoose.Types.ObjectId;
  email: string;
};

export const isLoggedin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const existuser = await User.findById(verifyToken._id);
    if (!existuser) {
      return res.status(401).json({ message: "unauthorzied", status: false });
    }
    req.user = existuser;
    next();
  } catch (error) {
    res.status(401).json({ message: error, status: false });
  }
};

export const verifyAccess = (roles: string[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string | undefined =
        req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "login required", status: false });
      }
      const verifyToken = jwt.verify(token, "secretKey") as MyToken;
      // console.log(verifyToken);

      if (!verifyToken) {
        return res
          .status(401)
          .json({ message: "Unauthorised Access", status: false });
      }
      const user = await User.findById(verifyToken._id);
      // console.log(user);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized access", status: false });
      }
      req.user = user;
      // console.log(req.user, "current user");

      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Action is forbidden", status: false });
      }
      // console.log(user);

      next();
    } catch (error) {
      res.status(500).json({ message: error, status: false });
    }
  };
};

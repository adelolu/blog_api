import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "invalid token", status: false });
    }
    const verifyToken = jwt.verify(token, "secretKey");

    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "Unauthorised Access", status: false });
    }
    // res.status(200).json({ message: "user is verified", status: true });
    next();
  } catch (error) {
    res.status(401).json({ message: error, status: false });
  }
};

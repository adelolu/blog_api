import express, { Request, Response, NextFunction } from "express";
import profilemodel from "../models/profileModel";

export const verifyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // checks if the author with that id exists
    const profile = await profilemodel.findById({ _id: id });

    if (!profile) {
      return res
        .status(401)
        .json({ message: "Create an author's profile", status: false });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Unauthorized access", status: false });
  }
};

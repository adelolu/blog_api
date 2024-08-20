import { Request, Response } from "express";
import user from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import admin from "../models/admin";
import { MyToken } from "../middleware/auth";

function generateToken(_id: mongoose.Types.ObjectId, email: string): string {
  return jwt.sign({ _id, email }, "secretKey", {
    expiresIn: "1d",
  });
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      firstname,
      lastname,
      date_of_birth,
      gender,
      bio,
      role,
      email,
      password,
    } = req.body;

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
    } else if (!firstname) {
      return res
        .status(400)
        .json({ message: "firstname cannot be empty", status: false });
    } else if (!lastname) {
      return res
        .status(400)
        .json({ message: "lastname cannot be empty", status: false });
    } else if (!gender) {
      return res
        .status(400)
        .json({ message: "gender cannot be empty", status: false });
    } else if (!bio) {
      return res
        .status(400)
        .json({ message: "bio cannot be empty", status: false });
    } else if (!date_of_birth) {
      return res
        .status(400)
        .json({ message: "date of birth cannot be empty", status: false });
    } else if (!role) {
      return res
        .status(400)
        .json({ message: "role cannot be empty", status: false });
    }

    const existuser = await user.findOne({ email });

    if (existuser) {
      return res
        .status(400)
        .json({ message: "user already exist", status: false });
    }
    let hashpassword = await bcrypt.hash(password, 10);

    const newuser = await user.create({
      firstname,
      lastname,
      username,
      email,
      password: hashpassword,
      gender,
      date_of_birth,
      bio,
      role,
    });

    if (!newuser) {
      return res
        .status(400)
        .json({ message: "signup unsuccessful", status: false });
    }
    newuser.set("password", undefined);
    const token = generateToken(newuser.id, email);
    res
      .status(201)
      .json({ message: "signup successful", token, newuser, status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "email cannot be empty", status: false });
    } else if (!password) {
      return res
        .status(400)
        .json({ message: "password cannot be empty", status: false });
    }
    const existuser = await user.findOne({ email }, "+password");

    if (!existuser) {
      return res
        .status(400)
        .json({ message: "Account does not exist", status: false });
    }

    let correctpassword = await bcrypt.compare(password, existuser.password);

    if (!correctpassword) {
      return res
        .status(400)
        .json({ message: "Incorrect password", status: false });
    }
    existuser.set("password", undefined);
    const token = generateToken(existuser.id, email);
    res.status(200).json({
      message: "login successful",
      status: true,
      token,
      user: existuser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error, status: false });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { username, role, email, password } = req.body;

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

    const existadmin = await admin.findOne({ email });

    if (existadmin) {
      return res
        .status(400)
        .json({ message: "admin already exist", status: false });
    }
    let hashpassword = await bcrypt.hash(password, 10);

    const newadmin = await admin.create({
      username,
      email,
      password: hashpassword,
      role: "admin",
    });

    if (!newadmin) {
      return res
        .status(400)
        .json({ message: "admin signup unsuccessful", status: false });
    }
    newadmin.set("password", undefined);
    const token = generateToken(newadmin.id, email);
    res.status(201).json({
      message: "admin signup successful",
      token,
      admin: newadmin,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "email cannot be empty", status: false });
    } else if (!password) {
      return res
        .status(400)
        .json({ message: "password cannot be empty", status: false });
    }
    const existadmin = await admin.findOne({ email }, "+password");

    if (!existadmin) {
      return res
        .status(400)
        .json({ message: "Account does not exist", status: false });
    }

    let correctpassword = await bcrypt.compare(password, existadmin.password);

    if (!correctpassword) {
      return res
        .status(400)
        .json({ message: "Incorrect password", status: false });
    }
    existadmin.set("password", undefined);
    const token = generateToken(existadmin.id, email);
    res.status(200).json({
      message: "login successful",
      status: true,
      token,
      admin: existadmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, status: false });
  }
};

export const tokenVerification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "invalid token", status: false });
    }
    const verifyToken = jwt.verify(token, "secretKey") as unknown as MyToken;

    const verifyuser = await user.findById(verifyToken._id);

    if (!verifyuser || verifyuser.id !== id) {
      return res
        .status(401)
        .json({ message: "Unauthorized acess", status: false });
    }
    res.status(200).json({ message: "user is verified", status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

import express, { Express, Request, Response, Application } from "express";
import { usermodel } from "../models/userModel";
import profilemodel from "../models/profileModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let authorid: number = 1000;

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

    if (!newuser) {
      return res
        .status(400)
        .json({ message: "signup unsuccessful", status: false });
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
      return res
        .status(400)
        .json({ message: "email cannot be empty", status: false });
    } else if (!password) {
      return res
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
    if (!verifyuser) {
      return res
        .status(400)
        .json({ message: "user is not verified", status: false });
    }
    res.status(200).json({ message: "user is verified", status: true });
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

function generateAID(): number {
  authorid = authorid + 1;
  return authorid;
}

export const Profile = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, gender, date_of_birth, bio, email } = req.body;

    if (!firstname) {
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
    } else if (!email) {
      return res
        .status(400)
        .json({ message: "email cannot be empty", status: false });
    }
    const existuser = await usermodel.findOne({ email });
    console.log(existuser, "if user");

    if (!existuser) {
      return res.status(400).json({ message: "invalid email", status: false });
    }
    // let authorID = generateAID();

    let newprofile = {
      firstname,
      lastname,
      email,
      gender,
      date_of_birth,
      bio,
    };

    const profile = await profilemodel.create(newprofile);
    if (!profile) {
      return res
        .status(400)
        .json({ message: "Profile not created", status: false });
    }
    const updateuser = await usermodel.findByIdAndUpdate(
      { _id: existuser._id },
      { authorID: profile._id }
    );

    if (!updateuser) {
      return res
        .status(400)
        .json({ message: "Profile not updated", status: false });
    }
    res.status(201).json({ message: "Profile updated", status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

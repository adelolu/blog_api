import { Request, Response } from "express";
import { handleUpload } from "../services/cloudinary";
import User from "../models/user";
export function handleFilename(filename: string) {
  let oldName = filename.includes(".")
    ? filename.split(".").slice(0, -1).join("_")
    : filename;
  const name = oldName.replace(/ /g, "-") + "_" + Date.now().toString();
  return { name, ext: filename.split(".").pop() };
}

export const uploadCloudinary = async (req: Request, res: Response) => {
  try {
    const { email } = req.user;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", status: false });
    }

    const { name, ext } = handleFilename(req.file.originalname);

    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const cldRes = await handleUpload(dataURI, name, ext);
    // console.log(cldRes.secure_url);

    // let imageupload = await User.findOneAndUpdate(
    //   { email },
    //   { profileImage: cldRes.secure_url }
    // );
    // if (!imageupload) {
    //   return res
    //     .status(500)
    //     .send({ message: "Image not uploadad", status: false });
    // }
    res
      .status(200)
      .json({ status: true, message: "profile picture added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, status: false });
  }
};

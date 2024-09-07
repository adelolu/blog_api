import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import { log } from "console";

// File filter to allow only image files
const imageFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Allowed file types
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Multer configuration
// const diskStorage = multer.diskStorage({
//   destination: (req: Request, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const oldName = file.originalname.includes(".")
//       ? file.originalname.split(".").slice(0, -1).join("_")
//       : file.originalname;

//     const newName =
//       oldName.replace(/ /g, "-") +
//       "_" +
//       Date.now().toString() +
//       "." +
//       (file.originalname.split(".").pop() || "");

//     file.filename = newName;
//     console.log(cb(null, newName));

//     cb(null, newName);
//   },
// });

const memoryStorage = multer.memoryStorage();

// export const diskUpload = multer({ storage: diskStorage });
const upload = multer({
  storage: memoryStorage,
  fileFilter: imageFileFilter,
});

export default upload;

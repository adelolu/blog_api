import { v2 as cloudinary } from "cloudinary";
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
});

export const handleUpload = async (
  file: string,
  name: string,
  format?: string
) => {
  console.log(name, format);

  if (format === "doc" || format === "docx") {
    name = name.concat(".", format);
  }
  return await cloudinary.uploader.upload(file, {
    use_filename: true,
    resource_type: "auto",
    format,
    public_id: name,
  });

  // let result = await cloudinary.uploader.upload(
  //   "c:/Users/USER/Pictures/zoro.jpg",
  //   {
  //     folder: "blog",
  //     resource_type: "image",
  //     public_id: name,
  //   }
  // );
  // console.log(result);
};

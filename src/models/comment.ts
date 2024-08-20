import { Schema, model, Types, Document } from "mongoose";
import postModel from "./post";
import userModel from "./user";

interface IComment extends Document {
  postid: Types.ObjectId;
  userid: Types.ObjectId;
  content: string;
}
const commentSchema = new Schema<IComment>(
  {
    postid: { type: Schema.Types.ObjectId, ref: postModel },
    userid: { type: Schema.Types.ObjectId, ref: userModel },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IComment>("comment", commentSchema);

import { Schema, model, Types, Document } from "mongoose";
import Post from "./post";
import User from "./user";

interface IComment extends Document {
  post: Types.ObjectId;
  user: Types.ObjectId;
  comment: string;
}
const commentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: Post },
    user: { type: Schema.Types.ObjectId, ref: User },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IComment>("comment", commentSchema);

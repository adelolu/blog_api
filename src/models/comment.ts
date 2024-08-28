import { Schema, model, Types, Document } from "mongoose";
import Post from "./post";
import User from "./user";

interface IComment extends Document {
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
}
const commentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: Post },
    userId: { type: Schema.Types.ObjectId, ref: User },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IComment>("comment", commentSchema);

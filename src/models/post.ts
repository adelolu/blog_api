import { Schema, model, Types, Document } from "mongoose";
import user from "./user";

interface IPost extends Document {
  title: string;
  content: string;
  authorId: Types.ObjectId;
  hashtags: string[];
  likes: Types.ObjectId[];
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    hashtags: [String],
    likes: { type: [Schema.Types.ObjectId], default: [] },
    authorId: { type: Schema.Types.ObjectId, ref: user },
  },
  { timestamps: true }
);

export default model<IPost>("post", postSchema);

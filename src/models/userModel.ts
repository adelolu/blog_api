import mongoose from "mongoose";
interface IUser {
  username: string;
  email: string;
  password: string;
  authorID: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  authorID: {
    type: String,
    default: "",
  },
});

export const usermodel = mongoose.model<IUser>("user", userSchema);

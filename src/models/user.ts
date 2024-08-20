import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: string;
  bio: string;
  role: string;
  profileImage: string;
}
export const UserRoles = {
  author: "author",
  admin: "admin",
  user: "user",
} as const;

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
    default: UserRoles.user,
  },
  date_of_birth: Date,
  gender: String,
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
});

export default mongoose.model<IUser>("user", userSchema);
